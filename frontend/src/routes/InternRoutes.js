import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter , Navigate} from 'react-router-dom';
import styled from 'styled-components'; // Import styled from styled-components



import InternProfile from "../components/intern/internprofileview";
import CourseList from "../components/intern/allocations/vIewassignedcourses";
import InternReportPage from "../components/intern/allocations/work_report";
import AssignmentList from "../components/intern/assigments/Internviewassignments";
import InternAssignmentDetails from "../components/intern/assigments/send_report";
import InternViewQueries from "../components/intern/queries/view queries";
import QueryForm from "../components/intern/queries/send_query";
import Sidebar from "../components/intern/sidebar";



const AdminContainer = styled.div`
  display: flex;
`;

const AdminContent = styled.div`
  flex: 1;
  padding: 20px; /* Adjust padding as needed */
  margin-left: 250px; /* Adjust margin to match the width of the Sidebar */
`;


function MentorRoutes() {
  const userType = localStorage.getItem('type');

    return (
      <AdminContainer>
        <Sidebar />
        <AdminContent>
        {userType === 'intern' ? (

          <Routes>

//         <Route path="/InternProfile/" element={<InternProfile />} />

//         <Route path="/CourseList/" element={<CourseList />} />
//         <Route path="/InternReportPage/:cid" element={<InternReportPage />} />

//         <Route path="/AssignmentList/" element={<AssignmentList />} />
//         <Route path="/InternAssignmentDetails/:aid" element={<InternAssignmentDetails />} />

//         <Route path="/QueryForm/" element={<QueryForm />} />
//         <Route path="/InternViewQueries/" element={<InternViewQueries />} />


          </Routes>
        ) : (
          <Navigate to="/login" replace />
        )}
      </AdminContent>
    </AdminContainer>
  );
}
  
  export default MentorRoutes;
  