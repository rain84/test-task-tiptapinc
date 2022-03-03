import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFetch, useStore } from '../hooks'
import { endpoint } from '../api'

export const User = () => {
  const navigate = useNavigate()
  const onClickBack = () => navigate(-1)
  const [store, update] = useStore()
  console.log('store', store)

  return (
    <div>
      <button onClick={onClickBack}>Back</button>
      <br />

      <table>
        <thead>
          <tr>
            <td colSpan="2">USER </td>
          </tr>
        </thead>
        <tbody onClick={onClickBack}>
          {/* {users.map((user) => (
            <tr key={user.id} data-id={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{getUserStat(posts, user.id)?.length}</td>
              <td>{getUserStat(todos, user.id)?.length}</td>
              <td>{getUserStat(albums, user.id)?.length}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  )
}
