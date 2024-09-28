import './App.css'

import {Component} from 'react'
import {IoCartOutline} from 'react-icons/io5'
import Navbar from './components/Navbar'
import TabItem from './components/TabItem'
import DishItem from './components/DishItem'

const dishes = [
  {
    dishId: '100000001',
    dishName: 'Spinach Salad',
    dishPrice: 7.95,
    dishImage: 'https://i.imgur.com/PoJfqsD.jpg',
    dishCurrency: 'SAR',
    dishCalories: 15,
    dishDescription:
      'Fresh spinach, mushrooms, and hard-boiled egg served with warm bacon vinaigrette',
    dishAvailability: true,
    dishType: 2,
    count: 0,
    addonCat: [
      {
        addonCategory: 'Spicy/Non-Spicy',
        addonCategoryId: '104',
        addonSelection: 0,
        addons: [
          {
            dishId: '100000032',
            dishName: 'Non Spicy',
            dishPrice: 25,
            dishImage:
              'http://restaurants.unicomerp.net/images/Restaurant/Item/Item_100000025.jpg',
            dishCurrency: 'SAR',
            dishCalories: 15,
            dishDescription: 'Non Spicy',
            dishAvailability: true,
            dishType: 1,
          },
        ],
      },
      {
        addonCategory: 'Add On',
        addonCategoryId: '101',
        addonSelection: 1,
        addons: [
          {
            dishId: '100000020',
            dishName: 'fried onions',
            dishPrice: 15,
            dishImage:
              'http://restaurants.unicomerp.net/images/Restaurant/Item/Item_100000020.jpg',
            dishCurrency: 'SAR',
            dishCalories: 10,
            dishDescription: 'fried onions',
            dishAvailability: true,
            dishType: 2,
          },
        ],
      },
    ],
  },
  {
    dishId: '100000003',
    dishName: 'Traditional New England Seafood Chowder',
    dishPrice: 12,
    dishImage: 'https://i.imgur.com/l3PKuH0.jpg',
    dishCurrency: 'SAR',
    dishCalories: 30,
    dishDescription: 'with clams, scallops, and shrimp,',
    dishAvailability: true,
    dishType: 1,
    count: 0,
    addonCat: [],
  },
  {
    dishId: '100000004',
    dishName: 'Salad Bar Soup',
    dishPrice: 5,
    dishImage: 'https://i.imgur.com/AkHXoag.jpg',
    dishCurrency: 'SAR',
    dishCalories: 30,
    dishDescription: 'Flour Mixed with fresh green leafy vegetables',
    dishAvailability: true,
    dishType: 2,
    count: 0,
    addonCat: [],
  },
  {
    dishId: '100000005',
    dishName: 'chicken-soup',
    dishPrice: 14.89,
    dishImage: 'https://i.imgur.com/PorTefm.jpg',
    dishCurrency: 'SAR',
    dishCalories: 30,
    dishDescription: 'fresh as home-made chicken-soup',
    dishAvailability: false,
    dishType: 1,
    count: 0,
    addonCat: [],
  },
  {
    dishId: '100000006',
    dishName: 'One-Pot-Vegetarian',
    dishPrice: 22,
    dishImage: 'https://i.imgur.com/GebmClM.jpg',
    dishCurrency: 'SAR',
    dishCalories: 25,
    dishDescription: 'One-Pot-Vegetarian-Orzo-Vegetable-Soup',
    dishAvailability: false,
    dishType: 1,
    count: 0,
    addonCat: [],
  },
  {
    dishId: '100000007',
    dishName: 'low-carb-chicken-soup',
    dishPrice: 25,
    dishImage: 'https://i.imgur.com/y9vjbsn.jpg',
    dishCurrency: 'SAR',
    dishCalories: 45,
    dishDescription:
      'wholesomeyum_low-carb-chicken-soup-with-spaghetti-squash-paleo-gluten-free.jpg',
    dishAvailability: false,
    dishType: 1,
    count: 0,
    addonCat: [],
  },
]

// write your code here
class App extends Component {
  state = {
    data: null,
    categoryId: 11,
    dishesArr: dishes,
    count: 0,
    id: 0,
    filteredObj: {},
  }

  componentDidMount() {
    this.getResults()
  }

  getAddOns = arr => {
    const resArr = arr.map(obj => ({
      addonCategoryId: obj.addon_category_id,
      addonCategory: obj.addon_category,
      addonSelection: obj.addon_selection,
      addOns: obj.addons.map(ob => ({
        dishId: ob.dish_id,
        dishAvailability: ob.dish_Availability,
        dishCalories: ob.dish_calories,
        dishType: ob.dish_Type,
        dishCurrency: ob.dish_currency,
        dishDescription: ob.dish_description,
        dishImage: ob.dish_image,
        dishName: ob.dish_name,
        dishPrice: ob.dish_price,
      })),
    }))
    return resArr
  }

  getResults = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const obj = data[0]

    const updatedData = {
      restaurantName: obj.restaurant_name,
      tableMenuList: obj.table_menu_list.map(ob => ({
        menuCategoryId: ob.menu_category_id,
        menuCategory: ob.menu_category,
        menuCategoryImage: ob.menu_category_image,

        categoryDishes: ob.category_dishes.map(obj => ({
          dishId: obj.dish_id,
          dishAvailability: obj.dish_Availability,
          dishCalories: obj.dish_calories,
          dishType: obj.dish_Type,
          dishCurrency: obj.dish_currency,
          dishDescription: obj.dish_description,
          dishImage: obj.dish_image,
          dishName: obj.dish_name,
          dishPrice: obj.dish_price,
          count: 0,
          addonCat: this.getAddOns(obj.addonCat),
        })),
      })),
    }

    this.setState({data: updatedData})
  }

  onClickTab = id => {
    const {data} = this.state
    const {tableMenuList} = data
    const arr = tableMenuList.filter(obj => obj.menuCategoryId === id)

    const array = arr[0].categoryDishes

    this.setState({categoryId: id, dishesArr: array})
  }

  addItem = id => {
    const {dishesArr} = this.state
    const arr = dishesArr.map(obj => {
      if (obj.dishId === id) {
        return {...obj, count: obj.count + 1}
      }
      return obj
    })

    this.setState(prevState => ({
      count: prevState.count + 1,
      id,
      dishesArr: arr,
    }))
  }

  removeItem = id => {
    const {count, dishesArr} = this.state
    const arr = dishesArr.map(obj => {
      if (obj.dishId === id && obj.count > 0) {
        return {...obj, count: obj.count - 1}
      }
      return obj
    })
    if (count > 0) {
      this.setState(prevState => ({
        count: prevState.count - 1,
        id,
        dishesArr: arr,
      }))
    }
  }

  render() {
    const {data, categoryId, dishesArr, count, id} = this.state

    if (data !== null) {
      const {restaurantName, tableMenuList} = data

      return (
        <>
          <div className="navbar-bg">
            <h1 className="nav-heading">{restaurantName}</h1>
            <div className="orders-container">
              <p className="orders">My Orders</p>

              <div>
                <div className="order-count-con">
                  <p className="order-count">{count}</p>
                </div>
                <IoCartOutline className="cart-icon" />
              </div>
            </div>
          </div>
          <ul className="tabs-container">
            {tableMenuList.map(obj => (
              <TabItem
                key={obj.menuCategoryId}
                menuCategory={obj.menuCategory}
                id={obj.menuCategoryId}
                onClickTab={this.onClickTab}
                same={obj.menuCategoryId === categoryId}
              />
            ))}
          </ul>
          <ul className="dishes-container">
            {dishesArr.map(obj => (
              <DishItem
                key={obj.dishId}
                dishes={obj}
                addItem={this.addItem}
                removeItem={this.removeItem}
                count={count}
              />
            ))}
          </ul>
        </>
      )
    }
    return ''
  }
}
export default App
