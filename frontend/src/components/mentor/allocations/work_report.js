import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReportPage() {
  const navigate = useNavigate();
  const { int_id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mnn, setMnn] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const log_id = localStorage.getItem('log_id');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/generatereport`, {
          params: { Int_id: int_id, log_id: log_id }
        });

        if (response.data === 'crs'){
          alert('No courses allocated yet');
          window.location.replace('/mentor/ViewAllocatedInterns');
        }
        if (response.data === 'ment'){
          alert('No Mentors allocated yet');
          window.location.replace('/mentor/ViewAllocatedInterns');
        }
        console.log(response.data.data_);
        if (response.data.data_.length == 0){
          alert('No Assignment report submitted allocated yet');
          window.location.replace('/mentor/ViewAllocatedInterns');
        }
        setData(response.data);
        setMnn(response.data.data_);
        // console.log(response.data.data_);
        setIsLoading(false);
        

      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [int_id]);

  if (isLoading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error.message}</div>;
  }

  const handleEditClick = async() => {
    // navigate(/ReportPageDnld/${int_id});
    // console.log(data);
    const log_id = localStorage.getItem('log_id');
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/generatereport_dnld`, {
      params: { Int_id: int_id, log_id: log_id }
  });
  window.location=`${process.env.REACT_APP_BACKEND_URL}${response.data.file}`;
  
  };

  return (
    <div className="container mt-5">
      <div className="row" align="center">
        <div className="col-md-12">
          <img src={process.env.REACT_APP_BACKEND_URL+data.photo} alt="Profile picture" width="200px" className="img-fluid rounded-circle" />
          <h3 className="mt-3">{data.intname}</h3>
          <p>Mentor: {data.mentname}</p>
          <p>Course: {data.course}</p>
          <p>Duration: {data.Duration}</p>
        </div>
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Assigned&nbsp;Date</th>
                <th>Assignment&nbsp;Title</th>
                <th>Submission&nbsp;Date</th>
                <th>Feedback</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {mnn.map((item, index) => (data.Int_id !== int_id?'':
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.assign_workid.assign_date.toString().split('T')[0]}</td>
                  <td>{item.assign_workid.work_id.workk_name}</td>
                  <td>{item.submission_date.toString().split('T')[0]}</td>
                  <td>{item.feedback}</td>
                  <td>
                    {item.evaluation_score === 'pending' ? (
                      <a href={`/evaluationandfeedback_evalresult/${item._id}`}>Evaluate</a>
                    ) : (
                      item.evaluation_score
                    )}
                  </td>
                </tr>
              ))}
              <tr align="right">
                <td colSpan="6">Average Score: {data.averageScore}</td>
              </tr>
            </tbody>
          </table>
            {mnn.length !== 0?
                    <button className="btn btn-primary" onClick={handleEditClick}>Download</button>:''
            }
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
