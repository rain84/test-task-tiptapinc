import React, { useContext, useState, useEffect } from 'react'

const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const [data, setData] = useState({})
  const update = (mixin, deps = []) =>
    useEffect(() => setData((prev) => ({ ...prev, ...mixin })), deps)
  const store = [data, update]

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
export const useStore = () => useContext(StoreContext)
