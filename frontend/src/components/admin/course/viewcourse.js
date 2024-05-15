// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../../../styles/ViewCourse.css';
// import { useNavigate } from 'react-router-dom';

// function ViewCourse() {
//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);
//     const handleEditClick = (data) => {
//         navigate(`/editcor/${encodeURIComponent(JSON.stringify(data))}`);
//     };

//     const handleDeleteClick = async (id) => {
//         try {
//             const confirmed = window.confirm("Are you sure you want to delete this course?");
//             if (confirmed) {
//                 await axios.get(process.env.REACT_APP_BACKEND_URL + '/deletecourse/' + id);
//                 window.location.reload();
//             }
//         } catch (error) {
//         }
//     };

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/view_all_course');
//                 setCourses(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching course data:', error);
//             }
//         };

//         fetchCourses();
//     }, []);

//     return (
//         <div className="view-course-container">
//             <h2>View Courses</h2>
//             <table className="course-table">
//                 <thead>
//                 <tr>
//                     <th>S.No</th>
//                     <th>Course Name</th>
//                     <th>Duration</th>
//                     <th>Fees</th>
//                     <th>Edit</th>
//                     <th>Delete</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {courses.map((course, index) => (
//                     <tr key={course._id}>
//                         <td>{index + 1}</td>
//                         <td>{course.course_name}</td>
//                         <td>{course.duration}</td>
//                         <td>${course.fees}</td>
//                         <td>
//                             <button className="edit-button" onClick={() => handleEditClick(course)}>Edit</button>
//                         </td>
//                         <td>
//                             <button className="delete-button" onClick={() => handleDeleteClick(course._id)}>Delete
//                             </button>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ViewCourse;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/ViewCourse.css';
import { useNavigate } from 'react-router-dom';

function ViewCourse() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const handleEditClick = (data) => {
        navigate(`/admin/editcor/${encodeURIComponent(JSON.stringify(data))}`);
    };

    const handleDeleteClick = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this course?");
            if (confirmed) {
                await axios.get(process.env.REACT_APP_BACKEND_URL + '/deletecourse',{params: {cid: id}});
                window.location.reload();
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/view_all_course');
                setCourses(response.data.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="view-course-container">
            <h2>View Courses</h2>
            <table className="course-table">
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Course Name</th>
                    <th>Duration</th>
                    <th>Fees</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {courses.map((course, index) => (
                    <tr key={course._id}>
                        <td>{index + 1}</td>
                        <td>{course.course_name}</td>
                        <td>{course.duration}</td>
                        <td>${course.fees}</td>
                        <td>
                            <button className="edit-button" onClick={() => handleEditClick(course)}>Edit</button>
                        </td>
                        <td>
                            <button className="delete-button" onClick={() => handleDeleteClick(course._id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewCourse;