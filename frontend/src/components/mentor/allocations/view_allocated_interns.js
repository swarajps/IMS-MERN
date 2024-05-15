import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/ViewCourse.css';
import { useNavigate } from 'react-router-dom';
import { NavbarText } from 'react-bootstrap';

function ViewAllocatedInterns() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const handleEditClick = (data) => {
        navigate(`/mentor/ReportPage/${data}`);
        // console.log(data);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const lid = localStorage.getItem('log_id');
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/viewmyallocatedinterns', { params: { "log_id": lid } });
                setCourses(response.data.data);

            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="view-course-container">
            <h2>View Allocated Interns</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Intern Name</th>
                    {/*<th>Action</th>*/}
                </tr>
                </thead>
                <tbody>
                {courses.map((course, index) => (
                    <tr key={course._id}>
                        <td>{index + 1}</td>
                        <td><img src={process.env.REACT_APP_BACKEND_URL + course.intern_id.Photo} height="150px"/><br/><p className={NavbarText}>{course.intern_id.Name}</p></td>
                        {/*<td><a href={()=>handleEditClick(course.intern_id._id)}>Generate Report</a></td>*/}
                        <td><button className="edit-button" onClick={()=>handleEditClick(course.intern_id._id)}>Generate Report</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllocatedInterns;
