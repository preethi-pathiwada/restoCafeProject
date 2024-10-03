import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import './App.css'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import CartRoute from './components/CartRoute'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: [], dishesArr: []}

  addCartItem = itemObj => {
    const {cartList} = this.state
    const arr = cartList.filter(obj => obj.dishId === itemObj.dishId)
    if (arr.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, itemObj]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const arr = cartList.filter(obj => obj.dishId !== id)
    this.setState({cartList: arr})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const arr = cartList.map(obj => {
      if (obj.dishId === id) {
        return {...obj, count: obj.count + 1}
      }
      return obj
    })
    this.setState({cartList: arr})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const arr = cartList
      .map(obj => {
        if (obj.dishId === id && obj.count > 0) {
          return {...obj, count: obj.count - 1}
        }
        return obj
      })
      .filter(ob => ob.count > 0)

    this.setState({cartList: arr})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={CartRoute} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
