import fetch from 'isomorphic-fetch'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import format from 'date-fns/format'

const Home = () => {
    const token = useSelector((state) => state.auth.accessToken)
    const { data, loading, error } = useQuery('events', fetchData)

    async function fetchData() {
        const data = await fetch(`${process.env.REACT_APP_API_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.json()
    }

    function getTimeValues(date) {
        const formattedDate = format(new Date(date), 'dd.MM.yyyy.')
        const formattedTime = format(new Date(date), 'HH:mm')
        return { formattedDate, formattedTime }
    }

    const events = !loading && !error && data && data.items && data.items.length ? data.items : []

    const sortedEvents = events.sort((a, b) => {
        console.log(a.start.dateTime)
        return new Date(a.start.dateTime) - new Date(b.start.dateTime)
    })

    const groupedEvents = sortedEvents.reduce((a, v) => {
        const day = format(new Date(v.start.dateTime), 'dd.MM')
        let acc = { ...a }
        if (!acc[day]) {
            acc = {
                ...acc,
                [day]: [v]
            }
        } else {
            acc = {
                ...acc,
                [day]: [...acc[day], v]
            }
        }

        return acc
    }, {})

    const eventsByDay = Object.keys(groupedEvents).map((v, k) => (
        <div key={k} className="mb-10">
            <div className="text-xl underline">{v}</div>
            <div>
                {groupedEvents[v].map((v1, k1) => {
                    const startTime = getTimeValues(v1.start.dateTime)
                    const endTime = getTimeValues(v1.end.dateTime)

                    return (
                        <div key={k1} className="mb-5 last:mb-0">
                            <div className="text-xl">{v1.summary}</div>
                            <div className="flex items-baseline">
                                <div className="text-lg">
                                    Start time: {startTime.formattedDate} {startTime.formattedTime}
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <div className="text-lg">
                                    End time: {endTime.formattedDate} {endTime.formattedTime}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    ))

    const items = events.map((v, k) => {
        const startTime = getTimeValues(v.start.dateTime)
        const endTime = getTimeValues(v.end.dateTime)

        return (
            <div key={k}>
                <div className="text-xl">{v.summary}</div>
                <div className="flex items-baseline">
                    <div className="text-lg">
                        Start time: {startTime.formattedDate} {startTime.formattedTime}
                    </div>
                </div>
                <div className="flex items-baseline">
                    <div className="text-lg">
                        End time: {endTime.formattedDate} {endTime.formattedTime}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="container py-10">
            <div className="text-3xl text-center">Events</div>
            <div className="grid grid-cols-5 gap-6">{eventsByDay}</div>
        </div>
    )
}

export default Home
