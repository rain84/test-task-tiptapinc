import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Users, User, Subcomments } from './ui'
import { StoreProvider } from './hooks'
import { routing } from './api'
import './styles.css'

const App = () => {
  return (
    <StoreProvider>
      <Routes>
        <Route path={routing.home}>
          <Route path={routing.home} element={<Users />} />
          <Route path={`${routing.user}/:id`} element={<User />} />
          <Route path={routing.subcomments} element={<Subcomments />} />
          <Route
            path="*"
            element={<Navigate to={routing.home} replace={true} />}
          />
        </Route>
      </Routes>
    </StoreProvider>
  )
}

export default App
