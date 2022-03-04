import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Users, User, Comments, Photos } from './ui'
import { routing } from './app.config'
import styles from './styles.module.sass'

const App = () => {
  return (
    <div className={styles.app}>
      <div>
        <Routes>
          <Route path={routing.home}>
            <Route path={routing.home} element={<Users />} />
            <Route path={`${routing.user}/:userId`} element={<User />} />
            <Route
              path={`${routing.user}/:userId/posts/:postId/comments`}
              element={<Comments />}
            />
            <Route
              path={`${routing.user}/:userId/albums/:albumId/photos`}
              element={<Photos />}
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
