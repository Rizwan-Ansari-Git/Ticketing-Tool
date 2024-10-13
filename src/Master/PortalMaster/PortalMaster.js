import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react';
import axios from 'axios'; // Import axios for API calls
import Swal from 'sweetalert2';
import CompanyDropdown from '../CompanyDropdown';

function PortalMaster() {
  const [formData, setFormData] = useState({
    company: '',
    requestType: '',
  });
  const [errors, setErrors] = useState({});
  const [dataList, setDataList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (name) => {
    setErrors({ ...errors, [name]: undefined });
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:8085/api/portal/", formData);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Data added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay',
        });
        setFormData({ company: '', requestType: '' });
        fetchData();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add data.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/portal/getAll");
      setDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <CCard>
        <CCardTitle style={{ textAlign: 'center', padding: '1rem 0' }}>
          Request Type Entry
        </CCardTitle>
        <CCardBody>
          <CForm onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
            <CCol md={6}>
            <CompanyDropdown 
                value={formData.company} 
                onChange={handleChange} 
                error={errors.company} 
              />
              {errors.company && <div className="invalid-feedback">{errors.company}</div>}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Request Type"
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                onFocus={() => handleFocus('requestType')}
                invalid={!!errors.requestType}
              />
              {errors.requestType && <div className="invalid-feedback">{errors.requestType}</div>}
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Submit
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Company</CTableHeaderCell>
                <CTableHeaderCell>Request Type</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataList.map((data, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{data.company}</CTableDataCell>
                  <CTableDataCell>{data.requestType}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default PortalMaster;
