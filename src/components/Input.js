import { forwardRef } from 'react'

const Input = forwardRef(({ type = '', error = null, label = '', ...rest }, ref) => (
    <div>
        {console.log(error)}
        {label && <div className="text-sm">{label}</div>}
        <div className={`border-2 rounded ${error ? 'border-red-400' : 'border-gray-300'}`}>
            <input ref={ref} className="w-full" type={type} {...rest} />
        </div>
        {error && (
            <div className="relative">
                <div className="absolute inset-0 text-xs text-red-600">{error.message}</div>
            </div>
        )}
    </div>
))

export default Input
