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

function WebsiteList() {
  const [websiteData, setWebsiteData] = useState([]);

  const fetchWebsiteData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/url/all'); // Adjust URL based on your backend
      setWebsiteData(response.data);
      console.log("response.data"+JSON.stringify(response.data));
      
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
        URL List
      </CCardTitle>
      <CCardBody>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Website URL</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Timestamp</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {websiteData.map((website, index) => (
              <CTableRow key={website.id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{website.url}</CTableDataCell>
                <CTableDataCell>{website.status}</CTableDataCell>
                <CTableDataCell>{new Date(website.createdAt).toLocaleString()}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
}

export default WebsiteList;
