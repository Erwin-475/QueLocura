const getProducts = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/getAll/products')
        return await response.json()
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}
export default getProducts