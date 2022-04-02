const Filters = ({ data = [], handler = () => {}, active = -1 }) => {
    const items = data.map((v, k) => (
        <div
            key={k}
            onClick={() => handler(k)}
            className={`mr-5 text-blue-600 border rounded-md p-2 cursor-pointer select-none last:mr-0 ${
                active === k ? ' border-blue-600' : 'border-transparent'
            }`}>
            {v.display}
        </div>
    ))

    return <div className="flex">{items}</div>
}

export default Filters
