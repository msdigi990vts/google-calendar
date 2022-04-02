import React from "react"

const Input = ({
    value = '',
    handler = () => {},
    type = ''
}) => {
    return (
        <div className="border-2 border-gray-300 rounded">
            <input className="w-full px-4 py-4" type={type} value={value} onChange={handler} />
        </div>
    )
}

export default Input
