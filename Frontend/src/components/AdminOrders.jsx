import { useEffect, useState } from 'react'
import { actualizarEstado } from '../api/updateState.js';
import io from 'socket.io-client';
import './AdminOrders.css'
import { CheckIcon } from './Icons.jsx';

const socket = io('http://127.0.0.1:5000');

export function AdminOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = () => {
      fetch('http://127.0.0.1:5000/admin/pedidos_pendientes')
        .then(res => res.json())
        .then(setOrders)
        .catch(console.error);
    }
    fetchOrders();

    socket.on('nueva_orden', () => {
      console.log('Nueva orden recibida vía socket');
      fetchOrders();
    });

    return () => {
      socket.off('nueva_orden');
    }
  }, []);

  function handleActualizar(id) {
    actualizarEstado(id)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error al actualizar:', error);
      });
  }

  return (
    <div className="compact-container">
      <h2 className="compact-title">Pedidos Pendientes</h2>
      <div className="table-wrapper">
        <table className="compact-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Orden</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Pago</th>
              <th>Total</th>
              <th>Cambio</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.idorders}>
                <td>{order.idorders}</td>
                <td>{order.name}</td>
                <td>{order.orden}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.pay}</td>
                <td>{order.total_order}</td>
                <td>{order.changes}</td>
                <td>{order.date}</td>
                <td><button className='check-button' onClick={() => handleActualizar(order.idorders)}><CheckIcon /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}