import './index.css'

const TabItem = props => {
  const {id, menuCategory, onClickTab, same} = props
  const clickTab = () => {
    onClickTab(id)
  }
  return (
    <button
      className={same ? 'button-active' : 'button-inactive'}
      onClick={clickTab}
    >
      <li className={same ? 'tab-item-active' : 'tab-item-inactive'}>
        {menuCategory}
      </li>
    </button>
  )
}

export default TabItem
