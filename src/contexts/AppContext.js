import {createContext} from "react";
import useToggle from "../hooks/useToggle";

export const MainFilterConsoleStatusContext = createContext(undefined);
export const ToggleMainFilterConsoleStatusContext = createContext(undefined);

export const AppContextProvider = (props) => {
    const [isMainFilterConsole, toggleMainFilterConsole] = useToggle();
    return (
        <MainFilterConsoleStatusContext.Provider value={isMainFilterConsole}>
            <ToggleMainFilterConsoleStatusContext.Provider value={toggleMainFilterConsole}>
                {props.children}
            </ToggleMainFilterConsoleStatusContext.Provider>
        </MainFilterConsoleStatusContext.Provider>
    );
}

