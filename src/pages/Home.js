import fetch from 'isomorphic-fetch'
import { useState } from 'react'
import { useQuery } from 'react-query'
import format from 'date-fns/format'
import { useCookies } from 'react-cookie'
import Filters from '../components/Filters'

const Home = () => {
    const [cookies] = useCookies()
    const [filter, setFilter] = useState(1)
    const token = cookies.access_token
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
        const formattedTime = format(new Date(date), 'HH:mm')
        return formattedTime
    }

    const events = !loading && !error && data && data.items && data.items.length ? data.items : []

    const sortedEvents = events.sort((a, b) => {
        return new Date(a.start.dateTime) - new Date(b.start.dateTime)
    })

    const groupedEvents = sortedEvents.reduce((a, v) => {
        const day = format(new Date(v.start.dateTime), 'dd.MM.yy')
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
                                    Start time: {startTime.formattedDate} {startTime}
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <div className="text-lg">
                                    End time: {endTime.formattedDate} {endTime}
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

    const filtersData = [
        {
            display: 'Today',
            value: ''
        },
        {
            display: ' Next 7 days',
            value: ''
        },
        {
            display: 'Next 30 days',
            value: ''
        }
    ]

    return (
        <div className="container py-10">
            <div className="mb-10 text-3xl text-center">Events</div>
            <div className="mb-5">
                <Filters data={filtersData} handler={setFilter} active={filter} />
            </div>
            <div className="grid grid-cols-5 gap-6">{eventsByDay}</div>
        </div>
    )
}

export default Home
