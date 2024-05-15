import React, { useState } from 'react';
import axios from 'axios';

const AddCourseDetail = () => {
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    duration: '',
    fees: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addcoursedetail`, formData);
      if (response.data === 'no') {
        alert('Course already exists!');
      } else {
        console.log('Course detail added successfully:', response.data);
        window.location.reload(); // Consider using a better way to handle success, like updating state
      }
    } catch (error) {
      console.error('Error adding course detail:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-start mt-5">
      <div className="card p-4" style={{ width: '500px' }}>
        <h2 className="text-center mb-4">Add Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Course ID" name="courseId" value={formData.courseId} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Course Name" name="courseName" value={formData.courseName} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Duration" name="duration" value={formData.duration} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Fees" name="fees" value={formData.fees} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseDetail;
