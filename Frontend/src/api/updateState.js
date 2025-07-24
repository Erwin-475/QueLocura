export async function actualizarEstado(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}admin/update_state/${id}`, {
        method: 'PUT',
    });
    if (!response.ok) {
        throw new Error('Error al actualizar el estado del pedido');
    }
    return response.json();
}