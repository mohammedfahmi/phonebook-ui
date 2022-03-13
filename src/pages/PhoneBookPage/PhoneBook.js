import {PhoneBookProvider} from "../../contexts/PhoneBookContext";
import {FilterConsoleProvider} from "../../contexts/FilterConsoleContext";
import FilterConsole from "./components/FilterConsole";
import AppliedFilters from "./components/AppliedFilters";
import PhoneNumbers from "./components/PhoneNumbers";


const PhoneBook = () => {
    return (
        <PhoneBookProvider>
            <FilterConsoleProvider>
                <FilterConsole/>
            </FilterConsoleProvider>
            <AppliedFilters/>
            <PhoneNumbers/>
        </PhoneBookProvider>
    )
}

export default PhoneBook;