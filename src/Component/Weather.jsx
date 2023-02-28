
import React, { useEffect, useState } from 'react';
import './Weather.scss'
import axios from 'axios';
import { MdMyLocation } from 'react-icons/md';
import { BiSearchAlt } from 'react-icons/bi';
import { IconContext } from "react-icons";
import { FaWater } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
const Weather = () => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState('Sample City');
  const [cityP, setCityP] = useState('')
  const [desc, setDesc] = useState('Sample Description')
  const [humid, setHumid] = useState('00.00')
  const [wind, setWind] = useState('00.00')
  const [temper, setTemp] = useState('00.00')
  const apiKey = '04917fbf4817750e09b47a725734c8ec';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  const handleChange = (e) => {
    setCity(cityP)
  }
  const handleSubmit = event => {
    event.preventDefault();
    axios.get(apiUrl, {
      params: {
        q: city,
        units: 'metric',
        appid: apiKey,
      }
    })
      .then(response => {
        setWeather(response.data);
        setDesc(weather.weather[0].description)
        setTemp(weather.main.temp)
        setHumid(weather.main.humidity)
        setWind(weather.wind.speed)
        console.log(weather)
      })
      .catch(error => {
        // console.log(error);
      });
  };
  return (
    <IconContext.Provider value={{ size: "3.4vh" }}>
      <div className='weather'>
        <div className="card">
          <div className="sec0">
            <div className='search-bar'>
              <form onSubmit={handleSubmit}>
                <input type='text' value={cityP}
                  onChange={event => setCityP(event.target.value)}
                  placeholder="Search..."
                />
                <button type='submit' onClick={handleChange}>
                  <BiSearchAlt />
                </button>
              </form>
            </div>
          </div>
          <div className="sec1">
            <div className='location'>
              <MdMyLocation />
              <p>{city}</p>
            </div>
            {/* <div className="search">
              <BiSearchAlt />
            </div> */}
          </div>
          <div className="sec2">
            <img src='assets/Sunny.svg' alt='' />
          </div>
          <div className="sec3">
            <div className='temp'>{temper}°</div>
            <div className="desc">{desc}</div>
          </div>
          <div className="sec4">
            <div className="humidity">
              <FaWater />
              <p>{humid}%</p>
            </div>
            <div className="wind">
              <FiWind />
              <p>{wind} Km/h</p>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  )
}

export default Weather