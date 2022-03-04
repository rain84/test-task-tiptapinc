export const API_URL = 'https://jsonplaceholder.typicode.com'

// prettier-ignore
export const endpoint = {
  users({ userId } = {}) {
    userId = userId ? `/${userId}` : ''
    return `${API_URL}/users${userId}`
  },

  posts({ userId, postId } = {}) {
    postId = postId ? `/${postId}` : ''
    const queryParams = userId ? `?userId=${userId}` : ''
    return `${API_URL}/posts${postId}${queryParams}`
  },

  todos() {
    return `${API_URL}/todos`
  },

  albums({ userId } = {}) {
    const queryParams = userId ? `?userId=${userId}` : ''
    return `${API_URL}/albums${queryParams}`
  },

  comments({ postId } = {}) {
    return `${API_URL}/posts/${postId}/comments`
  },

  photos({ albumId } = {}) {
    return `${API_URL}/albums/${albumId}/photos`
  },
}

export const routing = {
  home: '/',
  user: '/user',
}
