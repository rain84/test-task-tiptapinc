import React, { useState, useEffect } from 'react'

const initialStore = []

export const StoreContext = React.createContext(initialStore)
export const StoreProvider = ({ children }) => {
  const [data, setData] = useState({})
  const update = (mixin, deps = []) =>
    useEffect(() => setData((prev) => ({ ...prev, ...mixin })), deps)
  const store = [data, update]

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
