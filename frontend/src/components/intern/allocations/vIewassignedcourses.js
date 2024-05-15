import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CourseList() {
  const navigate = useNavigate();
  const [rep, setRep] = useState('');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleEditClick = (data) => {
      navigate(`/intern/InternReportPage/${data}`);
      // console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/viewmyallocatedcourses`, {params: {log_id: localStorage.getItem('log_id')}});
        setCourses(response.data.data);
        setRep(response.data.rep);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Course List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Course Name</th>
            {/*<th>Mentor Assigned</th>*/}
            <th>Progress</th>
            <th>Duration</th>
            <th>Fees</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{course.course_id.course_name}</td>
              {/*<td>{course.Mentor_Assigned}</td>*/}
              <td style={{ backgroundColor: course.course_id._id == rep.course_id ? "#66FF66" : "#ff0000" }}>
                {rep !== "" && course.course_id._id == rep.course_id ?
                          <td><a className="edit-button" href={process.env.REACT_APP_BACKEND_URL+ '/'+rep.generated_report} target="_blank">View Report</a></td>
                        // <td><button className="edit-button" onClick={()=>handleEditClick(course.course_id._id)}>View Report</button></td>
                    : 'Not generated'}
              </td>
              <td>{course.course_id.duration}</td>
              <td>{course.course_id.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;
