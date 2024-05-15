// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const InternManagement = () => {
//     const navigate = useNavigate();
//     const [interns, setInterns] = useState([]);
//     const [search, setSearch] = useState('');
//     const handleEditClick = (data) => {
//         navigate(`/editintern/${encodeURIComponent(JSON.stringify(data))}`);
//     };

//     const handleDeleteClick = async (id) => {
//         try {
//             const confirmed = window.confirm("Are you sure you want to delete this course?");
//             if (confirmed) {
//                 await axios.get(process.env.REACT_APP_BACKEND_URL + '/delete_intern/' + id);
//                 window.location.reload();
//             }
//         } catch (error) {
//         }
//     };

//     useEffect(() => {

//         const fetchInterns = async () => {
//             try {
//                 if (search !== '') {
//                     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_interns`, {params: {search}});
//                     setInterns(response.data.data);
//                 } else {
//                     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_interns`);
//                     setInterns(response.data.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching interns:', error);
//             }
//         };

//         fetchInterns();

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
//                 {interns.map((intern, index) => (
//                     <tr key={index}>
//                         <td>&nbsp;{index + 1}</td>
//                         <td className="img-column">&nbsp;{intern.Name}<br /><img
//                             src={process.env.REACT_APP_BACKEND_URL + intern.Photo} alt="Intern" height="150px" width="140px"/></td>
//                         <td>&nbsp;{intern.Dob}</td>
//                         <td>&nbsp;{intern.Gender}</td>
//                         <td>&nbsp;{intern.State}</td>
//                         <td>&nbsp;{intern.City}</td>
//                         <td>&nbsp;{intern.Pin}</td>
//                         <td>&nbsp;{intern.Phone}</td>
//                         <td>&nbsp;{intern.Email}</td>
//                         <td>&nbsp;{intern.Qualifications}</td>
//                         <td>&nbsp;{intern.Join_date}</td>
//                         <td className="btn-column"><button className="edit-button" onClick={() => handleEditClick(intern)}>Edit</button></td>
//                         <td className="btn-column"><button className="delete-button" onClick={() => handleDeleteClick(intern.Intern_id)}>Delete</button></td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default InternManagement;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InternManagement = () => {
    const navigate = useNavigate();
    const [interns, setInterns] = useState([]);
    const [search, setSearch] = useState('');
    const handleEditClick = (data) => {

        navigate(`/admin/editintern/${encodeURIComponent(JSON.stringify(data))}`);
    };

    const handleDeleteClick = async (id) => {
        // console.log(id, 'oikjuhgfd');
        try {
            const confirmed = window.confirm("Are you sure you want to delete this course?");
            if (confirmed) {
                await axios.get(process.env.REACT_APP_BACKEND_URL + '/delete_intern', {params: {mid: id}});
                alert('Deleted Successfully!');
                window.location.reload();
            }
        } catch (error) {
        }
    };

    useEffect(() => {

        const fetchInterns = async () => {
            try {
                if (search !== '') {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_interns`, {params: {search}});
                    setInterns(response.data.data);
                } else {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_interns`);
                    setInterns(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching interns:', error);
            }
        };

        fetchInterns();

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
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {interns.map((intern, index) => (
                    <tr key={index}>
                        <td>&nbsp;{index + 1}</td>
                        <td className="img-column">&nbsp;{intern.Name}<br /><img
                            src={process.env.REACT_APP_BACKEND_URL + intern.Photo} alt="Intern" height="150px" width="140px"/></td>
                        <td>&nbsp;{intern.Dob}</td>
                        <td>&nbsp;{intern.Gender}</td>
                        <td>&nbsp;{intern.State}</td>
                        <td>&nbsp;{intern.City}</td>
                        <td>&nbsp;{intern.Pin}</td>
                        <td>&nbsp;{intern.Phone}</td>
                        <td>&nbsp;{intern.Email}</td>
                        <td>&nbsp;{intern.Qualifications}</td>
                        <td>&nbsp;{intern.Join_date}</td>
                        <td className="btn-column"><button className="edit-button" onClick={() => handleEditClick(intern)}>Edit</button></td>
                        <td className="btn-column"><button className="delete-button" onClick={() => handleDeleteClick(intern.Inter_id)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InternManagement;