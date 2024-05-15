import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Adminhome from './components/admin/Adminhome';
import AddCourseDetail from './components/admin/course/addcoursedetails';
import ViewCourse from './components/admin/course/viewcourse';
import EditCourse from './components/admin/course/editcourse';
import AddMentor from './components/admin/mentor/addmentor';
import MentorManagement from './components/admin/mentor/mentormanagement';
import EditMentor from './components/admin/mentor/editmentor';
import AddIntern from './components/admin/intern/addintern';
import InternManagement from './components/admin/intern/intermanagement';
import EditIntern from './components/admin/intern/editintern';
import AllocateMentor from './components/admin/allocation/allocatementor';
import ViewAllocation from './components/admin/allocation/viewallocation';
import Allocatecourse from './components/admin/allocation/courseallocation';
import ViewCourseAllocation from './components/admin/allocation/view_course_allocation';
import AdminRoutes from './routes/AdminRoutes';
import MentorRoutes from './routes/MentorRoutes';
import InternRoutes from './routes/InternRoutes';




function App() {
  return (
    <BrowserRouter basename="/">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            {/* Content */}
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginForm />} />
              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/mentor/*" element={<MentorRoutes />} />
              <Route path="/intern/*" element={<InternRoutes />} />

              {/* <Route path="/*" element={<MentorRoutes />} /> */}

              {/* <Route path="/*" element={<InternRoutes />} /> */}


            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;




// import React from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Routes, Route, BrowserRouter} from 'react-router-dom';
// import LoginForm from './components/LoginForm';


// //Admin
// import Adminhome from './components/admin/Adminhome';
// import AddCourseDetail from './components/admin/course/addcoursedetails';
// import ViewCourse from './components/admin/course/viewcourse';
// import EditCourse from './components/admin/course/editcourse';
// import AddMentor from './components/admin/mentor/addmentor';
// import MentorManagement from './components/admin/mentor/mentormanagement';
// import EditMentor from './components/admin/mentor/editmentor';
// import AddIntern from './components/admin/intern/addintern';
// import InternManagement from './components/admin/intern/intermanagement';
// import EditIntern from './components/admin/intern/editintern';
// import AllocateMentor from './components/admin/allocation/allocatementor';
// import ViewAllocation from './components/admin/allocation/viewallocation';
// import Allocatecourse from './components/admin/allocation/courseallocation';
// import ViewCourseAllocation from './components/admin/allocation/view_course_allocation';


// // Mentor
// import Mentorhome from "./components/mentor/home";
// import MentorProfile from "./components/mentor/mentorprofileview";
// import AssignWork from "./components/mentor/works/assignwork";
// import AssignedWorks from "./components/mentor/works/assignedwork";
// import ViewAssignedWork from "./components/mentor/works/viewassignedwork";
// import ViewAllocatedInterns from "./components/mentor/allocations/view_allocated_interns";
// import InternMonitoring from "./components/mentor/allocations/intern_monitoring";
// import ReportPage from "./components/mentor/allocations/work_report";
// import ReportPageDnld from "./components/mentor/allocations/work_report_dnld";
// import AssignmentDetails from "./components/mentor/evaluations/evaluatedresults";
// import EvaluationForm from "./components/mentor/evaluations/send_evalutation";
// import ViewQueries from "./components/mentor/queries/replyquery";
// import SendReply from "./components/mentor/queries/send_reply";


// //Intern
// import InternHome from "./components/intern/home";
// import InternProfile from "./components/intern/internprofileview";
// import CourseList from "./components/intern/allocations/vIewassignedcourses";
// import InternReportPage from "./components/intern/allocations/work_report";
// import AssignmentList from "./components/intern/assigments/Internviewassignments";
// import InternAssignmentDetails from "./components/intern/assigments/send_report";
// import InternViewQueries from "./components/intern/queries/view queries";
// import QueryForm from "./components/intern/queries/send_query";



// function App() {
//   return (
//      <BrowserRouter basename="/">
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/login" element={<LoginForm />} />


//           {/*Admin*/}
//         <Route path="/Adminhome" element={<Adminhome />} />

//         <Route path="/AddCourseDetails" element={<AddCourseDetail />} />
//         <Route path="/ViewCourse" element={<ViewCourse />} />
//         <Route path="/CourseManagement" element={<ViewCourse />} />
//         <Route path="/editcor/:data" element={<EditCourse />} />

//         <Route path="/AddMentor" element={<AddMentor />} />
//         <Route path="/MentorManagement" element={<MentorManagement />} />
//         <Route path="/editmentor/:data" element={<EditMentor />} />

//         <Route path="/AddIntern" element={<AddIntern />} />
//         <Route path="/InternManagement" element={<InternManagement />} />
//         <Route path="/editintern/:data" element={<EditIntern />} />

//         <Route path="/AllocateMentor" element={<AllocateMentor />} />
//         <Route path="/ViewAllocation/" element={<ViewAllocation />} />

//         <Route path="/Allocatecourse" element={<Allocatecourse />} />
//         <Route path="/ViewCourseAllocation/" element={<ViewCourseAllocation />} />


//           {/*Mentor*/}
//         <Route path="/Mentorhome" element={<Mentorhome />} />

//         <Route path="/MentorProfile" element={<MentorProfile />} />

//         <Route path="/ViewAllocatedInterns" element={<ViewAllocatedInterns />} />

//           {/* <Route path="/viewcoursealloc" element={<ViewCourseAlloc />} /> */}
//         <Route path="/assignwork" element={<AssignWork />} />
//         {/*<Route path="/AssignedWorks" element={<AssignedWorks />} />*/}
//         <Route path="/AssignedWorks/:wid" element={<AssignedWorks />} />
//         <Route path="/ViewAssignedWork" element={<ViewAssignedWork />} />

//         <Route path="/InternMonitoring" element={<InternMonitoring />} />
//         <Route path="/ReportPage/:int_id" element={<ReportPage />} />
//         <Route path="/ReportPageDnld/:int_id" element={<ReportPageDnld />} />
//         <Route path="/AssignmentDetails/" element={<AssignmentDetails />} />
//         <Route path="/EvaluationForm/:wid" element={<EvaluationForm />} />

//         <Route path="/ViewQueries/" element={<ViewQueries />} />
//         <Route path="/SendReply/:qid" element={<SendReply />} />


//           {/*Intern*/}
//         <Route path="/InternHome/" element={<InternHome />} />

//         <Route path="/InternProfile/" element={<InternProfile />} />

//         <Route path="/CourseList/" element={<CourseList />} />
//         <Route path="/InternReportPage/:cid" element={<InternReportPage />} />

//         <Route path="/AssignmentList/" element={<AssignmentList />} />
//         <Route path="/InternAssignmentDetails/:aid" element={<InternAssignmentDetails />} />

//         <Route path="/QueryForm/" element={<QueryForm />} />
//         <Route path="/InternViewQueries/" element={<InternViewQueries />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;