import React, {useContext} from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {ToggleMainFilterConsoleStatusContext} from "../../../contexts/AppContext";
import { PhoneBookIcon, JumiaIcon } from './assets';
import '../../../index.css'
import './AppHeader.css'
import UseButton from "../../../lib/button/UseButton";

const AppHeader = () => {
    const toggleMainFilterConsoleStatus = useContext(ToggleMainFilterConsoleStatusContext);
    return (
        <div className="header app-complementary-color main-font-color">
            <div className="header-title-container">
                <JumiaIcon className="header-title-icon" />
                <PhoneBookIcon className="header-title-icon" />
                <div className="header-title">Phone book</div>
            </div>
            <div className="filter-button-container">
                <UseButton
                    id="open-filterConsole"
                    label="Filters"
                    containsIcon={true}
                    icon={<FilterAltIcon/>}
                    click={toggleMainFilterConsoleStatus}
                />
            </div>
        </div>
    );
}

export default AppHeader;