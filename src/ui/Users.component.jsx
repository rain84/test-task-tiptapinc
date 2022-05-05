import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSimpleQuery } from '../hooks'
import { routing } from '../config'
import { utils } from '../utils'
import { Error } from '../ui'
import style from './style.module.sass'

const selectors = {
  userStat: (stat, id) => stat?.filter(({ userId }) => userId === id),
  pickUsersInfo: (users) =>
    users?.map(({ id, name, username, email }) => ({
      id,
      name,
      username,
      email,
    })),
}

export const Users = () => {
  const navigate = useNavigate()
  const onClick = useCallback((e) => {
    const { id } = e.target.closest('[data-id]')?.dataset
    if (!id) return

    const url = `${routing.user}/${id}`
    navigate(url)
  }, [])

  let [users, usersError] = useSimpleQuery('users')
  users = useMemo(() => selectors.pickUsersInfo(users), [users])

  const [posts, postsError] = useSimpleQuery('posts')
  const [todos, todosError] = useSimpleQuery('todos')
  const [albums, albumsError] = useSimpleQuery('albums')

  const err = utils.createErrorMessage({
    usersError,
    postsError,
    todosError,
    albumsError,
  })

  if (err) return <Error>{err}</Error>
  if (!users) return null

  return (
    <div>
      <br />

      <p className={style.text_center}>USERS ({users?.length ?? '0'})</p>

      <br />
      <table className={style.table}>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Posts</td>
            <td>Todos</td>
            <td>Albums</td>
          </tr>
        </thead>
        <tbody onClick={onClick}>
          {users.map((user) => (
            <tr key={user.id} data-id={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{selectors.userStat(posts, user.id)?.length}</td>
              <td>{selectors.userStat(todos, user.id)?.length}</td>
              <td>{selectors.userStat(albums, user.id)?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
