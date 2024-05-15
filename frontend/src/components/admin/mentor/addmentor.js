import React, { useState } from 'react';
import axios from 'axios';

const AddMentor = () => {
  const [file, setFile] = useState(null);
  const [formFields, setFormFields] = useState({
    employeeCode: '',
    name: '',
    dob: '',
    gender: 'Male',
    state: '',
    city: '',
    pin: '',
    phoneNo: '',
    joinDate: '',
    email: '',
    qualification: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fileField', file);
    for (const key in formFields) {
      formData.append(key, formFields[key]);
    }

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/addment`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data === 'ok') {
        alert('Mentor added successfully:', response.data);
        window.location.replace('/admin/MentorManagement');
      }
    } catch (error) {
      console.error('Error adding mentor:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add Mentor</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="fileField" className="form-label">Photo</label>
          <input type="file" className="form-control" id="fileField" name="fileField" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="employeeCode" name="employeeCode" value={formFields.employeeCode} onChange={handleInputChange} placeholder="Employee Code" required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="name" name="name" value={formFields.name} onChange={handleInputChange} placeholder="Name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">DOB</label>
          <input type="date" className="form-control" id="dob" name="dob" value={formFields.dob} onChange={handleInputChange} placeholder="DoB" required />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input className="form-check-input" type="radio" id="male" name="gender" value="Male" checked={formFields.gender === 'Male'} onChange={handleInputChange} />
            <label className="form-check-label" htmlFor="male">Male</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" id="female" name="gender" value="Female" checked={formFields.gender === 'Female'} onChange={handleInputChange} />
            <label className="form-check-label" htmlFor="female">Female</label>
          </div>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="state" name="state" value={formFields.state} onChange={handleInputChange} placeholder="State" required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="city" name="city" value={formFields.city} onChange={handleInputChange} placeholder="City" required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="pin" name="pin" value={formFields.pin} onChange={handleInputChange} placeholder="Pin" required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="phoneNo" name="phoneNo" value={formFields.phoneNo} onChange={handleInputChange} placeholder="Phone No" required />
        </div>
        <div className="mb-3">
          <label htmlFor="joinDate" className="form-label">Join Date</label>
          <input type="date" className="form-control" id="joinDate" name="joinDate" value={formFields.joinDate} onChange={handleInputChange} placeholder="Join Date" required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="email" name="email" value={formFields.email} onChange={handleInputChange} placeholder="Email" required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="qualification" name="qualification" value={formFields.qualification} onChange={handleInputChange} placeholder="Qualification" required />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default AddMentor;
