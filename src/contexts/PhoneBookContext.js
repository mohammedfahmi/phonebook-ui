import React, {createContext, useEffect, useReducer, useState} from "react";
import GetFiltersApi from "../API/GetFiltersApi";
import FilterCriteriaReducer from "../reducers/FilterCriteriaReducer";

export const FiltersContext = createContext(undefined);
export const FiltersCriteriaContext = createContext(undefined);
export const DispatchCriteriaContext = createContext(undefined);

export function PhoneBookProvider(props) {
    const [fetchedFiltersState, setFetchedFiltersState] = useState();
    const [filterCriteriaState, dispatch] = useReducer(FilterCriteriaReducer, {
        paginationCriteria: {},
        phoneNumbersCriteria: []
    })
    useEffect(() => {
        async function fetch() {
            const filters = await GetFiltersApi();
            setFetchedFiltersState(filters);
        }
        fetch();
    }, []);

    return (
        <FiltersContext.Provider value={fetchedFiltersState}>
            <FiltersCriteriaContext.Provider value={filterCriteriaState}>
                <DispatchCriteriaContext.Provider value={dispatch}>
                    {props.children}
                </DispatchCriteriaContext.Provider>
            </FiltersCriteriaContext.Provider>
        </FiltersContext.Provider>
    )
}