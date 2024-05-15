import React, { useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function ReplyForm() {
  const {qid} = useParams();
  const [reply, setReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL+'/mentor_send_reply', { qid, reply });
      window.location.replace('/mentor/ViewQueries');
      console.log('Reply submitted successfully');
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="reply" className="col-sm-2 col-form-label">Reply</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="reply" name="reply" rows="5" value={reply} onChange={(e) => setReply(e.target.value)}></textarea>
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

export default ReplyForm;
