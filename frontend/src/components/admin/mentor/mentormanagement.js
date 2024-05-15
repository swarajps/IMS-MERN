// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const MentorManagement = () => {
//     const navigate = useNavigate();
//     const [mentors, setMentors] = useState([]);
//     const [search, setSearch] = useState('');
//     const handleEditClick = (data) => {
//         navigate(`/editmentor/${encodeURIComponent(JSON.stringify(data))}`, );
//     };

//     const handleDeleteClick = async (id) => {
//         try {
//             const confirmed = window.confirm("Are you sure you want to delete this course?");
//             if (confirmed) {
//                 await axios.get(process.env.REACT_APP_BACKEND_URL + '/delete_mentor/' + id);
//                 window.location.reload();
//             }
//         } catch (error) {
//         }
//     };

//     useEffect(() => {

//         const fetchMentors = async () => {
//             try {
//                 if (search !== '') {
//                     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_mentors`, {params: {search}});
//                     setMentors(response.data.data);
//                 } else {
//                     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_mentors`);
//                     setMentors(response.data.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching mentors:', error);
//             }
//         };

//         fetchMentors();

//     }, [search]);

//     return (
//         <div className="container mt-4">
//             <form onSubmit={(e) => e.preventDefault()} method="post">
//                 <div className="mb-3 d-flex align-items-center">
//                     <input type="text" value={search} onChange={(e) => {
//                         setSearch(e.target.value);
//                     }} className="form-control me-2" placeholder="Search"/>
//                 </div>
//             </form>
//             <table className="table">
//                 <thead>
//                 <tr>
//                     <th>S.No</th>
//                     <th>Employee&nbsp;Code</th>
//                     <th>Name</th>
//                     <th>DoB</th>
//                     <th>Gender</th>
//                     <th>State</th>
//                     <th>City</th>
//                     <th>PIN</th>
//                     <th>Phone No</th>
//                     <th>Email</th>
//                     <th>Qualification</th>
//                     <th>Join&nbsp;Date</th>
//                     <th>Edit</th>
//                     <th>Delete</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {mentors.map((mentor, index) => (
//                     <tr key={index}>
//                         <td>&nbsp;{index + 1}</td>
//                         <td>&nbsp;{mentor.Employee_code}</td>
//                         <td className="img-column">&nbsp;{mentor.Name}<br /><img
//                             src={process.env.REACT_APP_BACKEND_URL + mentor.photo} alt="Mentor" height="100px"/></td>
//                         <td>&nbsp;{mentor.Dob}</td>
//                         <td>&nbsp;{mentor.Gender}</td>
//                         <td>&nbsp;{mentor.State}</td>
//                         <td>&nbsp;{mentor.City}</td>
//                         <td>&nbsp;{mentor.PIN}</td>
//                         <td>&nbsp;{mentor.Phone}</td>
//                         <td>&nbsp;{mentor.Email}</td>
//                         <td>&nbsp;{mentor.Qualifications}</td>
//                         <td>&nbsp;{mentor.join_date}</td>
//                         <td className="btn-column"><button className="edit-button" onClick={() => handleEditClick(mentor)}>Edit</button></td>
//                         <td className="btn-column"><button className="delete-button" onClick={() => handleDeleteClick(mentor.Mentor_id)}>Delete</button></td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default MentorManagement;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MentorManagement = () => {
    const navigate = useNavigate();
    const [mentors, setMentors] = useState([]);
    const [search, setSearch] = useState('');
    const handleEditClick = (data) => {
        navigate(`/admin/editmentor/${encodeURIComponent(JSON.stringify(data))}`, );
    };

    const handleDeleteClick = async (id) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this course?");
            if (confirmed) {
                await axios.get(process.env.REACT_APP_BACKEND_URL + '/delete_mentor' , {params: {mid: id}});
                window.location.reload();
            }
        } catch (error) {
        }
    };

    useEffect(() => {

        const fetchMentors = async () => {
            try {
                if (search !== '') {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_mentors`, {params: {search}});
                    setMentors(response.data.data);
                } else {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_mentors`);
                    setMentors(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        };

        fetchMentors();

    }, [search]);

    return (
        <div className="container mt-4">
            <form onSubmit={(e) => e.preventDefault()} method="post">
                <div className="mb-3 d-flex align-items-center">
                    <input type="text" value={search} onChange={(e) => {
                        setSearch(e.target.value);
                    }} className="form-control me-2" placeholder="Search"/>
                </div>
            </form>
            <table className="table">
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Employee&nbsp;Code</th>
                    <th>Name</th>
                    <th>DoB</th>
                    <th>Gender</th>
                    <th>State</th>
                    <th>City</th>
                    <th>PIN</th>
                    <th>Phone No</th>
                    <th>Email</th>
                    <th>Qualification</th>
                    <th>Join&nbsp;Date</th>
                    <th>Edit</th>
                    {/* <th>Delete</th> */}
                </tr>
                </thead>
                <tbody>
                {mentors.map((mentor, index) => (
                    <tr key={index}>
                        <td>&nbsp;{index + 1}</td>
                        <td>&nbsp;{mentor.Employee_code}</td>
                        <td className="img-column">&nbsp;{mentor.Name}<br /><img
                            src={process.env.REACT_APP_BACKEND_URL + mentor.photo} alt="Mentor" height="100px"/></td>
                        <td>&nbsp;{mentor.Dob}</td>
                        <td>&nbsp;{mentor.Gender}</td>
                        <td>&nbsp;{mentor.State}</td>
                        <td>&nbsp;{mentor.City}</td>
                        <td>&nbsp;{mentor.PIN}</td>
                        <td>&nbsp;{mentor.Phone}</td>
                        <td>&nbsp;{mentor.Email}</td>
                        <td>&nbsp;{mentor.Qualifications}</td>
                        <td>&nbsp;{mentor.join_date}</td>
                        <td className="btn-column"><button className="edit-button" onClick={() => handleEditClick(mentor)}>Edit</button></td>
                        <td className="btn-column"><button className="delete-button" onClick={() => handleDeleteClick(mentor.Mentor_id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MentorManagement;