import { useState } from 'react'
import './style.css'

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to AVOID UNNECESSARY RE-RENDERS (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.

const SelectedItems = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li key={item} className="Badge">
        {item}
      </li>
    ))}
  </ul>
)

export const List = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const onClick = (e) => {
    const { classList, textContent } = e.target
    if (!classList.contains('List__item')) return

    classList.toggle('List__item--selected')
    e.stopPropagation()
    console.log(`textContent`, textContent)
    if (classList.contains('List__item--selected'))
      setSelectedItems((prev) => [...prev, textContent])
    else setSelectedItems((prev) => prev.filter((item) => item !== textContent))
  }

  return (
    <section className="Container">
      {selectedItems.length ? <SelectedItems items={selectedItems} /> : null}

      <ul className="List" onClick={onClick}>
        {items.map((item) => (
          <li
            key={item.name}
            className={`List__item List__item--${item.color}`}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
