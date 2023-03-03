import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Weather from '../Weather'
import './Geoloc.scss'
const Geoloc = () => {
    // const [loc, setLoc] = useState(null)
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [city, setCity] = useState('')
    const [getCity, setGetCity] = useState('')
    const [flag, setFlag] = useState(true)
    const [flag2, setFlag2] = useState(true)
    const [ip, setIP] = useState('');
    const [disp, setDisp] = useState('')
    const apiKey = 'f056515d976a4e22bfe412b791ca04e9'
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
    const apiUrl2 = `https://apis.mapmyindia.com/advancedmaps/v1/111a93e1b2b99ec3a8ae35db42503402/rev_geocode?lat=${lat}&lng=${lon}`
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
        },
            function (error) {
                if (error.code == error.PERMISSION_DENIED) {
                    console.log("you denied me :-(");
                    setLat('28.7041')
                    setLon('77.1025')
                }
            }
        )
        if (lat > 0 && lon > 0 && flag) {
            console.log(lat, lon)
            // fetch(apiUrl2)
            //     .then((res) => res.json())
            //     .then((data) => setLoc(data))
            axios.get(apiUrl2)
                .then((res) => {
                    setGetCity(res.data.results[0].city)
                })
            console.log(getCity)
            setFlag(false)
        }
        if (getCity) {
            setCity(getCity)
            console.log(getCity)
            setGetCity('')
            setDisp(getCity ? <Weather data={getCity} /> : (<h2>Error</h2>))
        }
    }, [apiUrl, getCity])
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
    }
    useEffect(() => {
        getData()
    }, [ip])
    return (
        <>
            <h2>
                <span>
                    Your IP is : {ip}
                </span>
            </h2>
            {disp}
        </>
    )
}

export default Geoloc