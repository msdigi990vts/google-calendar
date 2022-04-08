import { useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useForm, Controller } from 'react-hook-form'
import DatePicker from './DatePicker'

const AddEvent = ({ closeHandler = () => {}, submitHandler = () => {}, loading = false }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setError
    } = useForm()
    /* 
    useEffect(() => {
        const start = getValues('start')
        const end = getValues('end')
        if (new Date(end) <= new Date(start)) {
            console.log('caleed')
            setError('end', {
                type: 'custom',
                message: 'End time must be greater that start time'
            })
        }
    }) */

    return (
        <div>
            <div className="mb-5 text-xl text-center">Add new event</div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-4">
                    <Input
                        {...register('summary', {
                            required: true
                        })}
                        type="text"
                        error={errors.summary}
                        label="Event name"
                    />
                </div>
                <div className="mb-4">
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
                <div className="mb-12">
                    <Controller
                        name="end"
                        rules={{
                            required: true,
                            validate: (val) =>
                                val > getValues('start') ||
                                'End time must be greater than start time'
                        }}
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
