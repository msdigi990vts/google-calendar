const Button = ({ value = '', handler = () => {}, light = false }) => {
    return (
        <div
            onClick={handler}
            className={`w-full px-4 py-2 text-center rounded cursor-pointer select-none ${
                light ? 'bg-gray-500' : 'bg-blue-600 '
            }`}>
            <div className="text-lg text-white ">{value}</div>
        </div>
    )
}

export default Button
