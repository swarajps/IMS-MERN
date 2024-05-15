import React, { useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function EvaluationForm() {
  const {wid} = useParams();
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL+'/mentor_send_evaluataion', { wid, score, feedback });
      window.location.replace('/mentor/AssignmentDetails');
      console.log('Evaluation submitted successfully');
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="score" className="col-sm-2 col-form-label">Score</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="score" name="score" value={score} onChange={(e) => setScore(e.target.value)} />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="feedback" className="col-sm-2 col-form-label">Feedback</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="feedback" name="feedback" rows="5" value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EvaluationForm;
