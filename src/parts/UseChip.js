import React from 'react';
import PropTypes from "prop-types"
import Chip from '@mui/material/Chip';

const UseChip = (props) => {
    const handleDelete = () => {
        props.delete(props.itemUuid);
    };
    return (
        <Chip sx={{margin: "0.1em"}} label={props.value} onDelete={handleDelete}/>
    );
}
UseChip.prototype = {
    itemUuid: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    delete: PropTypes.func.isRequired
}
export default UseChip;