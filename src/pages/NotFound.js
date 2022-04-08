import Button from '../components/Button'

const NotFound = () => {
    return (
        <div className="container py-20">
            <div className="mb-6 text-4xl text-center">404 not found</div>
            <div className="flex justify-center">
                <div className="inline-block">
                    <Button value="Back to login" link="/" />
                </div>
            </div>
        </div>
    )
}

export default NotFound
