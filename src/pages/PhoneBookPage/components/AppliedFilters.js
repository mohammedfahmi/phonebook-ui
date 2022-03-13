import {Box, Stack} from "@mui/material";
import {FiltersCriteriaContext, DispatchCriteriaContext} from "../../../contexts/PhoneBookContext"
import React, {useContext} from "react";
import UseChip from "../../../parts/UseChip";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UseButton from "../../../parts/UseButton";

const styles = {
    appliedFiltersContainer: {
        margin: "1.5em 5em",
        padding: "1em 1em 1.5em 1em",
        border: "3px solid #c0c0c0",
        borderRadius: "2em",
        boxShadow: "3px 5px 4px rgba(0, 0, 0, 0.25)",
        backgroundColor: "rgb(255 249 249)",
        display: "grid",
        gridTemplateColumns: "80% 19%",
        justifyItems: "center",
        alignItems: "center"
    },
    appliedFiltersFieldsetLegend: {
        fontSize: "1em",
        marginLeft: "0.75em",
        lineHeight: "0.5em",
        padding: "0.7em",
        textAlign: "start",
        fontFamily: "Arial",
        color: "white",
        backgroundColor: "#1976d2",
        borderRadius: "7px",
        border: "1px solid #1976d2"
    },
    chipsArea: {
        gridColumnStart: "1",
        gridColumnEnd: "2",
        gridRowStart: "1",
        gridRowEnd: "2",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "1em 1em 1.5em",
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
        gridRowEnd: "2",
    }
}

const AppliedFilters = () => {
    const {phoneNumbersCriteria} = useContext(FiltersCriteriaContext);
    const dispatchCriteriaActions = useContext(DispatchCriteriaContext);
    const dispatchRemoveCriteriaAction = (itemUuid) => {
        dispatchCriteriaActions({
            type: "REMOVE_CRITERIA",
            payload: {
                filterUuid: itemUuid
            }
        });
    }
    const dispatchResetCriteriaAction = () => {
        dispatchCriteriaActions({type: "RESET_CRITERIA"});
    }
    return (
        <>
            {
                (phoneNumbersCriteria.length > 0) &&
                <Box sx={styles.appliedFiltersContainer}>
                    <fieldset style={styles.chipsArea}>
                        <legend style={styles.appliedFiltersFieldsetLegend}>Applied filters</legend>
                        {
                            phoneNumbersCriteria.map(filter => {
                                return (
                                    <UseChip
                                        itemUuid={filter.filterUuid}
                                        key={filter.filterUuid}
                                        value={`country:"${filter.countryName}" state:"${(filter.stateName !== "") ? filter.stateName : "*"}"`}
                                        delete={dispatchRemoveCriteriaAction}
                                    />
                                )
                            })
                        }
                    </fieldset>
                    <Stack direction="column" spacing={1} sx={styles.buttonsArea}>
                        <UseButton
                            id={"reset-filterCriteria-appliedFilters"}
                            label="Reset"
                            containsIcon={true}
                            icon={<RestartAltIcon/>}
                            click={dispatchResetCriteriaAction}
                        />
                    </Stack>
                </Box>
            }
        </>
    )
}
export default AppliedFilters;