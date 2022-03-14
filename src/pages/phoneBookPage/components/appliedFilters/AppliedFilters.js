import {Box, Stack} from "@mui/material";
import {FiltersCriteriaContext, DispatchCriteriaContext} from "../../../../contexts/PhoneBookContext"
import React, {useContext} from "react";
import UseChip from "../../../../lib/chip/UseChip";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UseButton from "../../../../lib/button/UseButton";
import './AppliedFilters.css';
import '../../../../App.css';

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
                <fieldset className="appliedFiltersContainer">
                    <legend className="fieldsetLegend">APPLIED FILTERS</legend>
                    <Box className="chipsArea">
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
                    </Box>
                    <Stack direction="column" spacing={1} className="buttonsArea">
                        <UseButton
                            id={"reset-filterCriteria-appliedFilters"}
                            label="Reset"
                            containsIcon={true}
                            icon={<RestartAltIcon/>}
                            click={dispatchResetCriteriaAction}
                        />
                    </Stack>
                </fieldset>
            }
        </>
    )
}
export default AppliedFilters;