import {v4 as uuid} from "uuid";

const addConsoleFilter = (state, action) => {
    const {countryName, countryCode, countryUuid, stateName, stateCode, stateUuid} = action.payload;
    if (!state.some(stateFilter => (stateFilter.countryUuid === countryUuid)) || !state.some(stateFilter => stateFilter.stateUuid === stateUuid)) {
        const newState = [
            ...state,
            {
                filterUuid: uuid(),
                countryName: countryName,
                countryCode: countryCode,
                countryUuid: countryUuid,
                stateName: stateName,
                stateCode: stateCode,
                stateUuid: stateUuid
            }
        ];
        return newState;
    } else {
        return state;
    }
}
const removeConsoleFilter = (state, action) => {
    return state.filter(stateConsoleFilter => action.payload.filterUuid !== stateConsoleFilter.filterUuid);
}

const FilterConsoleReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return addConsoleFilter(state, action);
        case "REMOVE":
            return removeConsoleFilter(state, action);
        case "RESET":
            return [];
        default:
            return state;
    }
};
export default FilterConsoleReducer;