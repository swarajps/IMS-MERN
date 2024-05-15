import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InternMonitoring =() => {
    const navigate = useNavigate();
    const [selectedInterns, setSelectedInterns] = useState([]);
    const handleCheckboxChange = (e) => {
        const internId = e.target.value;
        if (e.target.checked) {
            setSelectedInterns([...selectedInterns, internId]);
        } else {
            setSelectedInterns(selectedInterns.filter(id => id !== internId));
        }
    };

    const [search, setSearchQuery] = useState('');
    const handleConfirm = async (id) => {
        if (selectedInterns.length === 0){
            alert('No interns selected');
            return;
        }
        const isConfirmed = window.confirm('Are you sure?');
        if (isConfirmed) {
            try {
                const lid = localStorage.getItem('log_id');
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/mentor_monitor_works_post`, {ints: selectedInterns});
                console.log(response.data);
                window.location.reload();

            } catch (e) {

            }
            console.log(selectedInterns);
        }
    };

    const [mnn, setMnn] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lid = localStorage.getItem('log_id');
                if(search !== ''){
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mentor_monitor_works`, {params: {log_id: lid, search: search}});
                    setMnn(response.data.data);
                    console.log(response.data.data);
                }else{
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mentor_monitor_works`, {params: {log_id: lid}});
                    setMnn(response.data.data);
                    console.log(response.data.data);
                }
            } catch (e) {

            }

        };
        fetchData();
    }, [search]);

    const renderInterns = () => {
        return mnn.map((intern, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{intern.intern_id.Name}</td>
                <td>{intern.work_id.workk_name}</td>
                <td>
                    {intern.status === 'pending' ? (
                        <Form.Check
                            type="checkbox"
                            id={`checkbox-${index}`}
                            label='Mark as completed'
                            onClick={handleCheckboxChange}
                            value={intern._id}
                            // onClick={() => handleConfirm(intern.id)}
                        />
                    ) : (
                        intern.status
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <div className="container">
            <Form onSubmit={handleConfirm}>
                <Form.Group controlId="formSearchQuery">
                    <Form.Control
                        type="text"
                        placeholder="Enter search query"
                        value={search}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                </Form.Group>

            <Table striped bordered hover className="mt-4">
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Interns</th>
                    <th>Work Assigned</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>{renderInterns()}</tbody>
            </Table>
                <Button variant="primary" onClick={handleConfirm}>Submit</Button>
            </Form>
        </div>
    );
};

export default InternMonitoring;
