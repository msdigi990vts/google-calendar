import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import apiHandler from '../utils/apiHandler'
import format from 'date-fns/format'
import getWeek from 'date-fns/getWeek'
import Filters from '../components/Filters'
import { useCookies } from 'react-cookie'
import EventsList from '../components/EventsList'
import Button from '../components/Button'
import Modal from '../components/Modal'
import AddEvent from '../components/AddEvent'
import filtersData from '../data/filterData'

const Home = () => {
    const [cookies] = useCookies()
    const queryClient = useQueryClient()
    const token = cookies.access_token
    const [selectedFilter, setSelectedFilter] = useState(1)
    const [deleteLoadingId, setDeleteLoadingId] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const startOfToday = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()

    const queryParams = `?timeMin=${startOfToday}&timeMax=${filtersData[selectedFilter].value}`

    const { data, isLoading, isError } = useQuery(['events', queryParams], () =>
        apiHandler(token, queryParams)
    )

    const { mutate: delMutate } = useMutation(
        (id) => apiHandler(token, `/${id}`, { method: 'DELETE' }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('events')
                setDeleteLoadingId('')
            }
        }
    )
    const { mutate: addMutate, isLoading: addLoading } = useMutation(
        (data) =>
            apiHandler(token, '', {
                method: 'POST',
                body: data
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('events')
                setModalOpen(false)
            }
        }
    )

    async function deleteEvent(id) {
        try {
            setDeleteLoadingId(id)
            await delMutate(id)
        } catch (e) {
            console.log(e)
            setDeleteLoadingId('')
        }
    }

    async function addEvent(payload) {
        try {
            const { start, end, summary } = payload
            const data = `{
                end: {
                    dateTime: '${end.toISOString()}'
                },
                start: {
                    dateTime: '${start.toISOString()}'
                },
                summary: '${summary}'
            }`
            await addMutate(data)
        } catch (e) {
            console.log(e)
        }
    }

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
        }, null)
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
            <Modal isOpen={modalOpen}>
                <AddEvent
                    closeHandler={() => setModalOpen(false)}
                    submitHandler={addEvent}
                    loading={addLoading}
                />
            </Modal>
            <div className="fixed inline-block top-10 right-20">
                <Button value="Add event" handler={() => setModalOpen(true)} />
            </div>
            <div className="mb-10 text-3xl text-center">Events</div>
            <div className="mb-5">
                <Filters data={filtersData} handler={setSelectedFilter} active={selectedFilter} />
            </div>
            <div>
                <EventsList
                    data={groupedEvents}
                    deleteHandler={deleteEvent}
                    loading={isLoading}
                    isMonthView={isViewByWeek}
                    deleteLoadingId={deleteLoadingId}
                />
            </div>
        </div>
    )
}

export default Home
