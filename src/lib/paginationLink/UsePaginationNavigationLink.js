import React from "react";
import PropTypes from "prop-types"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Tooltip from '@mui/material/Tooltip';
import './UsePaginationNavigationLink.css';

const UsePaginationNavigationLink = (props) => {

    const handleClick = () => {
        props.click(props.paginationLink);
    }
    switch (props.link) {
        case "FIRST":
            return (
                <Tooltip title="load first page" placement="left-start">
                    <SkipPreviousIcon id={props.id}
                                      className={`paginationLink ${props.isDisabled && "paginationLink-disabled"}`}
                                      onClick={handleClick}/>
                </Tooltip>
            );
        case "PREV":
            return (
                <Tooltip title="load previous pag" placement="left-start">
                    <NavigateBeforeIcon id={props.id}
                                        className={`paginationLink ${props.isDisabled && "paginationLink-disabled"}`}
                                        onClick={handleClick}/>
                </Tooltip>
            );
        case "NEXT":
            return (
                <Tooltip title="load next page" placement="left-start">
                    <NavigateNextIcon id={props.id}
                                      className={`paginationLink ${props.isDisabled && "paginationLink-disabled"}`}
                                      onClick={handleClick}/>
                </Tooltip>
            );
        case "LAST":
            return (
                <Tooltip title="load last page" placement="left-start">
                    <SkipNextIcon id={props.id}
                                  className={`paginationLink ${props.isDisabled && "paginationLink-disabled"}`}
                                  onClick={handleClick}/>
                </Tooltip>
            );
        default:
            return (
                <Tooltip title="load first page" placement="left-start">
                    <SkipPreviousIcon id={props.id}
                                      className={`paginationLink ${props.isDisabled && "paginationLink-disabled"}`}
                                      onClick={handleClick}/>
                </Tooltip>
            );

    }
}

UsePaginationNavigationLink.propTypes = {
    id: PropTypes.string.isRequired,
    link: PropTypes.oneOf(["FIRST", "PREV", "NEXT", "LAST"]).isRequired,
    isDisabled: PropTypes.bool.isRequired,
    paginationLink: PropTypes.object.isRequired,
    click: PropTypes.func.isRequired

}
export default UsePaginationNavigationLink;