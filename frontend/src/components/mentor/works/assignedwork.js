import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/ViewCourse.css';

function AssignedWorks() {
    const {wid} = useParams();
    const [allocations, setAllocations] = useState([]);

    const handleDeleteClick = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this allocation?");
            if (confirmed) {
                await axios.get(process.env.REACT_APP_BACKEND_URL + '/mentor_delete_assigned_works/' + id);
                window.location.reload();
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        const fetchAllocations = async () => {
            try {
                const lid = localStorage.getItem('log_id');
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/mentor_viewassigned_works', {params: {"wid":wid}});
                // const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/mentor_viewassigned_works', {params: {"log_id":lid}});
                // console.log(response.data.data);
                setAllocations(response.data.data);
            } catch (error) {
                console.error('Error fetching allocation data:', error);
            }
        };

        fetchAllocations();
    }, []);

    return (
        <div className="view-course-container">
            <h2>View Assigned Works</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Submission Date</th>
                    <th>Intern</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {allocations.map((allocation, index) => (
                    <tr key={allocation._id}>
                        <td>{index + 1}</td>
                        <td>{allocation.assign_date}</td>
                        <td>{allocation.work_id.submission_date}</td>
                        <td>{allocation.intern_id.Name}</td>
                        <td>
                            <button className="delete-button" onClick={() => handleDeleteClick(allocation._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default AssignedWorks;
