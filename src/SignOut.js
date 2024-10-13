import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CDropdownItem } from '@coreui/react'; // Assuming you're using CoreUI for dropdown

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication
    navigate('/500'); // Redirect to login
  };

  return (
    <CDropdownItem onClick={handleSignOut}>
      SignOut
    </CDropdownItem>
  );
};

export default SignOut;
