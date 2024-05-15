import React, { useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

function QueryForm() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const log_id = localStorage.getItem('log_id');
      await axios.post(process.env.REACT_APP_BACKEND_URL+'/intern_send_query', { log_id, query });
      alert('Query submitted successfully');
      window.location.replace('/intern/InternViewQueries');
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="query" className="col-sm-2 col-form-label">Query</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="query" name="query" rows="5" value={query} onChange={(e) => setQuery(e.target.value)}></textarea>
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

export default QueryForm;
