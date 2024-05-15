import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = styled.nav`
  background-color: #20232a; /* Dark background color */
  padding-top: 20px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  overflow-x: hidden;
`;

const SidebarItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: #fff; /* White text color */
  text-decoration: none;

  &:hover {
    background-color: #343a40; /* Darker background color on hover */
  }

  &.active {
    background-color: #007bff; /* Active item background color */
  }
`;

const Content = styled.main`
  margin-left: 250px;
  padding: 20px;
`;

const Adhome = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('type') !== 'admin') {
      window.location = '/';
    }
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {showSidebar && (
          <Sidebar className="col-md-3 col-lg-2">
            <div className="position-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <SidebarItem to="/AddCourseDetails" className={location.pathname === '/AddCourseDetails' && 'active'}>Add Course Details</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/AddIntern" className={location.pathname === '/AddIntern' && 'active'}>Add Intern</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/AddMentor" className={location.pathname === '/AddMentor' && 'active'}>Add Mentor</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/MentorManagement" className={location.pathname === '/MentorManagement' && 'active'}>Mentor Management</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/InternManagement" className={location.pathname === '/InternManagement' && 'active'}>Intern Management</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/CourseManagement" className={location.pathname === '/CourseManagement' && 'active'}>Course Management</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/AllocateMentor" className={location.pathname === '/AllocateMentor' && 'active'}>Allocate Mentor</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/ViewAllocation" className={location.pathname === '/ViewAllocation' && 'active'}>View Allocation</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/Allocatecourse" className={location.pathname === '/Allocatecourse' && 'active'}>Allocate Course</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/ViewCourseAllocation" className={location.pathname === '/ViewCourseAllocation' && 'active'}>View Course Allocation</SidebarItem>
                </li>
                <li className="nav-item">
                  <SidebarItem to="/logout" className={location.pathname === '/logout' && 'active'}>Logout</SidebarItem>
                </li>
              </ul>
            </div>
          </Sidebar>
        )}

        <Content className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <button className="btn btn-primary d-md-none" onClick={toggleSidebar}>
            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          {/* Render other content here based on the selected route */}
        </Content>
      </div>
    </div>
  );
};

export default Adhome;
