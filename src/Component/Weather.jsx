
import React, { useEffect, useState } from 'react';
import './Weather.scss'
import axios from 'axios';
import { MdMyLocation } from 'react-icons/md';
import { BiSearchAlt } from 'react-icons/bi';
import { IconContext } from "react-icons";
import { FaWater } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
const Weather = (props) => {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('');
  const [state, setState] = useState(props.data);
  const apiKey = '04917fbf4817750e09b47a725734c8ec'
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };
  const submitHandler = () => {
    setState(getState);
  };
  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setState(getState)
    }
  }

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
    console.log(apiData)
  }, [apiUrl, state]);
  return (
    <IconContext.Provider value={{ size: "3.4vh" }}>
      {apiData.main ? (

        <div className='weather'>
          <div className="card">
            <div className="sec0">
              <div className='search-bar'>
                <div className='form'>
                  <input type='text' value={getState}
                    onChange={inputHandler}
                    placeholder="Search..."
                    onKeyDown={handleKeyDown}
                  />
                  <button type='submit' onClick={submitHandler}>
                    <BiSearchAlt />
                  </button>
                </div>
              </div>
            </div>
            <div className="sec1">
              <div className='location'>
                <MdMyLocation />
                <p>{apiData.name}</p>
              </div>
              {/* <div className="search">
              <BiSearchAlt />
            </div> */}
            </div>
            <div className="sec2">
              <img src='assets/Sunny.svg' alt='' />
            </div>
            <div className="sec3">
              <div className='temp'>{kelvinToFarenheit(apiData.main.temp)}°C</div>
              <div className="desc">{apiData.weather[0].description}</div>
            </div>
            <div className="sec4">
              <div className="humidity">
                <FaWater />
                <p>{apiData.main.humidity}%</p>
              </div>
              <div className="wind">
                <FiWind />
                <p>{apiData.wind.speed} Km/h</p>
              </div>
            </div>
          </div>
        </div>
      ) : (<h1>Loading</h1>)}
    </IconContext.Provider >
  )
}

export default Weather