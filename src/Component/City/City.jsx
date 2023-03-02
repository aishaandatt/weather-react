import React, { useEffect } from 'react'
import Geoloc from '../Geo/Geoloc'
const City = () => {
    const [city, setCity] = useState('')
    const [getCity, setGetCity] = useState('')
    useEffect(() => {

        if (getCity) {
            setCity(getCity)
            console.log(getCity)
            setGetCity('')
        }
    })
    return (
        <div>City</div>
    )
}

export default City