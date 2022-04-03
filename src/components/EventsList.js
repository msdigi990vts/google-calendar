import Event from './Event'

const EventsList = ({ data = null, isMonthView = false, deleteHandler = () => {} }) => {
    if (!data) {
        return null
    }

    const items = Object.keys(data).map((v, k) => (
        <div key={k} className="mb-10">
            {console.log('aaa', data[v])}
            <Event
                title={v}
                data={data[v]}
                alt={isMonthView}
                deleteHandler={() => deleteHandler(data[v].id)}
            />
        </div>
    ))
    return <div className="grid grid-cols-5 gap-6">{items}</div>
}

export default EventsList
