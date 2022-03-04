import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Users, User, Comments } from './ui'
import { routing } from './api'
import styles from './styles.module.sass'

const App = () => {
  return (
    <div className={styles.app}>
      <div>
        <Routes>
          <Route path={routing.home}>
            <Route path={routing.home} element={<Users />} />
            <Route path={`${routing.user}/:id`} element={<User />} />
            <Route
              path={`${routing.user}/:id/:commentsType/:typeId`}
              element={<Comments />}
            />
            <Route
              path="*"
              element={<Navigate to={routing.home} replace={true} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
