import PropTypes from 'prop-types';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {FormHelperText} from "@mui/material";

const UseSelect = (props) => {
    const handleChange = (event) => {
        props.onSelect(event.target.value);
    };
    return (
            <FormControl fullWidth disabled={props.isDisabled} error={props.error.isError} sx={{margin: "0.5em", minWidth: "15vw"}}>
                <InputLabel id={`${props.label}-select-label`}>{props.label}</InputLabel>
                <Select
                    labelId={`${props.id}-label`}
                    id={props.id}
                    value={props.value}
                    label={props.label}
                    onChange={handleChange}
                >
                    {props.items.map(item => {
                        return (<MenuItem value={item.value} key={item.uuid}>{item.value}</MenuItem>)
                    })}
                </Select>
                { props.error.isError && <FormHelperText>{props.error.message}</FormHelperText> }
            </FormControl>
    )
}
UseSelect.defaultProps = {
    isDisabled: false,
    isError: false,
    error: {
        isError: false,
        message:""
    }
};
UseSelect.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.exact({value: PropTypes.string, uuid: PropTypes.string})),
    isDisabled: PropTypes.bool,
    error: PropTypes.exact({
        isError: PropTypes.bool,
        message: PropTypes.string,
    }),
    onSelect: PropTypes.func,
}
export default UseSelect;