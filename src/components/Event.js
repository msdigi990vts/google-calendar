import format from 'date-fns/format'

const Event = ({ data = null, title = '', alt = false, deleteHandler = () => {} }) => {
    function getTimeValues(date) {
        const formattedTime = format(new Date(date), 'HH:mm')
        const formattedDate = format(new Date(date), 'dd.MM.yy.')
        return {
            time: formattedTime,
            date: formattedDate
        }
    }

    return (
        <div>
            <div className="text-xl underline">{alt ? `Week/${title}` : title}</div>
            <div>
                {data.map((v1, k1) => {
                    const startTime = getTimeValues(v1.start.dateTime).time
                    const endTime = getTimeValues(v1.end.dateTime).time
                    const date = getTimeValues(v1.end.dateTime).date

                    return (
                        <div key={k1} className="mb-5 last:mb-0">
                            <div className="text-xl">Title: {v1.summary}</div>
                            {alt && <div className="text-lg">Date: {date}</div>}
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
                            <div
                                onClick={deleteHandler}
                                className="text-sm text-blue-600 underline cursor-pointer select-none">
                                Delete event
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Event
