import React, { useState } from "react";
import axios from "axios";

function Gpt() {
    const [city, setCity] = useState("Delhi");
    const [itinerary, setItinerary] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(
                `https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=5ae2e3f221c38a28845f05b6485712f74027c5381a0533847a37964d`
            );
            console.log(response)
            const cityId = response.data.name;
            const itineraryResponse = await axios.get(
                `https://api.opentripmap.com/0.1/en/places/xid/${cityId}/tours?apikey=5ae2e3f221c38a28845f05b6485712f74027c5381a0533847a37964d`
            );
            setItinerary(JSON.stringify(itineraryResponse.data));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a city:
                    <input
                        type="text"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                </label>
                <button type="submit">Get travel itinerary</button>
            </form>
            <div>{itinerary}</div>
        </div>
    );
}

export default Gpt;
