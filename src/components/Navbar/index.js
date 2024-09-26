import './index.css'

import {IoCartOutline} from 'react-icons/io5'

const Navbar = props => {
  const {restaurantName} = props
  return (
    <>
      <div className="navbar-bg">
        <h1 className="nav-heading">{restaurantName}</h1>
        <IoCartOutline className="cart-icon" />
      </div>
    </>
  )
}

export default Navbar
