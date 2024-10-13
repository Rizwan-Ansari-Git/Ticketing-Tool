// CompanyDropdown.js
import React, { useEffect, useState } from 'react';
import { CFormSelect } from '@coreui/react';
import axios from 'axios';

const CompanyDropdown = ({ onChange, value, error }) => {
  const [companies, setCompanies] = useState([]);

  // Fetch companies on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/users/companies');
        setCompanies(response.data);

        console.log("setCompanies"+JSON.stringify(setCompanies));
        
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <CFormSelect
      label="Company"
      name="company"
      value={value}
      onChange={onChange}
      invalid={!!error}
    >
      <option value="">--Select a Company--</option>
      {companies.map((company, index) => (
        <option key={index} value={company}>
          {company}
        </option>
      ))}
    </CFormSelect>
  );
};

export default CompanyDropdown;
