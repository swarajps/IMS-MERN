import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function InternAssignmentDetails() {
  const {aid} = useParams();
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
    const [answer, setAnswer] = useState('');
    const [file, setFile] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL+'/intern_viewsubmitted_reports', {params: {log_id: localStorage.getItem('log_id'), aid: aid}});
        setAssignments(response.data.data);
        console.log(aid);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const log_id = localStorage.getItem('log_id');
    formData.append('aid', aid);
    formData.append('log_id', log_id);
    formData.append('fileField', file);
    formData.append('answer', answer);

    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL+'/assignmentsubmission', formData, {
          headers: {
              'Content-Type': 'mulipart/form-data'
          }
      });
      console.log(response.data);
      if(response.data === 'ok'){
          window.location.reload();
        }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <div className="container mt-5">
      <h1>Assignments</h1>
      <h2>View Assignment Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Assigned Date</th>
            <th>Assignment Title</th>
            <th>Description</th>
            <th>Submission Date</th>
            <th>File</th>
            <th>Score</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            assignment._id.toString() == aid.toString()?'':
            <tr key={index}>
              <td>{index + 1} </td>
              <td>{assignment.assign_date}</td>
              <td>{assignment.workk_name}</td>
              <td>{assignment.work}</td>
              <td>{assignment.submission_date}</td>
              <td><a href={process.env.REACT_APP_BACKEND_URL+assignment.attach_file} target="_blank">Download Attachment</a></td>
              <td>{assignment.evaluation_score}</td>
              <td>{assignment.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="assignment-details">
        <h3>Additional message</h3>
        <p>Answer</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="answer">Answer:</label>
          <textarea id="answer" required name="answer" onChange={(e)=> setAnswer(e.target.value)} rows="10" cols="50"></textarea><br />
          <label htmlFor="attachment">Attach File :</label>
          {/*<input required type="file" className="form-control-file" onChange={handleFileChange} id="fileField"/>*/}
          <input type="file" required id="attachment" className="form-control-file" onChange={handleFileChange} /><br />
          <button type="submit" className="mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default InternAssignmentDetails;
