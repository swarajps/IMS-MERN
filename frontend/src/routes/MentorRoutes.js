import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, BrowserRouter,Navigate} from 'react-router-dom';
import styled from 'styled-components'; // Import styled from styled-components



// Mentor
import MentorProfile from "../components/mentor/mentorprofileview";
import AssignWork from "../components/mentor/works/assignwork";
import AssignedWorks from "../components/mentor/works/assignedwork";
import ViewAssignedWork from "../components/mentor/works/viewassignedwork";
import ViewAllocatedInterns from "../components/mentor/allocations/view_allocated_interns";
import InternMonitoring from "../components/mentor/allocations/intern_monitoring";
import ReportPage from "../components/mentor/allocations/work_report";
import ReportPageDnld from "../components/mentor/allocations/work_report_dnld";
import AssignmentDetails from "../components/mentor/evaluations/evaluatedresults";
import EvaluationForm from "../components/mentor/evaluations/send_evalutation";
import ViewQueries from "../components/mentor/queries/replyquery";
import SendReply from "../components/mentor/queries/send_reply";
import Sidebar from "../components/mentor/sidebar";



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
        {userType === 'mentor' ? (

          <Routes>

<Route path="/MentorProfile" element={<MentorProfile />} />

<Route path="/ViewAllocatedInterns" element={<ViewAllocatedInterns />} />

  {/* <Route path="/viewcoursealloc" element={<ViewCourseAlloc />} /> */}
<Route path="/assignwork" element={<AssignWork />} />
{/*<Route path="/AssignedWorks" element={<AssignedWorks />} />*/}
<Route path="/AssignedWorks/:wid" element={<AssignedWorks />} />
<Route path="/ViewAssignedWork" element={<ViewAssignedWork />} />

<Route path="/InternMonitoring" element={<InternMonitoring />} />
<Route path="/ReportPage/:int_id" element={<ReportPage />} />
<Route path="/ReportPageDnld/:int_id" element={<ReportPageDnld />} />
<Route path="/AssignmentDetails/" element={<AssignmentDetails />} />
<Route path="/EvaluationForm/:wid" element={<EvaluationForm />} />

<Route path="/ViewQueries/" element={<ViewQueries />} />
<Route path="/SendReply/:qid" element={<SendReply />} />


          </Routes>
        ) : (
          <Navigate to="/login" replace />
        )}
      </AdminContent>
    </AdminContainer>
  );
}
  
  export default MentorRoutes;
  