import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

function InternHome() {
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
                    <SidebarItem to="/intern/InternProfile" className={location.pathname === '/intern/InternProfile' && 'active'}>
                        Profile
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/intern/CourseList" className={location.pathname === '/intern/CourseList' && 'active'}>
                        My Allocated Courses
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/intern/InternViewQueries" className={location.pathname === '/intern/InternViewQueries' && 'active'}>
                        Queries
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/intern/QueryForm" className={location.pathname === '/intern/QueryForm' && 'active'}>
                        Send Queries
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/intern/AssignmentList" className={location.pathname === '/intern/AssignmentList' && 'active'}>
                        Assignment List
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
}

export default InternHome;
