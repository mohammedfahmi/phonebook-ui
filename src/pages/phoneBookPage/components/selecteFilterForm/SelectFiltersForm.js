import React, {useContext, useEffect, useState} from "react";
import {FiltersContext} from "../../../../contexts/PhoneBookContext";
import {DispatchFiltersContext} from "../../../../contexts/FilterConsoleContext";
import UseSelect from "../../../../lib/select/UseSelectHook";
import { Box } from "@mui/material";
import UseButton from "../../../../lib/button/UseButton";
import AddIcon from '@mui/icons-material/Add';
import useToggle from "../../../../hooks/useToggle";
import './SelectFilterForm.css';

const dispatchAddFilterAction = (selectedCountry, selectedState, contextFilters) => {

    const country = (isContextFiltersValid(contextFilters) && selectedCountry.uuid !== "") ?
        contextFilters.filter( filter => filter.uuid === selectedCountry.uuid)[0]:
        {countryName: "", code: "", uuid: ""};

    const state = (country.states.length > 0 && selectedState.uuid !== "") ?
        country.states.filter( state => state.stateUuid === selectedState.uuid)[0] :
        {stateName: "", stateCode: "", stateUuid: ""};

    return {
        type: "ADD",
        payload: {
            countryName: country.countryName,
            countryCode: country.code,
            countryUuid: country.uuid,
            stateName: state.stateName,
            stateCode: state.stateCode,
            stateUuid: state.stateUuid
        }
    };
}
const isContextFiltersValid = (contextFilters) => {
    return Array.isArray(contextFilters) && contextFilters.length > 0;
}
const getCountryFromFilters = (countryName, contextFilters) => {
    return (isContextFiltersValid(contextFilters) && countryName !== "") ?
        contextFilters.filter(filter => filter.countryName === countryName)[0]
        : {value: "", uuid: ""};
}
const countriesSelectItems = (contextFilters) => {
    return (isContextFiltersValid(contextFilters)) ?
        contextFilters.map(filter => {
            return {value: filter.countryName, uuid: filter.uuid}
        }) : [];
}
const selectedCountryState = (selectedCountryUuid, contextFilters) => {
    if (isContextFiltersValid(contextFilters) && selectedCountryUuid !== "") {
        const selectedCountry = contextFilters.filter(filter => filter.uuid === selectedCountryUuid)[0];
        return selectedCountry.states.map(state => {
            return {value: state.stateName, uuid: state.stateUuid};
        });
    } else {
        return [];
    }
}
const SelectFiltersForm = () => {
    const contextFilters = useContext(FiltersContext);
    const dispatchFilterConsole = useContext(DispatchFiltersContext);

    const initialSelectValue = {value: "", uuid: ""};

    const [selectFormError, toggleSelectFormError] = useToggle();
    const [selectedCountry, setSelectedCountry] = useState(initialSelectValue);
    const [selectedState, setSelectedState] = useState(initialSelectValue);
    const [selectStateItems, setSelectedStateItems] = useState([]);

    const handleSelectCountries = (countryName) => {
        const countryFilter = getCountryFromFilters(countryName, contextFilters);
        setSelectedCountry({value: countryFilter.countryName, uuid: countryFilter.uuid});
    }
    const handleSelectStates = (stateName) => {
        setSelectedState(selectStateItems.filter(stateItem => stateItem.value === stateName)[0]);
    }
    const resetSelectedState = () => {
        setSelectedState(initialSelectValue);
    }
    const handleAddFilter = () => {
        if(selectedCountry.value === "") {
            !selectFormError && toggleSelectFormError();
        } else {
            dispatchFilterConsole(dispatchAddFilterAction(selectedCountry, selectedState, contextFilters));
            setSelectedCountry(initialSelectValue);
            setSelectedState(initialSelectValue);
        }
    }
    useEffect(() => {
            selectFormError && toggleSelectFormError();
            resetSelectedState();
            setSelectedStateItems([...selectedCountryState(selectedCountry.uuid, contextFilters)]);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selectedCountry])
    return (
        <div className="selectForm-container">
            <Box className="select-group ">
                <UseSelect
                    id="select-country-filterConsole"
                    label="Country"
                    value={selectedCountry.value}
                    items={countriesSelectItems(contextFilters)}
                    error={{isError: selectFormError, message: "you must at lease select a country." }}
                    isDisabled={false}
                    onSelect={handleSelectCountries}
                />
                <UseSelect
                    id="select-state-filterConsole"
                    label="State"
                    value={selectedState.value}
                    items={selectStateItems}
                    isDisabled={(selectStateItems.length === 0)}
                    onSelect={handleSelectStates}
                />
            </Box>
            <Box className="select-group-add-button">
                <UseButton
                    id="add-filter-filterConsole"
                    label="Add"
                    containsIcon={true}
                    icon={<AddIcon/>}
                    error={{isError: selectFormError, message: "select a filter first." }}
                    click={handleAddFilter}
                />
            </Box>
        </div>
    )
}
export default SelectFiltersForm