import React, {useContext, useEffect, useState} from "react";
import GetPhoneNumbersApi from "../../../API/GetPhoneNumbersApi";
import {DispatchCriteriaContext, FiltersCriteriaContext} from "../../../contexts/PhoneBookContext";
import UsePaginationNavigationLink from "../../../parts/UsePaginationNavigationLink";
import useToggle from "../../../hooks/useToggle";

const styles = {
    phoneNumberTable: {
        margin: "1.5em 5em",
        justifySelf: "center",
        alignSelf: "center",
        display: "grid",
        borderRadius: "2em",
        boxShadow: "6px 7px 7px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.35)",
        overflow: "hidden"
    },
    phoneNumberTableHeader: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        backgroundColor: "#1976d2",
        border: "1px solid #c0c0c0",
        font: "1.1em Arial",
        color: "white",
        borderRadius: "2em 2em 0em 0em",
        overflow: "hidden",
        padding: "1.5em"
    },
    phoneNumberTableRaw: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        backgroundColor: "rgb(255 249 249)",
        border: "1px solid rgb(231 220 220)",
        font: "bold 1em Arial",
        padding: "1.5em",
        overflow: "hidden"
    },
    paginationArea: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        backgroundColor: "#1976d2",
        border: "1px solid #c0c0c0",
        font: "1.1em Arial",
        color: "white",
        borderRadius: "0em 0em 2em 2em",
        overflow: "hidden",
        padding: "1.5em",
        alignSelf: "stretch",
        justifySelf: "stretch",
        justifyItems: "center",
        alignItems: "center"
    }
}

const createFilterQueryParams = (appliedFilters) => {
    const queryParameters = {};

    if (appliedFilters.paginationCriteria.page !== undefined) {
        queryParameters["page"] = appliedFilters.paginationCriteria.page;
    }
    if (appliedFilters.paginationCriteria.size !== undefined) {
        queryParameters["size"] = appliedFilters.paginationCriteria.size;
    }
    if (appliedFilters.phoneNumbersCriteria.length > 0) {
        queryParameters["phoneNumbersFilterCriteria"] = JSON.stringify(appliedFilters
            .phoneNumbersCriteria.map(filter => {
                return {
                    countryName: filter.countryName,
                    countryCode: filter.countryCode,
                    stateName: filter.stateName,
                    stateCode: filter.stateCode
                }
            }));
    }
    return queryParameters;
}
const isNavLinkDisabled = (link, fetchedPagination) => {
    switch (link) {
        case "FIRST":
        case "PREV":
            return (fetchedPagination.firstPage === undefined || fetchedPagination.currentPage === undefined ||
                fetchedPagination.firstPage === fetchedPagination.currentPage);
        case "NEXT":
        case "LAST":
            return (fetchedPagination.lastPage === undefined || fetchedPagination.currentPage === undefined ||
                fetchedPagination.lastPage === fetchedPagination.currentPage);
        default:
            return true;
    }
}

function getPhoneNumbersTableBody(fetchedPhoneNumbersState, isLoadingPhoneNumbers) {

    if (isLoadingPhoneNumbers) {
        console.log("inside is loading part");
        console.log(isLoadingPhoneNumbers);
        return <tr style={{display:"flex", margin: "2% 45%"}}>
            <td>
                <div id="loading"></div>
            </td>
        </tr>
    } else if (fetchedPhoneNumbersState.length === 0) {
        console.log("inside is no data found part");
        console.log(fetchedPhoneNumbersState);
        return <tr style={{ display: 'flex' }}>
            <td colSpan={4} style={{ flex: 1 }}>
                <img src="/no-results.jpeg" alt="image" />
                <h3> No results found </h3>
            </td>
        </tr>
    } else {
        console.log("inside is loaded data found part");
        console.log(fetchedPhoneNumbersState);
        return fetchedPhoneNumbersState.map(phoneNumber => {
            return (
                <tr key={phoneNumber.uuid} style={styles.phoneNumberTableRaw}>
                    <td>{phoneNumber.country}</td>
                    <td>{phoneNumber.countryCode}</td>
                    <td>{phoneNumber.state}</td>
                    <td>{phoneNumber.phone}</td>
                </tr>
            )
        })
    }
}

const PhoneNumbers = () => {
    const [isLoadingPhoneNumbers, toggleLoadingPhoneNumbers] = useToggle(false);
    const appliedFilters = useContext(FiltersCriteriaContext);
    const dispatchContextAction = useContext(DispatchCriteriaContext);
    const [fetchedPhoneNumbersState, setFetchedPhoneNumbersState] = useState([]);
    const [fetchedPaginationState, setFetchedPaginationState] = useState([]);

    const navigationAction = (paginationPayload) => {
        dispatchContextAction({
            type: "SET_PAGINATION_CRITERIA",
            payload: paginationPayload
        })
    }

    useEffect(() => {
        async function fetch() {
            const {phoneNumbers, paginationLinks} = await GetPhoneNumbersApi(createFilterQueryParams(appliedFilters));
            setFetchedPhoneNumbersState(phoneNumbers);
            setFetchedPaginationState(paginationLinks);
        }
        fetch();
    }, [appliedFilters]);

    useEffect( () => {
        toggleLoadingPhoneNumbers();
    }, [appliedFilters, fetchedPhoneNumbersState])

    return (
        <table key="phone-numbers-table" style={styles.phoneNumberTable}>
            <thead>
            <tr style={styles.phoneNumberTableHeader}>
                <th>Country</th>
                <th>Country code</th>
                <th>State</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
            {
                getPhoneNumbersTableBody(fetchedPhoneNumbersState, isLoadingPhoneNumbers)
            }
            </tbody>
            <tfoot>
            <tr style={styles.paginationArea}>
                <td><UsePaginationNavigationLink
                    id="first-page-id"
                    link="FIRST"
                    isDisabled={isNavLinkDisabled("FIRST", fetchedPaginationState)}
                    paginationLink={{page: fetchedPaginationState.firstPage, size: fetchedPaginationState.size}}
                    click={navigationAction}/>
                </td>
                <td><UsePaginationNavigationLink
                    id="prev-page-id"
                    link="PREV"
                    isDisabled={isNavLinkDisabled("PREV", fetchedPaginationState)}
                    paginationLink={{page: fetchedPaginationState.currentPage - 1, size: fetchedPaginationState.size}}
                    click={navigationAction}/>
                </td>
                <td><UsePaginationNavigationLink
                    id="next-page-id"
                    link="NEXT"
                    isDisabled={isNavLinkDisabled("NEXT", fetchedPaginationState)}
                    paginationLink={{page: fetchedPaginationState.currentPage + 1, size: fetchedPaginationState.size}}
                    click={navigationAction}/>
                </td>
                <td><UsePaginationNavigationLink
                    id="last-page-id"
                    link="LAST"
                    isDisabled={isNavLinkDisabled("LAST", fetchedPaginationState)}
                    paginationLink={{page: fetchedPaginationState.lastPage, size: fetchedPaginationState.size}}
                    click={navigationAction}/>
                </td>
            </tr>
            </tfoot>
        </table>
    )
}
export default PhoneNumbers;