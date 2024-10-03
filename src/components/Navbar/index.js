import './index.css'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'

const Navbar = props => {
  const {restaurantName} = props
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="navbar-bg">
            <Link to="/" className="link">
              <h1 className="nav-heading">{restaurantName}</h1>
            </Link>
            <div className="orders-container">
              <p className="orders">My Orders</p>

              <Link to="/cart" className="link">
                <button className="cart-btn" data-testid="cart">
                  <IoCartOutline className="cart-icon" />
                  <div className="order-count-con ">
                    <p className="order-count">{cartList.length}</p>
                  </div>
                </button>
              </Link>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Navbar)

// <button className="cart-btn" data-testid="cart">
//                   <div className="order-count-con">
//                     <p className="order-count">{cartList.length}</p>
//                   </div>
//                   <IoCartOutline className="cart-icon" />
//                 </button>
