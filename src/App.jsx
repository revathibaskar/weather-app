import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CitiesTable from './component/CitiesTable';
import CityWeather from './component/CityWeather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CitiesTable />} />
        <Route path="/weather/:cityName" element={<CityWeather />} />
      </Routes>
    </Router>
  );
}

export default App;
