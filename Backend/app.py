from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

app.config['MYSQL_HOST'] = os.getenv("MYSQL_HOST")
app.config['MYSQL_PORT'] = int(os.getenv("MYSQL_PORT", 3306))
app.config['MYSQL_USER'] = os.getenv("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.getenv("MYSQL_PASSWORD")
app.config['MYSQL_DB'] = os.getenv("MYSQL_DB")

mysql = MySQL(app)

@app.route("/")
def home():
    return "Servidor Flask funcionando"

@app.route("/getAll/usuario", methods = ["GET"])
def getAllByUsuarios():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM usuarios")
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'nombre': result[1], 'usuario': result[2], 'contraseña': result[3]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

@app.route("/getAll/products", methods = ["GET"])
def getAllByProducts():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM products")
        rv = cur.fetchall()
        cur.close()
        payload = []
        content = {}
        for result in rv:
            content = {'id': result[0], 'title': result[1], 'description': result[2], 'price': result[3], "brand": result[4], "category": result[5], "thumbnail": result[6]}
            payload.append(content)
            content = {}
        return jsonify(payload)
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})
    
@app.route("/add/user", methods=["POST"])
def add_user():
    try:
        if request.method == 'POST':
            name = request.json["name"]
            address = request.json["address"]
            phone = request.json["phone"]
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO users(name, address, phone) VALUES (%s, %s, %s)", (name, address, phone))
            mysql.connection.commit()
            iduser = cur.lastrowid
            return jsonify({"informacion": "Registro exitoso", "iduser": iduser})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

@app.route("/add/order", methods=["POST"])
def add_order():
    try:
        if request.method == 'POST':
            iduser = request.json["iduser"]
            pay = request.json.get("pay", "")
            changes = request.json.get("changes", "")
            cur = mysql.connection.cursor()
            cur.execute(
                "INSERT INTO orders(iduser, pay, changes) VALUES (%s, %s, %s)",
                (iduser, pay, changes)
            )
            mysql.connection.commit()
            idorders = cur.lastrowid
            socketio.emit('nueva_orden', {'mensaje': 'Nueva orden creada'})
            return jsonify({"informacion": "Orden creada", "idorders": idorders})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})

@app.route("/add/detail", methods=["POST"])
def add_detail():
    try:
        if request.method == 'POST':
            idorders = request.json["idorders"]  
            idproducts = request.json["idproducts"]
            cur = mysql.connection.cursor()
            for item in idproducts:
                idproduct = item["idproducts"]
                quantity = item["quantity"]
                cur.execute(
                    "INSERT INTO detail(idorders, idproducts, quantity) VALUES (%s, %s, %s)",
                    (idorders, idproduct, quantity)
                )
            mysql.connection.commit()
            return jsonify({"informacion": "Detalle agregado correctamente"})
    except Exception as e:
        print(e)
        return jsonify({"informacion": str(e)})
    
@app.route("/admin/pedidos_pendientes", methods=["GET"])
def pedidos_pendientes():
    try:
        cur = mysql.connection.cursor()
        cur.execute("""
            SELECT
                o.idorders,
                u.name,
                GROUP_CONCAT(
                    CONCAT(d.quantity, 'x ', p.title) SEPARATOR ', '
                ) AS orden,
                u.address,
                u.phone,
                o.pay,
                o.date,
                SUM(p.price * d.quantity) AS total_order,
                o.changes
            FROM
                orders o
            JOIN users u ON 
                o.iduser = u.iduser
            JOIN detail d ON 
                o.idorders = d.idorders
            JOIN products p ON 
                d.idproducts = p.idproducts
            WHERE 
                o.state = 'pendiente'
            GROUP BY 
                o.idorders, 
                u.name, 
                u.address, 
                u.phone, 
                o.pay, 
                o.changes, 
                o.date;
        """)
        pedidos = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        result = [dict(zip(columns, row)) for row in pedidos]
        return jsonify(result)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})
    
@app.route("/admin/update_state/<int:id>", methods=["PUT"])
def update_state(id):
    cursor = mysql.connection.cursor()
    cursor.execute("UPDATE orders SET state = 'completado' WHERE idorders = %s", (id,))
    mysql.connection.commit()
    cursor.close()
    return jsonify({"informacion": "Estado actualizado a completado"})

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)