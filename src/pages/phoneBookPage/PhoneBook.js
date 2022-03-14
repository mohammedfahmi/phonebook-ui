import {PhoneBookProvider} from "../../contexts/PhoneBookContext";
import {FilterConsoleProvider} from "../../contexts/FilterConsoleContext";
import FilterConsole from "./components/filterConsole/FilterConsole";
import AppliedFilters from "./components/appliedFilters/AppliedFilters";
import PhoneNumbers from "./components/phoneNumbers/PhoneNumbers";


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