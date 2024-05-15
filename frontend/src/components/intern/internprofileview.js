import React, { useEffect, useState} from 'react';
import axios from 'axios';
import '../../styles/MentorProfile.css';

const InternProfile = () => {
      const [data, setData] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const lid = localStorage.getItem('log_id');
                const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/internviewprofile',{params: {"LogID":lid}});
                console.log(response.data.data);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData();
    }, []);

  return (
    <div className="mentor-profile-container">
      <div className="mentor-profile">
        <img src={process.env.REACT_APP_BACKEND_URL +data.Photo} alt="Mentor Photo" className="mentor-photo" />
        <div className="mentor-details">
          <div className="detail">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{data.Name}</span>
          </div>
          <div className="detail">
            <span className="detail-label">DOB:</span>
            <span className="detail-value">{data.Dob}</span>
          </div>
          <div className="detail">
            <span className="detail-label">State:</span>
            <span className="detail-value">{data.State}</span>
          </div>
          <div className="detail">
            <span className="detail-label">City:</span>
            <span className="detail-value">{data.City}</span>
          </div>
          <div className="detail">
            <span className="detail-label">PIN:</span>
            <span className="detail-value">{data.Pin}</span>
          </div>
          <div className="detail">
            <span className="detail-label">Phone No:</span>
            <span className="detail-value">{data.Phone}</span>
          </div>
          <div className="detail">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{data.Email}</span>
          </div>
          <div className="detail">
            <span className="detail-label">Qualifications:</span>
            <span className="detail-value">{data.Qualifications}</span>
          </div>
          <div className="detail">
            <span className="detail-label">Join Date:</span>
            <span className="detail-value">{data.Join_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternProfile;
