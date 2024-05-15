import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewQueries() {
  const  navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

   const handleEditClick = (data) => {
    navigate(`/mentor/SendReply/${data}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mentor_view_queries`, {
          params: { search: searchTerm, log_id: localStorage.getItem('log_id') }
        });
        setData(response.data.data);
        setIsLoading(false);
        console.log(response.data.data);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mentor_view_queries`, {
        params: { search: searchTerm, log_id: localStorage.getItem('log_id') }
      });
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>View Query Details</h2>
      <form onSubmit={handleSearch} className="mb-3">
        <div className="input-group">
          <input type="text" className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Date</th>
            <th>Intern</th>
            <th>Query</th>
            <th>Reply</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.date}</td>
              <td>{item.allocation_id.intern_id.Name}</td>
              <td>{item.query}</td>
              <td>
                {item.reply === 'Pending' ? (
                        <td><button className="edit-button" onClick={()=>handleEditClick(item._id)}>Reply</button></td>
                ) : (
                  item.reply
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewQueries;
