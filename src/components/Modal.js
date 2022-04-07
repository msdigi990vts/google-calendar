const Modal = ({ isOpen = false, children }) => {
    if (!isOpen) {
        return null
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-40">
            <div className="p-4 bg-white">{children}</div>
        </div>
    )
}

export default Modal
