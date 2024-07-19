import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GymList.css'; // Importing CSS file

const GymList = () => {
    const [gyms, setGyms] = useState([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('');

    useEffect(() => {
        fetchGyms();
    }, []);

    const fetchGyms = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gyms/');
            setGyms(response.data);
        } catch (error) {
            console.error("There was an error fetching the gyms!", error);
        }
    };

    const addGym = async () => {
        try {
            const response = await axios.post('http://localhost:8000/gyms/', { name, location, rating });
            setGyms([...gyms, response.data]);
            setName('');
            setLocation('');
            setRating('');
        } catch (error) {
            console.error("There was an error adding the gym!", error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Gyms</h1>
            </div>
            <div className="gym-list">
                <table className="gym-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gyms.map(gym => (
                            <tr key={gym.id}>
                                <td><Link to={`/gym/${gym.id}`}>{gym.name}</Link></td>
                                <td>{gym.location}</td>
                                <td>{gym.rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="add-gym">
                <h2>Add Gym</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button onClick={addGym}>Add Gym</button>
            </div>
        </div>
    );
};

export default GymList;
