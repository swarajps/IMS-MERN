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

function Mentorhome() {
    const location = useLocation();
    let navigate = useNavigate();

    // useEffect(() => {
    //     if (localStorage.getItem('type') !== 'mentor') {
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
                    <SidebarItem to="/mentor/ViewAllocatedInterns" className={location.pathname === '/mentor/ViewAllocatedInterns' && 'active'}>
                        My Allocated Interns
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/mentor/assignwork" className={location.pathname === '/mentor/assignwork' && 'active'}>
                        Assign Work
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/mentor/ViewAssignedWork" className={location.pathname === '/mentor/ViewAssignedWork' && 'active'}>
                        View Works
                    </SidebarItem>
                </li>
                {/* <li>
                    <SidebarItem to="/mentor/AssignedWorks" className={location.pathname === '/mentor/AssignedWorks' && 'active'}>
                        Assigned Works
                    </SidebarItem>
                </li> */}
                <li>
                    <SidebarItem to="/mentor/AssignmentDetails" className={location.pathname === '/mentor/AssignmentDetails' && 'active'}>
                        Assignment Report
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/mentor/internMonitoring" className={location.pathname === '/mentor/internmonitoring' && 'active'}>
                        Intern Monitoring
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/mentor/MentorProfile" className={location.pathname === '/mentor/MentorProfile' && 'active'}>
                        Mentor Profile
                    </SidebarItem>
                </li>
                <li>
                    <SidebarItem to="/mentor/ViewQueries" className={location.pathname === '/mentor/ViewQueries' && 'active'}>
                        Query and Reply
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

export default Mentorhome;
