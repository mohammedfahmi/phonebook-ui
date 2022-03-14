import React, {useContext, useEffect, useState} from "react";
import GetPhoneNumbersApi from "../../../../API/GetPhoneNumbersApi";
import {DispatchCriteriaContext, FiltersCriteriaContext} from "../../../../contexts/PhoneBookContext";
import UsePaginationNavigationLink from "../../../../lib/paginationLink/UsePaginationNavigationLink";
import './PhoneNumbers.css';
import noResult from './assets/no-results.jpeg';

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

function getPhoneNumbersTableBody(fetchedPhoneNumbersState, isLoading) {

    if (isLoading) {
        return <tr style={{display:"flex", margin: "2% 45%"}}>
            <td>
                <div id="loading"/>
            </td>
        </tr>
    } else if (fetchedPhoneNumbersState.length === 0) {
        return <tr style={{ display: 'flex' }}>
            <td colSpan={4} style={{ flex: 1 }}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img src={noResult} alt="image" />
                <h3> No results found </h3>
            </td>
        </tr>
    } else {
        return fetchedPhoneNumbersState.map(phoneNumber => {
            return (
                <tr key={phoneNumber.uuid} className="phoneNumberTable-row">
                    <td className="phoneNumberTable-data">{phoneNumber.country}</td>
                    <td className="phoneNumberTable-data">{phoneNumber.countryCode}</td>
                    <td className="phoneNumberTable-data">{phoneNumber.state}</td>
                    <td className="phoneNumberTable-data">{phoneNumber.phone}</td>
                </tr>
            )
        })
    }
}

function getPhoneNumberNavigationFooter(fetchedPaginationState, navigationAction) {
    return <tr className="phoneNumberTable-footer phoneNumberTable-row">
        <td className="nav-link"><UsePaginationNavigationLink
            id="first-page-id"
            link="FIRST"
            isDisabled={isNavLinkDisabled("FIRST", fetchedPaginationState)}
            paginationLink={{page: fetchedPaginationState.firstPage, size: fetchedPaginationState.size}}
            click={navigationAction}/>
        </td>
        <td className="nav-link"><UsePaginationNavigationLink
            id="prev-page-id"
            link="PREV"
            isDisabled={isNavLinkDisabled("PREV", fetchedPaginationState)}
            paginationLink={{page: fetchedPaginationState.currentPage - 1, size: fetchedPaginationState.size}}
            click={navigationAction}/>
        </td>
        <td className="current-page">{fetchedPaginationState.currentPage + 1}</td>
        <td className="nav-link"><UsePaginationNavigationLink
            id="next-page-id"
            link="NEXT"
            isDisabled={isNavLinkDisabled("NEXT", fetchedPaginationState)}
            paginationLink={{page: fetchedPaginationState.currentPage + 1, size: fetchedPaginationState.size}}
            click={navigationAction}/>
        </td>
        <td className="nav-link"><UsePaginationNavigationLink
            id="last-page-id"
            link="LAST"
            isDisabled={isNavLinkDisabled("LAST", fetchedPaginationState)}
            paginationLink={{page: fetchedPaginationState.lastPage, size: fetchedPaginationState.size}}
            click={navigationAction}/>
        </td>
    </tr>;
}

const PhoneNumbers = () => {
    const appliedFilters = useContext(FiltersCriteriaContext);
    const dispatchContextAction = useContext(DispatchCriteriaContext);
    const [fetchedPhoneNumbersState, setFetchedPhoneNumbersState] = useState([]);
    const [fetchedPaginationState, setFetchedPaginationState] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigationAction = (paginationPayload) => {
        dispatchContextAction({
            type: "SET_PAGINATION_CRITERIA",
            payload: paginationPayload
        })
    }

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            const {phoneNumbers, paginationLinks} = await GetPhoneNumbersApi(createFilterQueryParams(appliedFilters));
            setLoading(false);
            console.log()
            setFetchedPhoneNumbersState(phoneNumbers);
            setFetchedPaginationState(paginationLinks);
        }
        fetch();
    }, [appliedFilters]);

    return (
        <table key="phone-numbers-table" className="phoneNumberTable main-font-color">
            <thead>
            <tr className="phoneNumberTable-header phoneNumberTable-row app-complementary-color main-font-color">
                <th className="phoneNumberTable-header-data">Country</th>
                <th className="phoneNumberTable-header-data">Country code</th>
                <th className="phoneNumberTable-header-data">State</th>
                <th className="phoneNumberTable-header-data">Phone</th>
            </tr>
            </thead>
            <tbody>
            {
                getPhoneNumbersTableBody(fetchedPhoneNumbersState, isLoading)
            }
            </tbody>
            <tfoot>
            {
                getPhoneNumberNavigationFooter(fetchedPaginationState, navigationAction)
            }
            </tfoot>
        </table>
    )
}
export default PhoneNumbers;