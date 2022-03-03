import { useMemo } from 'react'
import { useFetch } from '../hooks'
import { endpoint } from '../api'
import { utils } from '../utils'

const getUserStat = (stat, id) =>
  stat?.find((items) => items?.[0]?.userId === id)

export const Layout = () => {
  const [users_, usersError] = useFetch(endpoint.users())
  const users = useMemo(
    () =>
      users_?.map(({ id, username, email }) => ({
        id,
        username,
        email,
      })),
    [users_]
  )

  const endpoints = ['posts', 'todos', 'albums'].reduce((acc, type) => {
    acc[type] = useMemo(
      () => users?.map(({ id }) => endpoint[type](id)),
      [users]
    )
    return acc
  }, {})

  const [posts, postsError] = useFetch(endpoints.posts, [endpoints.posts])
  const [todos, todosError] = useFetch(endpoints.todos, [endpoints.posts])
  const [albums, albumsError] = useFetch(endpoints.albums, [endpoints.posts])

  const error = utils.createErrorMessage({
    usersError,
    postsError,
    todosError,
    albumsError,
  })

  return (
    <div>
      {users && (
        <table>
          <thead>
            <tr>
              <td colSpan="2">USERS</td>
              <td>Posts</td>
              <td>Todos</td>
              <td>Albums</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{getUserStat(posts, user.id)?.length}</td>
                <td>{getUserStat(todos, user.id)?.length}</td>
                <td>{getUserStat(albums, user.id)?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}
