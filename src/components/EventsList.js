import Event from './Event'

const EventsList = ({
    data = null,
    isMonthView = false,
    deleteHandler = () => {},
    loading = false
}) => {
    if (loading) {
        return <div className="text-2xl">Loading...</div>
    }
    if (!data && !loading) {
        return <div className="text-2xl">No events to show</div>
    }

    const items = Object.keys(data).map((v, k) => (
        <div key={k} className="mb-10">
            <Event title={v} data={data[v]} alt={isMonthView} deleteHandler={deleteHandler} />
        </div>
    ))
    return <div className="grid grid-cols-5 gap-6">{items}</div>
}

export default EventsList
