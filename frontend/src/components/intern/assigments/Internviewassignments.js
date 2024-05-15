import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AssignmentList() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleEditClick = (data) => {
      navigate(`/intern/InternAssignmentDetails/${data}`);
      // console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/intern_viewassigned_works`, {params: {log_id: localStorage.getItem('log_id')}});
        setAssignments(response.data.data);
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
      <h2>Assignment List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Assigned Date</th>
            <th>Assignment Title</th>
            <th>Description</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{assignment.work_id.assign_date}</td>
              <td><button className="edit-button" onClick={()=>handleEditClick(assignment._id)}>{assignment.work_id.workk_name}</button></td>
              {/*<td><a href={`/assignmentdetails/${assignment._id}`}>{assignment.work_id.workk_name}</a></td>*/}
              <td>{assignment.work_id.work}</td>
              <td>{assignment.work_id.submission_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentList;
