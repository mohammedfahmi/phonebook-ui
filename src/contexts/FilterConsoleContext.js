import {createContext, useReducer} from "react";
import FilterConsoleReducer from "../reducers/FilterConsoleReducer"

export const SelectedFiltersContext = createContext(undefined);
export const DispatchFiltersContext = createContext(undefined);

export const FilterConsoleProvider = (props) => {
    const [selectedFilters, dispatch] = useReducer(FilterConsoleReducer, []);
    return (
        <SelectedFiltersContext.Provider value={selectedFilters}>
            <DispatchFiltersContext.Provider value={dispatch}>
                {props.children}
            </DispatchFiltersContext.Provider>
        </SelectedFiltersContext.Provider>
    )
}