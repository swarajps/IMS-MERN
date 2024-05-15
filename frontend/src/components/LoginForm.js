// import React, { useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import logoImg from '../img/logo.jpeg';

// const LoginContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background: #fccb90;
//   background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
//   background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
// `;

// const LoginFormContainer = styled.div`
//   position: relative; /* Enable positioning */
//   display: flex;
//   flex-direction: column;
//   justify-content: center; /* Center content vertically */
//   align-items: center; /* Center content horizontally */
//   height: 100%; /* Occupy full height of the parent */
//   width: 30%; /* Set width to 30% */
//   background-color: #fff; /* Change background color to white */
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const LayeredBox = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
//   border-radius: 8px;
//   z-index: -1; /* Place this box behind the content */
// `;

// const LogoImg = styled.img`
//   width: 185px;
// `;

// const LoginFormContent = styled.div`
//   text-align: center; /* Align content to center */
//   color: #333; /* Text color */
// `;

// const Title = styled.h4`
//   font-size: 24px; /* Increase font size */
//   margin: 10px 0; /* Add margin */
// `;

// const QuoteContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 70%; /* Set width to 70% */
// `;

// const Quote = styled.p`
//   font-style: italic;
//   color: #fff; /* White text color */
//   text-align: center;
//   /* Added styles for quote */
//   font-size: 18px; /* Set font size to 18px */
//   line-height: 1.5; /* Increase line spacing for readability */
//   margin: 0; /* Remove default margin */
// `;
// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // const backendUrl = 'http://localhost:4000';
//       const backendUrl = process.env.REACT_APP_BACKEND_URL;
//       const response = await axios.post(`${backendUrl}/login_post`, { username, password });
//       if (response.data.status === 'ok') {
//         console.log('Login successful:', response.data);
//         localStorage.setItem('log_id', response.data.log_id);
//         localStorage.setItem('type', response.data.type);

//         if (response.data.type === 'admin') {
//           window.location = '/admin/Adminhome';
//         } else if (response.data.type === 'mentor') {
//           window.location = '/mentor/MentorProfile';
//           // window.location = '/mentor/Mentorhome';
//         } else if (response.data.type === 'intern') {
//           window.location = '/intern/InternProfile';
//         }
//       } else {
//         console.log('Login Failed:', response.data);
//       }
//     } catch (error) {
//       setError('Invalid username or password');
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <LoginContainer>
//       <LoginFormContainer>
//         <LayeredBox /> {/* Layered box for the left side */}
//         <LoginFormContent>
//           <LogoImg src={logoImg} alt="logo" />
//           <Title>Welcome</Title>
//           <p>Please login to your account</p>
//           <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label">Username:</label>
//               <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password:</label>
//               <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             </div>
//             <button type="submit" className="btn btn-primary">Sign in</button>
//             {error && <p className="text-danger">{error}</p>}
//           </form>
//         </LoginFormContent>
//       </LoginFormContainer>
//       <QuoteContainer>
//         <Quote>
//           <p className="mb-4">Start where you are.</p>
//           <p className="mb-4">Use what you have.</p>
//           <p className="mb-4">Do what you can.</p>
//         </Quote>
//       </QuoteContainer>
//     </LoginContainer>
//   );
// };

// export default LoginForm;



import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import logoImg from '../img/logo.png';
import backgroundImage from '../img/desktop-wallpaper-web-design-web-developer.jpg'; // Import the background image

// Keyframes for pulse animation
const pulseAnimation = keyframes`
  0% {
    color: #ffffff;
  }
  50% {
    color: #ffcc00;
  }
  100% {
    color: #ffffff;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: 100% 100%;
  background-position: center;
`;

const LoginFormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 60%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.5); /* Darker background */
  transition: transform 0.3s ease;
  overflow-x: hidden; /* Hide horizontal overflow */
  &:hover {
    transform: scale(1.02);
  }
`;

const LogoImg = styled.img`
  width: 300px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const LoginFormContent = styled.div`
  text-align: center;
  color: #ffff;
`;

const Title = styled.h4`
  font-size: 32px;
  margin-bottom: 20px;
  animation: ${pulseAnimation} 2s infinite; /* Apply pulse animation */
`;

const InputField = styled.input`
  text-align: center; /* Align text in the center */
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/login_post`, { username, password });
      if (response.data.status === 'ok') {
        console.log('Login successful:', response.data);
        localStorage.setItem('log_id', response.data.log_id);
        localStorage.setItem('type', response.data.type);

        if (response.data.type === 'admin') {
          window.location = '/admin';
        } else if (response.data.type === 'mentor') {
          window.location = '/mentor/MentorProfile';
        } else if (response.data.type === 'intern') {
          window.location = '/intern/InternProfile';
        }
      } else {
        alert('Login failed: Invalid username or password');
      }
    } catch (error) {
      setError('Invalid username or password');
      console.log('Login failed:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginFormContainer>
        <LogoImg src={logoImg} alt="logo" />
        <LoginFormContent>
          <Title>Welcome</Title>
          <p>Please login to your account</p>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="mb-3">
              <InputField type="text" placeholder=" Username" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <InputField type="password" placeholder=" Password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Sign in</button>
            {error && <p className="text-danger">{error}</p>}
          </form>
        </LoginFormContent>
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default LoginForm;
