import {useState, useEffect} from 'react'
import './index.css'

import Navbar from '../Navbar'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

const CartRoute = () => {
  const [name, setName] = useState('')
  useEffect(() => {
    const getName = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()
      setName(data[0].restaurant_name)
    }
    getName()
  }, [])
  return (
    <CartContext.Consumer>
      {value => {
        console.log(name)
        const {cartList, removeAllCartItems} = value

        const deleteAllItems = () => {
          removeAllCartItems()
        }

        if (cartList.length === 0) {
          return (
            <>
              <Navbar restaurantName={name} />
              <div className="empty-cart-con">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  className="empty-cart-img"
                />
                <p>No Items in the cart</p>
              </div>
            </>
          )
        }
        return (
          <>
            <Navbar restaurantName={name} />
            <div className="cart-con">
              <button className="remove-all-btn" onClick={deleteAllItems}>
                Remove All
              </button>
              <ul className="cart-list-con">
                {cartList.map(obj => (
                  <CartItem key={obj.dishId} dishes={obj} />
                ))}
              </ul>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartRoute
