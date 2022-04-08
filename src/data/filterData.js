const endOfToday = new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
const weekFromToday = new Date(
    new Date(new Date().setDate(new Date().getDate() + 6)).setHours(23, 59, 59, 999)
).toISOString()
const monthFromNow = new Date(
    new Date(new Date().setDate(new Date().getDate() + 29)).setHours(23, 59, 59, 999)
).toISOString()

export default [
    {
        display: 'Today',
        value: endOfToday
    },
    {
        display: ' Next 7 days',
        value: weekFromToday
    },
    {
        display: 'Next 30 days',
        value: monthFromNow
    }
]
