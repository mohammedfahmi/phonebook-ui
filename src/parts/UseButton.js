import {Button, FormHelperText} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
import FormControl from "@mui/material/FormControl";

const UseButton = (props) => {
    const handleClick = () => {
        props.click();
    }
    return (
        <FormControl fullWidth disabled={props.isDisabled} error={props.error.isError} sx={{minWidth: "10vw"}}>
            {
                props.containsIcon ?
                    <Button
                        id={props.id}
                        variant="contained"
                        startIcon={props.icon}
                        disabled={props.isDisabled}
                        onClick={handleClick}
                        sx={
                            props.error.isError ?
                                {maxHeight: "70%", minHeight: "70%"} :
                                {maxHeight: "100%", minHeight: "100%"}
                    }
                    >
                        {props.label}
                    </Button>
                    :
                    <Button
                        id={props.id}
                        variant="contained"
                        disabled={props.isDisabled}
                        onClick={handleClick}
                        sx={ props.error.isError ? {maxHeight: "70%", minHeight: "70%" } : {maxHeight: "100%", minHeight: "100%" }}
                    >
                        {props.label}
                    </Button>
            }
            { props.error.isError && <FormHelperText sx={{height: "30%"}}>{props.error.message}</FormHelperText> }
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