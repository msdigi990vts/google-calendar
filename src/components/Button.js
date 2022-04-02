
const Button = ({
    value = '',
    handler = () => {}
}) => {
    return (
        <div onClick={handler} className="w-full px-4 py-6 text-center bg-blue-600 rounded cursor-pointer select-none">
            <div className="text-lg text-white ">
                {value}
            </div>
        </div>
    )
}

export default Button
