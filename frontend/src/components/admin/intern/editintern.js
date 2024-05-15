import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditIntern = () => {
    const { data } = useParams();
    const navigate = useNavigate();
    const internData = JSON.parse(decodeURIComponent(data));

    const [file, setFile] = useState(null);
    const [name, setName] = useState(internData.Name || '');
    const [dob, setDob] = useState(internData.Dob || '');
    const [gender, setGender] = useState(internData.Gender || '');
    const [state, setState] = useState(internData.State || '');
    const [city, setCity] = useState(internData.City || '');
    const [pin, setPin] = useState(internData.Pin || '');
    const [phoneNo, setPhoneNo] = useState(internData.Phone || '');
    const [email, setEmail] = useState(internData.Email || '');
    const [qualification, setQualification] = useState(internData.Qualifications || '');
    const [joinDate, setJoinDate] = useState(internData.Join_date || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
    const formData = new FormData();
    formData.append('id', internData._id);
    formData.append('fileField', file);
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('gender', gender);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('pin', pin);
    formData.append('phoneNo', phoneNo);
    formData.append('email', email);
    formData.append('qualification', qualification);
    formData.append('joinDate', joinDate);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/editintern`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            console.log('Intern updated successfully:', response.data);
            if (response.data === 'ok'){
                navigate('/admin/InternManagement', {replace: true});
            }
        } catch (error) {
            console.error('Error adding intern:', error);
        }
    };



    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="fileField" className="form-label">Photo</label>
                    <input type="file" className="form-control" id="fileField" name="fileField" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">DOB</label>
                    <input type="date" className="form-control" id="dob" name="dob" placeholder="DoB" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="radio" className="form-check-input" id="male" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
                    <label htmlFor="male" className="form-check-label">Male</label>
                    <input type="radio" className="form-check-input" id="female" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
                    <label htmlFor="female" className="form-check-label">Female</label>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="state" name="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="city" name="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="pin" name="pin" placeholder="Pin" value={pin} onChange={(e) => setPin(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="phoneNo" name="phoneNo" placeholder="Phone No" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="qualification" name="qualification" placeholder="Qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="joinDate" className="form-label">Join Date</label>
                    <input type="date" className="form-control" id="joinDate" name="joinDate" placeholder="Join Date" value={joinDate} onChange={(e) => setJoinDate(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default EditIntern;