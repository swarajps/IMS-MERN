import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const EditCourse = () => {
    const {data} = useParams();

    const courseDatas = JSON.parse(decodeURIComponent(data));

    const [courseName, setCourseName] = useState(courseDatas.course_name);
    const [duration, setDuration] = useState(courseDatas.duration);
    const [fees, setFees] = useState(courseDatas.fees);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!courseName || !duration || !fees) {
            alert("Please fill out all fields.");
            return;
        }
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            const cord = courseDatas._id;
            const response = await axios.post(`${backendUrl}/editcor`, {courseName, duration, fees, cord});
            console.log('Course detail updated successfully:', response.data);
            window.location.replace('/admin/ViewCourse');

        } catch (error) {
            console.error('Error adding course detail:', error);
        }


    };

    return (
        <div className="container">
          <h2>Edit Course</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="courseName">Course Name:</label>
            <input id="courseName" type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)}/>

            <label htmlFor="duration">Duration:</label>
            <input id="duration" type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/>

            <label htmlFor="fees">Fees:</label>
            <input id="fees" type="text" value={fees} onChange={(e) => setFees(e.target.value)}/>

            <button type="submit">Update</button>
          </form>
        </div>
    );
};

export default EditCourse;
