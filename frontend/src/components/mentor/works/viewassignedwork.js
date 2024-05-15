import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Button, Form, Table } from 'react-bootstrap';

const ViewAssignedWork = () => {
  const [search, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [assignedWorks, setAssignedWorks] = useState([]);

  const handleWorkClick = (data) => {
      navigate(`/mentor/AssignedWorks/${data}`);
  };
  useEffect(() => {
        const fetchAllocations = async () => {
            try {
                const lid = localStorage.getItem('log_id');
                console.log(search);
                if (search !== '') {
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mentor_view_works`, {params: {search, "log_id": lid}});
                    setAssignedWorks(response.data.data);
                } else {
                    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/mentor_view_works', {params: {"log_id": lid}});
                    // console.log(response.data.data);
                    setAssignedWorks(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching allocation data:', error);
            }
        };

        fetchAllocations();
    }, [search]);

  return (
    <div className="container">
    <Form onSubmit={(e) => e.preventDefault()} method="post">
        <Form.Group controlId="formSearchQuery">
          <Form.Control
            type="text"
            placeholder="Enter search query"
            value={search}
            onChange={(e) => {setSearchQuery(e.target.value);}}
          />
        </Form.Group>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Assigned Date</th>
            <th>Work Title</th>
            <th>Description</th>
            <th>Submission Date</th>
            <th>Work File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedWorks.map((work, index) => (
            <tr key={work._id}>
              <td>{index + 1}</td>
              <td>{work.assign_date}</td>
              <td>{work.workk_name}</td>
              <td>{work.work}</td>
              <td>{work.submission_date}</td>
              <td><a href={process.env.REACT_APP_BACKEND_URL+work.attach_file} target="_blank">Show Attachment</a> </td>
              <td>
                <button className="edit-button" onClick={() => handleWorkClick(work._id)}>Assigned Interns</button>
                {/*<a href={`/AssignedWorks/${work._id}`}>*/}
                  {/*View Assigned Intern*/}
                {/*</a>*/}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewAssignedWork;
