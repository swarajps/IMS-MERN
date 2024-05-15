// AdminRoutes.js

import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import styled from 'styled-components'; // Import styled from styled-components
import Adminhome from '../components/admin/Adminhome';
import AddCourseDetail from '../components/admin/course/addcoursedetails';
import ViewCourse from '../components/admin/course/viewcourse';
import EditCourse from '../components/admin/course/editcourse';
import AddMentor from '../components/admin/mentor/addmentor';
import MentorManagement from '../components/admin/mentor/mentormanagement';
import EditMentor from '../components/admin/mentor/editmentor';
import AddIntern from '../components/admin/intern/addintern';
import InternManagement from '../components/admin/intern/intermanagement';
import EditIntern from '../components/admin/intern/editintern';
import AllocateMentor from '../components/admin/allocation/allocatementor';
import ViewAllocation from '../components/admin/allocation/viewallocation';
import Allocatecourse from '../components/admin/allocation/courseallocation';
import ViewCourseAllocation from '../components/admin/allocation/view_course_allocation';
import Sidebar from '../components/admin/sidebar'; // Importing the Sidebar component

// Define styled components for CSS
const AdminContainer = styled.div`
  display: flex;
`;

const AdminContent = styled.div`
  flex: 1;
  padding: 20px; /* Adjust padding as needed */
  margin-left: 250px; /* Adjust margin to match the width of the Sidebar */
`;

// function AdminRoutes() {
//   return (
//     <AdminContainer>
//       <Sidebar />
//       <AdminContent>
//         <Routes>
//           <Route path="/AddCourseDetails" element={<AddCourseDetail />} />
//           <Route path="/ViewCourse" element={<ViewCourse />} />
//           <Route path="/CourseManagement" element={<ViewCourse />} />
//           <Route path="/editcor/:data" element={<EditCourse />} />
//           <Route path="/AddMentor" element={<AddMentor />} />
//           <Route path="/MentorManagement" element={<MentorManagement />} />
//           <Route path="/editmentor/:data" element={<EditMentor />} />
//           <Route path="/AddIntern" exact element={<AddIntern />} />
//           <Route path="/InternManagement" element={<InternManagement />} />
//           <Route path="/editintern/:data" element={<EditIntern />} />
//           <Route path="/AllocateMentor" element={<AllocateMentor />} />
//           <Route path="/ViewAllocation" element={<ViewAllocation />} />
//           <Route path="/Allocatecourse" element={<Allocatecourse />} />
//           <Route path="/ViewCourseAllocation" element={<ViewCourseAllocation />} />
//         </Routes>
//       </AdminContent>
//     </AdminContainer>
//   );
// }

function AdminRoutes() {
  const userType = localStorage.getItem('type');

  return (
    <AdminContainer>
      <Sidebar />
      <AdminContent>
        {userType === 'admin' ? (
          <Routes>
 <Route path="/AddCourseDetails" element={<AddCourseDetail />} />
//           <Route path="/ViewCourse" element={<ViewCourse />} />
//           <Route path="/CourseManagement" element={<ViewCourse />} />
//           <Route path="/editcor/:data" element={<EditCourse />} />
//           <Route path="/AddMentor" element={<AddMentor />} />
//           <Route path="/MentorManagement" element={<MentorManagement />} />
//           <Route path="/editmentor/:data" element={<EditMentor />} />
//           <Route path="/AddIntern" exact element={<AddIntern />} />
//           <Route path="/InternManagement" element={<InternManagement />} />
//           <Route path="/editintern/:data" element={<EditIntern />} />
//           <Route path="/AllocateMentor" element={<AllocateMentor />} />
//           <Route path="/ViewAllocation" element={<ViewAllocation />} />
//           <Route path="/Allocatecourse" element={<Allocatecourse />} />
//           <Route path="/ViewCourseAllocation" element={<ViewCourseAllocation />} />
          </Routes>
        ) : (
          <Navigate to="/login" replace />
        )}
      </AdminContent>
    </AdminContainer>
  );
}


export default AdminRoutes;
