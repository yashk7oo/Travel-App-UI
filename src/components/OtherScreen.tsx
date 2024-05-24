import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


interface PlaceDetails {
    place: string;
    placeDescription: string;
}

const OtherScreen: React.FC = () => {
    const [cityInfoResponseList, setCityInfoResponseList] = useState<any[]>([]);
    const [removeCity, setRemoveCity] = useState<string>('');

    const getExistingInformation = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getDetailsForExistingCities');
            console.log(response.data);
            setCityInfoResponseList(response.data);
            console.log(cityInfoResponseList);
        } catch (error) {
            console.error('Error fetching existing information:', error);
        }
    };

    const handleRemove = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/deleteCity/${removeCity}`);
            alert('City removed successfully fromm db');
            setRemoveCity("");
            getExistingInformation();
        } catch (error) {
            alert('Error removing city');
            setRemoveCity("");
        }
    };

    return (
        <div>
            <h1>Other Screen</h1>
            <button onClick={getExistingInformation}>Get Existing Information</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                {cityInfoResponseList.map((cityInfo, cityIndex) => (
                     <div key={cityIndex} style={{marginBottom: '20px', padding: '10px', border: '1px solid #ccc'}}>
                         <h2>{cityInfo[Object.keys(cityInfo)[0]]}</h2>
                         {cityInfo[Object.keys(cityInfo)[1]].map((place: PlaceDetails, placeIndex: number) => (
                             <div key={placeIndex} style={{marginLeft: '20px'}}>
                                 <p><strong>{place.place}:</strong> {place.placeDescription}</p>
                             </div>
                        ))}
                     </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={removeCity}
                    onChange={(e) => setRemoveCity(e.target.value)}
                    placeholder="Enter city to remove"
                />
                <button onClick={handleRemove}>Remove</button>
            </div>
            </div>
        </div>
    );
};

export default OtherScreen;
