import {FaCircle} from 'react-icons/fa'
import {FiPlus, FiMinus} from 'react-icons/fi'

import './index.css'

const DishItem = props => {
  const {dishes, addItem, removeItem, same} = props

  const {
    dishId,
    dishName,
    dishCurrency,
    dishAvailability,
    dishDescription,
    dishCalories,
    dishPrice,
    dishImage,
    addonCat,
    count,
  } = dishes

  const add = () => {
    addItem(dishId)
  }

  const remove = () => {
    removeItem(dishId)
  }
  return (
    <li className="dish-item">
      <div className="container">
        <div className="con-1">
          <div className={dishAvailability ? 'green-box' : 'red-box'}>
            <FaCircle
              className={dishAvailability ? 'green-icon' : 'red-icon'}
            />
          </div>

          <div className="dish-details">
            <h1 className="dish-name">{dishName}</h1>
            <p className="price">
              {dishCurrency} {dishPrice}
            </p>
            <p className="description">{dishDescription}</p>
            {dishAvailability ? (
              <div className="buttons-container">
                <button className="add-button" onClick={remove}>
                  -
                </button>
                <p className="count">{count}</p>
                <button className="add-button" onClick={add}>
                  +
                </button>
              </div>
            ) : (
              <p className="text-red">Not Available</p>
            )}
            {addonCat.length !== 0 ? (
              <p className="text">Customizations Available</p>
            ) : null}
          </div>
        </div>

        <div className="con-2">
          <p className="calories">{dishCalories} calories</p>
          <img src={dishImage} className="img" />
        </div>
      </div>
    </li>
  )
}

export default DishItem
