import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import apiHandler from '../utils/apiHandler'
import format from 'date-fns/format'
import getWeek from 'date-fns/getWeek'
import Filters from '../components/Filters'
import { useCookies } from 'react-cookie'
import EventsList from '../components/EventsList'

const Home = () => {
    const [cookies] = useCookies()
    const token = cookies.access_token
    const [selectedFilter, setSelectedFilter] = useState(1)
    const endOfToday = new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
    const weekFromToday = new Date(
        new Date(new Date().setDate(new Date().getDate() + 6)).setHours(23, 59, 59, 999)
    ).toISOString()
    const monthFromNow = new Date(
        new Date(new Date().setDate(new Date().getDate() + 30)).setHours(23, 59, 59, 999)
    ).toISOString()

    const filtersData = [
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

    const selectedFilterValue = filtersData[selectedFilter].value

    const queryFilter = {
        timeMax: selectedFilterValue
    }

    const { data, isLoading, isError } = useQuery(['events', queryFilter], () =>
        apiHandler(token, queryFilter)
    )

    const { mutate } = useMutation((id) => apiHandler(id))

    function sortEvents(data, isWeek) {
        return data.reduce((a, v) => {
            const key = isWeek
                ? getWeek(new Date(v.start.dateTime))
                : format(new Date(v.start.dateTime), 'dd.MM.yy')
            let acc = { ...a }
            if (!acc[key]) {
                acc = {
                    ...acc,
                    [key]: [v]
                }
            } else {
                acc = {
                    ...acc,
                    [key]: [...acc[key], v]
                }
            }

            return acc
        }, {})
    }

    const events =
        !isLoading && !isError && data && data.items && data.items.length ? data.items : []

    const sortedEvents = events.sort((a, b) => {
        return new Date(a.start.dateTime) - new Date(b.start.dateTime)
    })

    const isViewByWeek = selectedFilter === 2

    const groupedEvents = isViewByWeek ? sortEvents(sortedEvents, true) : sortEvents(sortedEvents)

    return (
        <div className="container py-10">
            <div className="mb-10 text-3xl text-center">Events</div>
            <div className="mb-5">
                <Filters data={filtersData} handler={setSelectedFilter} active={selectedFilter} />
            </div>
            <div>
                <EventsList data={groupedEvents} isMonthView={isViewByWeek} />
            </div>
        </div>
    )
}

export default Home
