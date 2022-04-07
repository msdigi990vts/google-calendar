import Button from '../components/Button'
import Input from '../components/Input'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from './DatePicker'

const AddEvent = ({ closeHandler = () => {}, submitHandler = () => {}, loading = false }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm()
    return (
        <div>
            <div className="mb-5 text-xl text-center">Add new event</div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-3">
                    <Input
                        {...register('summary', {
                            required: true
                        })}
                        type="text"
                        error={errors.summary}
                        label="Event name"
                    />
                </div>
                <div className="mb-3">
                    <Controller
                        name="start"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                label="Start time"
                                error={errors.start}
                            />
                        )}
                    />
                </div>
                <div className="mb-3">
                    <Controller
                        name="end"
                        rules={{ required: true }}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <DatePicker
                                value={value}
                                onChange={onChange}
                                label="End time"
                                error={errors.end}
                            />
                        )}
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit">
                        <Button value={loading ? 'Loading...' : 'Submit'} />
                    </button>
                    <div className="ml-3">
                        <Button value="Cancel" light handler={closeHandler} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddEvent
