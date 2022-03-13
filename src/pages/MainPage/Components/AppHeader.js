import React, {useContext} from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {ToggleMainFilterConsoleStatusContext} from "../../../contexts/AppContext";
import {Tooltip} from "@mui/material";

const AppHeader = () => {
    const toggleMainFilterConsoleStatus = useContext(ToggleMainFilterConsoleStatusContext);
    return (
        <div className="App-header">
            <div style={{fontSize: "2em", marginLeft: "2%"}}>Phone-Book</div>
            <Tooltip title="filters" placement="left-start">
                <FilterAltIcon onClick={toggleMainFilterConsoleStatus} style={{fontSize: "2em", marginRight: "2%"}}></FilterAltIcon>
            </Tooltip>

        </div>
    );
}

export default AppHeader;