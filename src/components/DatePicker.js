import Picker from 'react-datepicker'
import Input from './Input'

const DatePicker = ({ value = '', onChange = () => {}, label = '', error = false }) => {
    return (
        <Picker
            selected={value}
            onChange={(date) => onChange(date)}
            customInput={<Input type="text" label={label} error={error} />}
            showTimeSelect
            dateFormat="dd.MM.yyyy. HH:mm"
            timeFormat="HH:mm"
        />
    )
}

export default DatePicker
