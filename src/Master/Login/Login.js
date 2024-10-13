import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
} from '@coreui/react';
import axios from 'axios'; // Import axios for API calls
import Swal from 'sweetalert2';
import LoginList from './LoginList';

function Login() {
  const [validated, setValidated] = useState(false);
  
  // Define all fields as state variables
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    company: '',
    password: '',
    roleType: '',
    branch: '',
    department: '',
    groupName: '',
    engineerCategory: '',
    phone: '',
    scope: '',
    location: '',
    designation: '',
    email: '',
    subDepartment: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Clear the specific error when input is focused
  const handleFocus = (name) => {
    setErrors({ ...errors, [name]: undefined });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty.`;
      }
    });

    // Specific validations
    if (formData.username && !/^[a-zA-Z]+$/.test(formData.username)) {
      newErrors.username = 'Username must be alphabetic.';
    }
    if (formData.fullname && !/^[a-zA-Z\s]+$/.test(formData.fullname)) {
      newErrors.fullname = 'Full Name must be alphabetic.';
    }
    if (formData.password && !/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(formData.password)) {
      newErrors.password = 'Password must contain both letters and numbers.';
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email must be a valid email format.';
    }
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be numeric.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validate()) return; // Validate before submitting

    try {
      const response = await axios.post("http://localhost:8085/api/users/", formData, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'User added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay',
        });
        // Clear form data
        setFormData({
          username: '',
          fullname: '',
          company: '',
          password: '',
          roleType: '',
          branch: '',
          department: '',
          groupName: '',
          engineerCategory: '',
          phone: '',
          scope: '',
          location: '',
          designation: '',
          email: '',
          subDepartment: ''
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add user.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-1">
        <div className="col-md-10">
          <CCard>
            <CCardTitle style={{ textAlign: 'center', padding: '1rem 0' }}>
              Login Master
            </CCardTitle>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                {/* Create input fields for each property */}
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Username"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => handleFocus('username')}
                    invalid={!!errors.username}
                  />
                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Full Name"
                    name="fullname"
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                    onFocus={() => handleFocus('fullname')}
                    invalid={!!errors.fullname}
                  />
                  {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => handleFocus('company')}
                    invalid={!!errors.company}
                  />
                  {errors.company && <div className="invalid-feedback">{errors.company}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="password"
                    label="Password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    invalid={!!errors.password}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Role Type"
                    name="roleType"
                    required
                    value={formData.roleType}
                    onChange={handleChange}
                    onFocus={() => handleFocus('roleType')}
                    invalid={!!errors.roleType}
                  />
                  {errors.roleType && <div className="invalid-feedback">{errors.roleType}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Branch"
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    onFocus={() => handleFocus('branch')}
                    invalid={!!errors.branch}
                  />
                  {errors.branch && <div className="invalid-feedback">{errors.branch}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    onFocus={() => handleFocus('department')}
                    invalid={!!errors.department}
                  />
                  {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Group Name"
                    name="groupName"
                    required
                    value={formData.groupName}
                    onChange={handleChange}
                    onFocus={() => handleFocus('groupName')}
                    invalid={!!errors.groupName}
                  />
                  {errors.groupName && <div className="invalid-feedback">{errors.groupName}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Engineer Category"
                    name="engineerCategory"
                    required
                    value={formData.engineerCategory}
                    onChange={handleChange}
                    onFocus={() => handleFocus('engineerCategory')}
                    invalid={!!errors.engineerCategory}
                  />
                  {errors.engineerCategory && <div className="invalid-feedback">{errors.engineerCategory}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="tel"
                    label="Phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    invalid={!!errors.phone}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Scope"
                    name="scope"
                    required
                    value={formData.scope}
                    onChange={handleChange}
                    onFocus={() => handleFocus('scope')}
                    invalid={!!errors.scope}
                  />
                  {errors.scope && <div className="invalid-feedback">{errors.scope}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    onFocus={() => handleFocus('location')}
                    invalid={!!errors.location}
                  />
                  {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Designation"
                    name="designation"
                    required
                    value={formData.designation}
                    onChange={handleChange}
                    onFocus={() => handleFocus('designation')}
                    invalid={!!errors.designation}
                  />
                  {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="email"
                    label="Email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    invalid={!!errors.email}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Sub Department"
                    name="subDepartment"
                    required
                    value={formData.subDepartment}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subDepartment')}
                    invalid={!!errors.subDepartment}
                  />
                  {errors.subDepartment && <div className="invalid-feedback">{errors.subDepartment}</div>}
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Submit Form
                  </CButton>
                </CCol>
              </CForm>
              <br />
            </CCardBody>
          </CCard>
          <br />
          <CCard>
            <CCardBody>
              <LoginList />
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default Login;
