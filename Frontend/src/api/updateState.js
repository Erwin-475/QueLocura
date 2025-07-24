export async function actualizarEstado(id) {
    const response = await fetch(`http://127.0.0.1:5000/admin/update_state/${id}`, {
        method: 'PUT',
    });
    if (!response.ok) {
        throw new Error('Error al actualizar el estado del pedido');
    }
    return response.json();
}