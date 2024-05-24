import React, { useState } from 'react';
import axios from 'axios';

interface ResponseObject {
    place: string;
    placeDescription: string;
}

const TravelScreen: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [response, setResponse] = useState<ResponseObject[]>([]);

    const handleSubmit = async () => {
        try {
            const result = await axios.get<ResponseObject[]>(`http://localhost:8080/api/getPlacesForCity/${city}`);
            setResponse(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div style={{ background: 'url(/path/to/travel-background.jpg) no-repeat center center fixed', backgroundSize: 'cover', height: '100vh', padding: '20px' }}>
            <h1>Travel</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleSubmit}>Submit</button>
            <div>
                {response.map((item, index) => (
                    <p key={index}>{item.place} - {item.placeDescription}</p>
                ))}
            </div>
        </div>
    );
};

export default TravelScreen;
