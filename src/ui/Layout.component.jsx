import { useState, useEffect } from 'react'

const API_URL = 'https://jsonplaceholder.typicode.com'

export const Layout = () => { 
    const [users, setUsers] = useState(null)
    const [statistic, setStatistic] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const users = (await (await fetch(`${API_URL}/users?`)).json())
                    .map(({id, username, email}) => ({id, username, email}))

                setUsers(users)

                users.forEach(user => {
                    ; (async () => {
                        const posts = (await fetch(`${API_URL}/posts?userId=${user.id}`)).json()
                        // const todos = fetch(`${API_URL}/todos?userId=${user.id}`)
                        // const albums = fetch(`${API_URL}/albums?userId=${user.id}`)

                        statistic.push(Promise.allSettled([posts,]))
                        // statistic.push(Promise.allSettled([posts, todos, albums]))
                    } )()
                })

                // statistic = await Promise.allSettled(statistic)
                console.log(JSON.stringify(statistic, null, ' '))

            } catch (error) {
                alert(`Catched error: ${error.message}`)
            }
        })()
    }, [])

    return (
        <div>
            {users && (
                <table>
                <thead>
                    <tr><td rowSpan="2">USERS</td><td rowSpan="3">STATISTIC</td></tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={ user.id }>
                                <td>{ user.username }</td>
                                <td>{ user.email }</td>
                                <td>{ 'statistic' }</td>
                                <td>{ 'statistic' }</td>
                                <td>{ 'statistic' }</td>
                            </tr>
                        ))}        
                    </tbody>
                </table>
            )}
        </div>
    )
}
