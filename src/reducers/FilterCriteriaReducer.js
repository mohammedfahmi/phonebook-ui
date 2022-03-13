const filtersIsEqual = (filter1, filter2) => {
   return (
       filter1.countryName === filter2.countryName &&
       filter1.countryUuid === filter2.countryUuid &&
       filter1.stateName === filter2.stateName &&
       filter1.stateUuid === filter2.stateUuid
   )
}
const addCriteria = (state, action) => {
    const {paginationCriteria, phoneNumbersCriteria} = state;
    return {
        paginationCriteria: paginationCriteria,
        phoneNumbersCriteria: [
            ...phoneNumbersCriteria,
            ...action.payload.filter( filter => !phoneNumbersCriteria.some(stateFilter=> filtersIsEqual(stateFilter,filter)))
        ]
    }
}
const removeCriteria = (state, action) => {
    const {paginationCriteria, phoneNumbersCriteria} = state;
    return {
        paginationCriteria: paginationCriteria,
        phoneNumbersCriteria: phoneNumbersCriteria.filter( stateFilter => action.payload.filterUuid !== stateFilter.filterUuid)
    }
}
const addPaginationCriteria = (state, action) => {
    const {phoneNumbersCriteria} = state;
    return {
        paginationCriteria: action.payload,
        phoneNumbersCriteria: [...phoneNumbersCriteria]
    }
}
const setPaginationCriteria = (state, action) => {
    const {paginationCriteria, phoneNumbersCriteria} = state;
    return {
        paginationCriteria: action.payload,
        phoneNumbersCriteria: [...phoneNumbersCriteria]
    }
}
const FilterCriteriaReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CRITERIA":
            return addCriteria(state, action);
        case "REMOVE_CRITERIA":
            return removeCriteria(state, action);
        case "RESET_CRITERIA":
            return {
                paginationCriteria: {...state.paginationCriteria},
                phoneNumbersCriteria: []
            };
        case "SET_PAGINATION_CRITERIA":
            return addPaginationCriteria(state, action);
        default:
            return state;
    }
}
export default FilterCriteriaReducer;