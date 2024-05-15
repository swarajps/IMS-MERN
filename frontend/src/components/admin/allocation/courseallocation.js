import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllocateCourse = () => {
    const [courses, setCourses] = useState([]);
    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_course`);
                setCourses(response.data.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchInterns = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/view_all_interns`);
                setInterns(response.data.data);
            } catch (error) {
                console.error('Error fetching intern data:', error);
            }
        };

        fetchInterns();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const allocationData = {};
        formData.forEach((value, key) => {
            allocationData[key] = value;
        });

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/allocatecourse`, allocationData);
            if (response.data === 'ok') {
                alert('Allocation successful');
                window.location.reload();
                console.log('Allocation successful:', response.data);
            } else {
                alert('Allocation Already exists');
            }
        } catch (error) {
            console.error('Error allocating:', error);
        }
    };

    return (
        <div className="container">
            <style>
                {`
                    .container {
                        margin-top: 50px;
                    }

                    .card {
                        background-color: #fff;
                        border-radius: 12px;
                        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                    }

                    .card-title {
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                `}
            </style>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card mx-auto">
                        <h2 className="card-title">Allocate Course</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <label htmlFor="select1" className="col-sm-2 col-form-label">Course:</label>
                                <div className="col-sm-10">
                                    <select className="form-select" required name="select1" id="select1">
                                        <option defaultValue="" value="">Select</option>
                                        {courses.map(course => (
                                            <option key={course._id} value={course._id}>{course.course_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="select2" className="col-sm-2 col-form-label">Intern:</label>
                                <div className="col-sm-10">
                                    <select className="form-select" required name="select2" id="select2">
                                        <option defaultValue="" value="">Select</option>
                                        {interns.map(intern => (
                                            <option key={intern._id} value={intern._id}>{intern.Name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-sm-10 offset-sm-2">
                                    <button type="submit" className="btn btn-primary">Assign</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllocateCourse;
