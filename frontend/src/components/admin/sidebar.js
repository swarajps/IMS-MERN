import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
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


function Sidebar() {
  const location = useLocation();
  let navigate = useNavigate();

  // useEffect(() => {
  //     if (localStorage.getItem('type') !== 'intern') {
  //         navigate('/', { replace: true });
  //     }
  // }, []);

  function logout(e) {
      e.preventDefault();
      localStorage.clear();
      navigate('/', { replace: true });
  }

  return (
    <SidebarContainer>
      <ul>
        <li>
          <SidebarItem to="/admin/AddCourseDetails" className={location.pathname === '/admin/AddCourseDetails' && 'active'}>
            Add Course Details
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/AddIntern" className={location.pathname === '/admin/AddIntern' && 'active'}>
            Add Intern
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/AddMentor" className={location.pathname === '/admin/AddMentor' && 'active'}>
            Add Mentor
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/MentorManagement" className={location.pathname === '/admin/MentorManagement' && 'active'}>
            Mentor Management
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/InternManagement" className={location.pathname === '/admin/InternManagement' && 'active'}>
            Intern Management
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/CourseManagement" className={location.pathname === '/admin/CourseManagement' && 'active'}>
            Course Management
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/AllocateMentor" className={location.pathname === '/admin/AllocateMentor' && 'active'}>
            Allocate Mentor
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/ViewAllocation" className={location.pathname === '/admin/ViewAllocation' && 'active'}>
            View Allocation
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/Allocatecourse" className={location.pathname === '/admin/Allocatecourse' && 'active'}>
            Allocate Course
          </SidebarItem>
        </li>
        <li>
          <SidebarItem to="/admin/ViewCourseAllocation" className={location.pathname === '/admin/ViewCourseAllocation' && 'active'}>
            View Course Allocation
          </SidebarItem>
        </li>
        <li>
        <SidebarItem onClick={(e) => { logout(e) }} to="/" className={location.pathname === '/' && 'active'}>
                        Logout
                    </SidebarItem>
        </li>
      </ul>
    </SidebarContainer>
  );
};

export default Sidebar;