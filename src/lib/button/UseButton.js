import {Button, FormHelperText} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import '../../index.css'

const UseButton = (props) => {
    const handleClick = () => {
        props.click();
    }
    return (
        <FormControl disabled={props.isDisabled} error={props.error.isError} >
            {
                props.containsIcon ?
                    <Button
                        id={props.id}
                        className="app-accent-color"
                        variant="contained"
                        startIcon={props.icon}
                        disabled={props.isDisabled}
                        onClick={handleClick}
                    >
                        {props.label}
                    </Button>
                    :
                    <Button
                        id={props.id}
                        variant="contained"
                        classes={{root: "app-accent-color"}}
                        disabled={props.isDisabled}
                        onClick={handleClick}
                    >
                        {props.label}
                    </Button>
            }
            { props.error.isError && <FormHelperText>{props.error.message}</FormHelperText> }
        </FormControl>
    )
}

UseButton.defaultProps = {
    containsIcon: false,
    isDisabled: false,
    error: {
        isError: false,
        message:""
    }
};
UseButton.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    click: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool,
    containsIcon: PropTypes.bool,
    error: PropTypes.exact({
        isError: PropTypes.bool,
        message: PropTypes.string,
    }),
    icon: PropTypes.object
}

export default UseButton