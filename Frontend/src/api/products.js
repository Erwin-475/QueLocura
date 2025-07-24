console.log("API URL:", import.meta.env.VITE_API_URL)

const getProducts = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getAll/products`)
        return await response.json()
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}
export default getProducts