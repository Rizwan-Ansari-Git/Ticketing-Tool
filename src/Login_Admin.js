import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CRow,
  CCol,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked } from '@coreui/icons';

const Login_Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'Admin' && password === 'Admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('RoleType', "admin");
      navigate('//admin/dashboard');
      // {roleType === 'admin' && <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />}
      // {roleType === 'user' && <Route path="/" element={<Navigate to="/user/dashboard" replace />} />}
      // {roleType === 'engineer' && <Route path="/" element={<Navigate to="/engineer/dashboard" replace />} />}

    } 
    else if (username === 'User' && password === 'User123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('RoleType', "user");
      navigate('/user/dashboard');
    }  else if (username === 'Engineer' && password === 'Engineer123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('RoleType', "enginner");
      navigate('/engineer/dashboard');
    } 
    else {
      setError('Invalid username or password');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  };

  const cardStyle = {
    maxWidth: '400px',
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <CCard style={cardStyle}>
        <CCardBody>
          <CForm>
            <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Login</h1>
            <p style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#6c757d' }}>
              Sign In to your account
            </p>
            {error && <p style={{ marginBottom: '1rem', textAlign: 'center', color: 'red' }}>{error}</p>}
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                placeholder="Username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CInputGroup>
            <CRow>
              <CCol xs={6}>
                <CButton color="primary" className="px-4" onClick={handleLogin}>
                  Login
                </CButton>
              </CCol>
              <CCol xs={6} className="text-right">
                {/* <CButton color="link" className="px-0">
                  Forgot password?
                </CButton> */}
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Login_Admin;
