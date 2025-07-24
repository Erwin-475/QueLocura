import './Cart.css'

import { useId, useState } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'
import { SaveOrder } from './SaveOrder.jsx'

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart() {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()
  const [showSaveOrder, setShowSaveOrder] = useState(false)

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button onClick={clearCart} disabled={cart.length === 0}>
            <ClearCartIcon />
          </button>
          {cart.length > 0 && (
            <button onClick={() => setShowSaveOrder(true)}>
              Finalizar pedido
            </button>
          )}
        </div>

        {showSaveOrder && (
          <SaveOrder onClose={() => setShowSaveOrder(false)} />
        )}
      </aside>
    </>
  )
}
