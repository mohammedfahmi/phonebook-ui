import React, {useContext} from "react";
import {SelectedFiltersContext, DispatchFiltersContext} from "../../../../contexts/FilterConsoleContext";
import {DispatchCriteriaContext} from "../../../../contexts/PhoneBookContext";
import {Box, Stack} from "@mui/material";
import SelectFiltersForm from "../selecteFilterForm/SelectFiltersForm";
import UseChip from "../../../../lib/chip/UseChip";
import UseButton from "../../../../lib/button/UseButton";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {MainFilterConsoleStatusContext} from "../../../../contexts/AppContext";
import './FilterConsole.css'
import '../../../../App.css';

const FilterConsole = () => {
    const isMainFilterConsoleOpen = useContext(MainFilterConsoleStatusContext);
    const dispatchAddFilterCriteria = useContext(DispatchCriteriaContext);
    const dispatchFilterConsole = useContext(DispatchFiltersContext);
    const selectedFilters = useContext(SelectedFiltersContext);
    const dispatchRemoveFilterAction = (itemUuid) => {
        dispatchFilterConsole({
            type: "REMOVE",
            payload: {
                filterUuid: itemUuid
            }
        })
    }
    const dispatchResetFilterAction = () => {
        dispatchFilterConsole({
            type: "RESET"
        })
    }
    const handleSubmit = () => {
        dispatchAddFilterCriteria({
            type: "ADD_CRITERIA",
            payload: [...selectedFilters]
        })
        dispatchResetFilterAction();
    }
    return (
        <>
            {
                isMainFilterConsoleOpen &&
                <fieldset className="filterConsoleContainer">
                    <legend className="fieldsetLegend">FILTER CONSOLE</legend>
                    <SelectFiltersForm/>
                    <Box className="itemsContainer">
                        <div className="chipsArea">
                            {
                                selectedFilters.map(filter => {
                                    return (
                                        <UseChip
                                            itemUuid={filter.filterUuid}
                                            key={filter.filterUuid}
                                            value={`country:"${filter.countryName}" state:"${(filter.stateName !== "") ? filter.stateName : "*"}"`}
                                            delete={dispatchRemoveFilterAction}
                                        />
                                    )
                                })
                            }
                        </div>
                        <Stack direction="column" spacing={1} className="buttonsArea">
                            <UseButton
                                id={"reset-selected-filters-filterConsole"}
                                label="Reset"
                                containsIcon={true}
                                icon={<RestartAltIcon/>}
                                click={dispatchResetFilterAction}
                            />
                            <UseButton
                                id={"submit-selected-filters-filterConsole"}
                                label="Submit"
                                containsIcon={false}
                                click={handleSubmit}
                            />
                        </Stack>
                    </Box>
                </fieldset>
            }
        </>
    )
}

export default FilterConsole;