import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InternReportPage() {
    const navigate = useNavigate();
  const { cid } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mnn, setMnn] = useState(null);
  const log_id = localStorage.getItem('log_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/intern_generatereport`, {
          params: { cid: cid, log_id: log_id }
        });
        if (response.data === 'no'){
          alert('No mentors allocated yet');
          navigate(`/intern/CourseList`);
        }else if (response.data === 'crs'){
          alert('No courses allocated yet');
          navigate(`/intern/CourseList`);
        }
        setData(response.data);
        setMnn(response.data.data_);
        console.log(response.data.data_);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cid]);

  if (isLoading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={process.env.REACT_APP_BACKEND_URL+data.photo} alt="Profile picture" width="200px" className="img-fluid rounded-circle" />
          <h3 className="mt-3">{data.intname}</h3>
          <p>Mentor: {data.mentname}</p>
          <p>Course: {data.course}</p>
          <p>Duration: {data.Duration}</p>
        </div>
        <div className="col-md-8">
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Assigned Date</th>
                <th>Assignment Title</th>
                <th>Submission Date</th>
                <th>Feedback</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {mnn.map((item, index) => (data.cid.toString() !== cid.toString()?'':
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.assign_workid.assign_date}</td>
                  <td>{item.assign_workid.work_id.workk_name}</td>
                  <td>{item.submission_date}</td>
                  <td>{item.feedback}</td>
                  <td>
                    {item.evaluation_score === 'pending' ? (
                      <a href={`/intern/evaluationandfeedback_evalresult/${item._id}`}>Evaluate</a>
                    ) : (
                      item.evaluation_score
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="6">Average Score: {data.averageScore}</td>
              </tr>
            </tbody>
          </table>
            {data.length === 0?
                <form action="/pdfgeneration" method="post">
                    <input type="hidden" name="Int_id" value={data.cid} />
                    <input type="hidden" name="alloc_id" value={data.alloc_id} />
                    <button className="btn btn-primary">Download</button>
                </form>:''
            }
        </div>
      </div>
    </div>
  );
}

export default InternReportPage;
