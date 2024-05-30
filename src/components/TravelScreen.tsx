import React, { useState } from 'react';
import axios from 'axios';

interface ResponseObject {
    key: string;
    value: string;
}

const TravelScreen: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [response, setResponse] = useState<ResponseObject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setLoading(true); // Show loader
        try {
            const result = await axios.get<ResponseObject[]>(`http://localhost:8080/api/city/${city}`);
            setResponse(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Hide loader
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
            {loading && <div className="loader">Loading...</div>}
            <div>
                {response.map((item, index) => (
                    <p key={index}>{item.key} - {item.value}</p>
                ))}
            </div>
        </div>
    );
};

export default TravelScreen;
