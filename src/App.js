import './App.css';
import PhoneBook from "./pages/PhoneBookPage/PhoneBook";
import AppHeader from "./pages/MainPage/Components/AppHeader";
import {AppContextProvider} from "./contexts/AppContext";

function App() {
  return (
    <div className="App">
        <AppContextProvider>
            <AppHeader/>
            <PhoneBook/>
            <div className="footer">
            </div>
        </AppContextProvider>
    </div>
  );
}

export default App;
