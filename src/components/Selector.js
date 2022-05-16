import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

const SelectorForm = styled(FormControl)(({ theme }) => ({
    maxWidth: 300,
    width: `90vw`,
    margin: `10px 10px 10px`,
}));

export const Selector = (props) => {
    return (
        <SelectorForm>
            <InputLabel id="select-label">{props.title}</InputLabel>
            <Select
                labelId="select-label"
                id="select"
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
        </SelectorForm>
    )
}

export default Selector;
