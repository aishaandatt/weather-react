import './App.scss';
import Weather from './Component/Weather';
import Geoloc from './Component/Geo/Geoloc';
function App() {
  return (
    <div className='app'>
      {/* <Weather /> */}
      <Geoloc />
    </div>
  );
}

export default App;
