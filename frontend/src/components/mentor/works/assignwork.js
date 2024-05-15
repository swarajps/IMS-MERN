import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const AssignWork = () => {
    const [showModal, setShowModal] = useState(false);
    const [workTitle, setWorkTitle] = useState('');
    const [interns, setInterns] = useState([]);
    const [selectedInterns, setSelectedInterns] = useState([]);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [file, setFile] = useState('');
    const [submissionDate, setSubmissionDate] = useState('');
    const navigate = useNavigate();

    const openModal = () => {
        if (workTitle!=='' && textAreaValue!=='' && file && submissionDate!==''){
            setShowModal(true);
        }else{
            alert('Please fill in work details');
        }
        setSelectedInterns([]);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedInterns([]);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCheckboxChange = (e) => {
        const internId = e.target.value;
        if (e.target.checked) {
            setSelectedInterns([...selectedInterns, internId]);
        } else {
            setSelectedInterns(selectedInterns.filter(id => id !== internId));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const log_id = localStorage.getItem('log_id');
        formData.append('log_id', log_id);
        formData.append('fileField', file);
        formData.append('workTitle', workTitle);
        formData.append('textAreaValue', textAreaValue);
        formData.append('submissionDate', submissionDate);
        selectedInterns.forEach(internId => {
            formData.append('interns[]', internId);
        });

        try {
            if (selectedInterns.length == 0){
                alert('Please select at least one intern');
                return;
            }
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/mentor_assign_work`, formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
            );
            if (response.data.data === 'ok') {
                console.log(formData, selectedInterns);
                alert("Work Uploded and Assigned Sucessfylly");
                window.location.reload();
            } else {
                alert('Please try again');
            }
        } catch (error) {
            console.error('Error fetching interns:', error);
        }

        console.log('Form submitted:', {workTitle, textAreaValue, file, submissionDate});
    };

    useEffect(() => {
        const fetchInterns = async () => {
            const lid = localStorage.getItem('log_id');
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/viewmyallocatedinterns`,{ params: { "log_id": lid } });
                if (response.data.data.length > 0) {
                    setInterns(response.data.data);
                } else {
                    alert('No interns available');
                }
            } catch (error) {
                console.error('Error fetching interns:', error);
            }
        };
        fetchInterns();
    }, []);

    return (
        <div className="container">
            <h1>Assign Work</h1>
            <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="workTitle">Enter Work Title</label>
                    <input required type="text" className="form-control" value={workTitle}
                           onChange={(e) => setWorkTitle(e.target.value)} placeholder="Type Here" id="workTitle"/>
                </div>
                <div className="form-group">
                    <label htmlFor="textArea">Work Description</label>
                    <textarea required className="form-control" value={textAreaValue}
                              onChange={(e) => setTextAreaValue(e.target.value)} id="textArea" rows="5"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="fileField">Attach File</label>
                    <input required type="file" className="form-control-file" onChange={handleFileChange} id="fileField"/>
                </div>
                <div className="form-group">
                    <label htmlFor="submissionDate">Submission Date</label>
                    <input required type="date" className="form-control" value={submissionDate}
                           onChange={(e) => setSubmissionDate(e.target.value)} id="submissionDate"/>
                </div>
                {/*<button type="submit" className="btn btn-primary">Send</button>*/}
                <Button variant="primary" onClick={openModal} className="mt-3">Select Interns</Button>
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Interns</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {interns.map((intern, index) => (
                            <div key={intern._id} className="form-check">
                                <input type="checkbox" onChange={handleCheckboxChange} className="form-check-input" name="Interns" value={intern.intern_id._id}/>
                                <label className="form-check-label">{intern.intern_id.Name}</label>
                                <img src={process.env.REACT_APP_BACKEND_URL + intern.intern_id.Photo}
                                     alt="Image not available" height="70px" width="60px" className="ml-2"/>
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                    </Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit}>Send</Button>
                </Modal>
            </form>
        </div>
    );
};

export default AssignWork;


