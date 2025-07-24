import { useState, useEffect } from 'react'
import getProducts from './api/products.js'
import { Products } from './components/Products.jsx'
import { Header } from './components/Header.jsx'
import { useFilters } from './hooks/useFilters.js'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './context/cart.jsx'
import { SaveOrder } from './components/SaveOrder.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminOrders } from './components/AdminOrders'


function App() {
  const { filterProducts } = useFilters()
  const [products, setProducts] = useState([])
  const [showSaveOrder, setShowSaveOrder] = useState(false)

  useEffect(() => {
    getProducts().then(data => setProducts(data))
  }, [])

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Cart />
        <Routes>
          <Route path="/" element={<Products products={filteredProducts} />} />
          <Route path="/admin" element={<AdminOrders />} />
        </Routes>
        {showSaveOrder && (
          <SaveOrder onClose={() => setShowSaveOrder(false)} />
        )}
      </BrowserRouter>
    </CartProvider>
  )
}

export default App