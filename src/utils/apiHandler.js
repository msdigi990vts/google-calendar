import fetch from 'isomorphic-fetch'

async function fetchData(token, filters) {
    const startOfToday = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()

    const filterString = filters
        ? Object.keys(filters)
              .map((v) => {
                  return `&${v}=${filters[v]}`
              })
              .join('')
        : ''

    const data = await fetch(
        `${process.env.REACT_APP_API_URL}?timeMin=${startOfToday}${filterString}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return data.json()
}

export default fetchData
