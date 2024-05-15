import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/ViewCourse.css';

function ViewCourseAllocation() {
    const [allocations, setAllocations] = useState([]);

    const handleDeleteClick = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this allocation?");
            if (confirmed) {
                await axios.get(process.env.REACT_APP_BACKEND_URL + '/delete_course_allocation/' + id);
                window.location.reload();
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        const fetchAllocations = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/ViewCourseAllocation');
                console.log(response.data.data);
                setAllocations(response.data.data);
            } catch (error) {
                console.error('Error fetching allocation data:', error);
            }
        };

        fetchAllocations();
    }, []);

    return (
        <div className="view-course-container">
            <h2>View Allocations</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Course</th>
                    <th>Intern</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {allocations.map((allocation, index) => (
                    <tr key={allocation._id}>
                        <td>{index + 1}</td>
                        <td>{allocation.course_id.course_name}</td>
                        <td>{allocation.intern_id.Name}</td>
                        <td>
                            <button className="delete-button" onClick={() => handleDeleteClick(allocation._id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewCourseAllocation;
