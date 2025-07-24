import { useState } from 'react'
import { useCart } from '../hooks/useCart.js'
import './SaveOrder.css'

export function SaveOrder({ onClose }) {
    const { cart, clearCart } = useCart()
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        pay: 'nequi',
        changes: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const resUser = await fetch('http://127.0.0.1:5000/add/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: form.name, address: form.address, phone: form.phone })
            })
            const userData = await resUser.json()
            const iduser = userData.iduser

            const resOrder = await fetch('http://127.0.0.1:5000/add/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ iduser, pay: form.pay, changes: form.changes - total })
            })
            const orderData = await resOrder.json()
            const idorders = orderData.idorders


            const detalles = cart.map(item => ({
                idproducts: item.id,
                quantity: item.quantity
            }))
            await fetch('http://127.0.0.1:5000/add/detail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idorders, idproducts: detalles })
            })
            console.log('Detalles de la orden agregados')
            setSuccess(true)
            clearCart()
        } catch (err) {
            alert('Error al guardar el pedido')
        } finally {
            setLoading(false)
        }
    }

    

    if (success) {
        return (
            <div className="save-order-modal">
                <h2>¡Pedido guardado!</h2>
                <button onClick={onClose}>Cerrar</button>
            </div>
        )
    }

    return (
        <div className="save-order-modal">
            <h2>Finalizar pedido</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="address"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={handleChange}
                    required
                />
                <input
                    name="phone"
                    placeholder="Teléfono"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                <label>Método de pago:</label>
                <select
                    name="pay"
                    value={form.pay}
                    onChange={handleChange}
                    required
                >
                    <option value="nequi">Nequi</option>
                    <option value="efectivo">Efectivo</option>
                </select>
                {form.pay === 'efectivo' && (
                    <input
                        name="changes"
                        placeholder="¿Con cuánto paga? (opcional)"
                        value={form.changes}
                        onChange={handleChange}
                        type="number"
                        min="0"
                    />
                )}
                <h3>Productos:</h3>
                <ul>
                    {cart.map(item => (
                        <li key={item.id}>
                            {item.title} - {item.quantity}
                        </li>
                    ))}
                </ul>
                
                <p>Tenga en cuenta que se cobrara + por el domicilio dependiendo de la zona</p>
                <h3>Total: ${total}</h3>
                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar pedido'}
                </button>
                <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>
                    Cancelar
                </button>
            </form>
        </div>
    )
}