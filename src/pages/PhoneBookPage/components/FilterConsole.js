import React, {useContext} from "react";
import {SelectedFiltersContext, DispatchFiltersContext} from "../../../contexts/FilterConsoleContext";
import {DispatchCriteriaContext} from "../../../contexts/PhoneBookContext";
import {Box, Stack} from "@mui/material";
import SelectFiltersForm from "./SelectFiltersForm";
import UseChip from "../../../parts/UseChip";
import UseButton from "../../../parts/UseButton";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {MainFilterConsoleStatusContext} from "../../../contexts/AppContext";

const styles = {
    filterConsoleContainer: {
        margin: "0.5em 5em 2.5em 5em",
        border: "3px solid #c0c0c0",
        borderRadius: "1em 0.25em 1em 5em",
        boxShadow: "10px 13px 10px rgba(0, 0, 0, 0.35)",
        backgroundColor: "rgb(255 249 249)",
        transitionDuration: "500ms"
    },
    filterConsoleFieldsetLegend: {
        fontSize: "1.25em",
        marginLeft: "0.3em",
        lineHeight: "0.5em",
        padding: "0.6em",
        textAlign: "start",
        fontFamily: "Arial",
        color: "white",
        backgroundColor: "#1976d2",
        borderRadius: "10px",
        border: "1px solid #1976d2"
    },
    chipsFieldsetLegend: {
        fontSize: "1em",
        lineHeight: "0.5em",
        marginLeft: "0.75em",
        padding: "0.7em",
        textAlign: "start",
        fontFamily: "Arial",
        color: "white",
        backgroundColor: "#1976d2",
        borderRadius: "7px",
        border: "1px solid #1976d2"
    },
    itemsContainer: {
        display: "grid",
        gridTemplateColumns: "80% 19%",
        gridTemplateRows: "repeat(2, 1fr)",
        justifyItems: "center",
        alignItems: "center",
        margin: "1em"
    },
    chipsArea: {
        gridColumnStart: "1",
        gridColumnEnd: "2",
        gridRowStart: "1",
        gridRowEnd: "3",
        marginLeft: "1.5em",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "1em",
        border: "1px solid #CCCCCC",
        borderRadius: "1.5em",
        boxShadow: "3px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.30)",
        backgroundColor: "white",
        alignSelf: "stretch",
        justifySelf: "stretch"
    },
    buttonsArea: {
        margin: "1em",
        gridColumnStart: "2",
        gridColumnEnd: "3",
        gridRowStart: "1",
        gridRowEnd: "3",
    }
}
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
                <fieldset style={styles.filterConsoleContainer}>
                    <legend style={styles.filterConsoleFieldsetLegend}>Filter phone numbers</legend>
                    <SelectFiltersForm/>
                    <Box sx={styles.itemsContainer}>
                        <fieldset style={styles.chipsArea}>
                            <legend style={styles.chipsFieldsetLegend}>Selected filters</legend>
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
                        </fieldset>
                        <Stack direction="column" spacing={1} sx={styles.buttonsArea}>
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