
import React, { useEffect, useState } from 'react';
import './Weather.scss'
import axios from 'axios';
import { MdMyLocation } from 'react-icons/md';
import { BiSearchAlt } from 'react-icons/bi';
import { IconContext } from "react-icons";
import { FaWater } from "react-icons/fa";
import LoadingIcons from 'react-loading-icons'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FiWind } from "react-icons/fi";
const Weather = (props) => {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('');
  const [state, setState] = useState(props.data);
  const [classN, setClassN] = useState('weather')
  const [theme, setTheme] = useState('light');
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    if (theme === 'light')
      setTheme('dark')
    else if (theme === 'dark')
      setTheme('light')
  };
  useEffect(() => {
    document.body.className = theme
  }, [theme])
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
        <>
          <div className={`weather ${theme}`}>
            <div className='card'>
              <div className="sec0">
                <div className='search-bar'>
                  <div className='form'>
                    <input type='text' value={getState}
                      onChange={inputHandler}
                      placeholder="Search..."
                      onKeyDown={handleKeyDown}

                    />
                    <button type='submit' onClick={getState ? submitHandler : ''}>
                      <BiSearchAlt color={theme === 'light' ? 'black' : 'white'} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="sec1">
                <div className='location'>
                  <MdMyLocation color={theme === 'light' ? 'black' : 'white'} />
                  <p>{apiData.name}</p>
                </div>
                {/* <div className="search">
              <BiSearchAlt />
            </div> */}
              </div>
              <div className="sec2">
                {/* <img src='assets/Sunny.svg' alt='' /> */}
                <img src={`http://openweathermap.org/img/wn/${apiData.main ? apiData.weather[0].icon : null}@2x.png`} alt='' />
              </div>
              <div className="sec3">
                <div className='temp'>{kelvinToFarenheit(apiData.main.temp)} °C</div>
                <div className="desc">{apiData.weather[0].description}</div>
              </div>
              <div className="sec4">
                <div className="humidity">
                  <FaWater color={theme === 'light' ? 'black' : 'white'} />
                  <p>{apiData.main.humidity}%</p>
                </div>
                <div className="wind">
                  <FiWind color={theme === 'light' ? 'black' : 'white'} />
                  <p>{apiData.wind.speed} Km/h</p>
                </div>
              </div>
            </div>
          </div>
          <DarkModeSwitch
            style={{ marginBottom: '2rem', marginLeft: '1em' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={50}
            sunColor={'yellow'}
            moonColor={'black'}
          />
        </>
      ) : (<div className='load'>
        <div>
          <LoadingIcons.BallTriangle />
        </div>
      </div>)}
    </IconContext.Provider >
  )
}

export default Weather