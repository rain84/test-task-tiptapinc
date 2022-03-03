export const API_URL = 'https://jsonplaceholder.typicode.com'

// prettier-ignore
export const endpoint = {
    users() {return `${API_URL}/users`},
    posts(userId) { return `${API_URL}/posts?userId=${userId}`},
    todos(userId) { return `${API_URL}/todos?userId=${userId}`},
    albums(userId) { return `${API_URL}/albums?userId=${userId}`},
}

export const routing = {
  home: '/',
  user: '/user',
  subcomments: '/subcomments',
}
