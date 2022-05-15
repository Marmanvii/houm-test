import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export const Selector = (props) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="select-label">{props.title}</InputLabel>
            <Select
                labelId="select-label"
                id="gender-select"
                value={props.value}
                label={props.title}
                onChange={props.handleChange}
            >
                {props.items.map((item) => {
                    return (
                        <MenuItem key={item.key} value={item.value}>{item.name}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default Selector;
