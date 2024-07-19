import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GymList from './components/GymList';
import GymDetails from './components/GymDetails';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<GymList />} />
                <Route path="/gym/:id" element={<GymDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
