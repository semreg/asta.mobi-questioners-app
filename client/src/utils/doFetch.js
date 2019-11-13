import { backendUrl } from '../config'

const doFetch = async (token, method = 'GET', route, body = {}) => {
  const res = method === 'GET' || method === 'DELETE'
    ? (
      await fetch(`${backendUrl}/api/${route}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
    : (
      await fetch(`${backendUrl}/api/${route}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }))

  const data = await res.json()

  return data
}

export default doFetch
