import './index.css'
import './App.css';
import PhoneBook from "./pages/phoneBookPage/PhoneBook";
import AppHeader from "./pages/header/components/AppHeader";
import {AppContextProvider} from "./contexts/AppContext";
import Theme from "./lib/theme/Theme";

function App() {
    return (
        <Theme>
            <div className="App app-neutral-color">
                <AppContextProvider>
                    <AppHeader/>
                    <PhoneBook/>
                    <div className="footer">
                    </div>
                </AppContextProvider>
            </div>
        </Theme>
    );
}

export default App;
