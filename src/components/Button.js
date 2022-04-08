import { Link } from 'react-router-dom'

const Button = ({ value = '', handler = () => {}, link = '', light = false }) => {
    const inner = (
        <div
            className={`w-full px-4 py-2 text-center rounded cursor-pointer select-none ${
                light ? 'bg-gray-500' : 'bg-blue-600 '
            }`}>
            <div className="text-lg text-white ">{value}</div>
        </div>
    )
    if (link) {
        return <Link to={link}>{inner}</Link>
    }
    return <div onClick={handler}>{inner}</div>
}

export default Button
