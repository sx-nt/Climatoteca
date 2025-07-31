import './App.css';
import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';
import DayInfo from './components/DayInfo';
import DayGraph from './components/DayGraph';
import WeekInfo from './components/WeekInfo';
import WeatherInfo from './components/WheatherInfo';
import { LocationProvider } from './contexts/LocationContext';
import { WeatherProvider } from './contexts/WeatherContext';

function App() {
  return (
    <LocationProvider>
      <WeatherProvider>
        
        <Searchbar />
        <DayInfo />
        <DayGraph />
        <WeekInfo />
        <WeatherInfo />
        <Sidebar />

      </WeatherProvider>
    </LocationProvider>
  );
}

export default App;
