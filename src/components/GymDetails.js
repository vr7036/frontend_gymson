import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './GymDetails.css'; // Importing CSS file

const GymDetails = () => {
    const { id } = useParams();
    const [gym, setGym] = useState(null);
    const [rating, setRating] = useState('');

    const fetchGymDetails = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8000/gyms/${id}/`);
            setGym(response.data);
            setRating(response.data.rating);
        } catch (error) {
            console.error("There was an error fetching the gym details!", error);
        }
    }, [id]);

    useEffect(() => {
        fetchGymDetails();
    }, [fetchGymDetails]);

    const updateRating = async () => {
        try {
            await axios.patch(`http://localhost:8000/gyms/${id}/`, { rating });
            fetchGymDetails();
        } catch (error) {
            console.error("There was an error updating the rating!", error);
        }
    };

    if (!gym) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="header">
                <h1>{gym.name}</h1>
            </div>
            <div className="details">
                <p>Location: {gym.location}</p>
                <p>Rating: {gym.rating}</p>
            </div>
            <div className="update-rating">
                <h2>Update Rating</h2>
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button onClick={updateRating}>Update Rating</button>
            </div>
            <Link to="/" className="back-button">Back to Gym List</Link>
        </div>
    );
};

export default GymDetails;
