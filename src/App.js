import './App.scss';
import Weather from './Component/Weather';
import Geoloc from './Component/Geo/Geoloc';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Geoloc />}></Route>
      </Routes>
    </BrowserRouter>
    // <div className='app'>
    //   {/* <Weather /> */}
    //   <Geoloc />
    // </div>
  );
}

export default App;
