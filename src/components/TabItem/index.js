import './index.css'

const TabItem = props => {
  const {id, menuCategory, onClickTab, same} = props
  const clickTab = () => {
    onClickTab(id)
  }
  return (
    <li>
      <button
        className={same ? 'button-active' : 'button-inactive'}
        onClick={clickTab}
      >
        <p className={same ? 'tab-item-active' : 'tab-item-inactive'}>
          {menuCategory}
        </p>
      </button>
    </li>
  )
}

export default TabItem
