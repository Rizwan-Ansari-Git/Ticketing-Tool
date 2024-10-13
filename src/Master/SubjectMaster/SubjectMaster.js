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
import axios from 'axios';
import Swal from 'sweetalert2';

function SubjectMaster() {
  const [formData, setFormData] = useState({
    category: '',
    subCategory1: '',
    subCategory2: '',
    priority: '',
    severity: '',
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
      const response = await axios.post("http://localhost:8085/api/subjects/", formData);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Data added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay',
        });
        setFormData({ category: '', subCategory1: '', subCategory2: '', priority: '', severity: '' });
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
      const response = await axios.get("http://localhost:8085/api/subjects/getAll");
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
          Category Details Entry
        </CCardTitle>
        <CCardBody>
          <CForm onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                onFocus={() => handleFocus('category')}
                invalid={!!errors.category}
              />
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Sub Category 1"
                name="subCategory1"
                value={formData.subCategory1}
                onChange={handleChange}
                onFocus={() => handleFocus('subCategory1')}
                invalid={!!errors.subCategory1}
              />
              {errors.subCategory1 && <div className="invalid-feedback">{errors.subCategory1}</div>}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Sub Category 2"
                name="subCategory2"
                value={formData.subCategory2}
                onChange={handleChange}
                onFocus={() => handleFocus('subCategory2')}
                invalid={!!errors.subCategory2}
              />
              {errors.subCategory2 && <div className="invalid-feedback">{errors.subCategory2}</div>}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                onFocus={() => handleFocus('priority')}
                invalid={!!errors.priority}
              />
              {errors.priority && <div className="invalid-feedback">{errors.priority}</div>}
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                label="Severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                onFocus={() => handleFocus('severity')}
                invalid={!!errors.severity}
              />
              {errors.severity && <div className="invalid-feedback">{errors.severity}</div>}
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
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Sub Category 1</CTableHeaderCell>
                <CTableHeaderCell>Sub Category 2</CTableHeaderCell>
                <CTableHeaderCell>Priority</CTableHeaderCell>
                <CTableHeaderCell>Severity</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {dataList.map((data, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{data.category}</CTableDataCell>
                  <CTableDataCell>{data.subCategory1}</CTableDataCell>
                  <CTableDataCell>{data.subCategory2}</CTableDataCell>
                  <CTableDataCell>{data.priority}</CTableDataCell>
                  <CTableDataCell>{data.severity}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default SubjectMaster;
