import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFetch, useStore } from '../hooks'
import { endpoint, routing } from '../app.config'
import { utils } from '../utils'
import { Error, Table } from '../ui'
import style from './style.module.sass'

const getUserStat = (stat, id) =>
  stat?.find((items) => items?.[0]?.userId === id)

export const Users = () => {
  const navigate = useNavigate()
  const onClick = useCallback((e) => {
    const { id } = e.target.closest('[data-id]')?.dataset
    if (!id) return

    const url = `${routing.user}/${id}`
    navigate(url)
  }, [])

  const [users_, usersError] = useFetch(endpoint.users())
  const users = useMemo(
    () =>
      users_?.map(({ id, name, username, email }) => ({
        id,
        name,
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

  const [store, updateStore] = useStore()
  updateStore({ users, posts, albums, todos }, [users, posts, albums, todos])

  if (error) return <Error>{error}</Error>
  if (!users) return null

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <td colSpan="2" className={style.text_center}>
            USERS
          </td>
          <td>Posts</td>
          <td>Todos</td>
          <td>Albums</td>
        </tr>
      </thead>
      <tbody onClick={onClick}>
        {users.map((user) => (
          <tr key={user.id} data-id={user.id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{getUserStat(posts, user.id)?.length}</td>
            <td>{getUserStat(todos, user.id)?.length}</td>
            <td>{getUserStat(albums, user.id)?.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
