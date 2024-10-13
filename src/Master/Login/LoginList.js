import React, { useEffect, useState } from 'react';
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardTitle,
} from '@coreui/react';
import axios from 'axios'; // Import axios for API calls

function LoginList() {
  const [websiteData, setWebsiteData] = useState([]);

  const fetchWebsiteData = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/users/getAllUsers'); // Adjust URL based on your backend
      setWebsiteData(response.data);
      console.log("response.data" + JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching website data:', error);
    }
  };

  useEffect(() => {
    fetchWebsiteData();
  }, []);

  return (
    <CCard>
      <CCardTitle style={{ textAlign: 'center', padding: '1rem 0' }}>
        User List
      </CCardTitle>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Username</CTableHeaderCell>
              <CTableHeaderCell scope="col">Full Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Company</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              {/* Add more headers as needed */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {websiteData.map((website, index) => (
              <CTableRow key={website.id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{website.username}</CTableDataCell>
                <CTableDataCell>{website.fullname}</CTableDataCell>
                <CTableDataCell>{website.company}</CTableDataCell>
                <CTableDataCell>{website.email}</CTableDataCell>
                {/* Add more data cells as needed */}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
}

export default LoginList;
