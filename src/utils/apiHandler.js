import fetch from 'isomorphic-fetch'

async function apiHandler(token, url = '', options) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (data.status === 204) {
        return null
    }
    return data.json()
}

export default apiHandler
