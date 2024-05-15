// AllocateMentor.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file


const AllocateMentor = () => {
    const [mentors, setMentors] = useState([]);
    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_mentors`);
                setMentors(response.data.data);
            } catch (error) {
                console.error('Error fetching mentor data:', error);
            }
        };

        fetchMentors();
    }, []);

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_interns`);
                setInterns(response.data.data);
            } catch (error) {
                console.error('Error fetching intern data:', error);
            }
        };

        fetchInterns();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const allocationData = {};
        formData.forEach((value, key) => {
            allocationData[key] = value;
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/allocatementor`, allocationData);
            if (response.data === 'ok') {
                alert('Allocation successful');
                window.location.reload();
                console.log('Allocation successful:', response.data);
            } else {
                alert('Intern allocation already exists');
            }
        } catch (error) {
            console.error('Error allocating:', error);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-10">
                <div className="col-md-6">
                    <div className="card mx-auto"> {/* Added mx-auto class */}
                        <h2 className="card-title">Allocate Mentor</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="select1" className="form-label">Mentor:</label>
                                <select className="form-select" required name="select1" id="select1">
                                    <option defaultValue="" value="">Select</option>
                                    {mentors.map(mentor => (
                                        <option key={mentor._id} value={mentor._id}>{mentor.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="select2" className="form-label">Intern:</label>
                                <select className="form-select" required name="select2" id="select2">
                                    <option defaultValue="" value="">Select</option>
                                    {interns.map(intern => (
                                        <option key={intern._id} value={intern._id}>{intern.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Assign</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllocateMentor;
