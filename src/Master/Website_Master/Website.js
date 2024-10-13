import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCardTitle, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react';
import axios from 'axios';  // Import axios for API calls
import Swal from 'sweetalert2';
import WebsiteList from './WebsiteList';

function Website() {
  const [validated, setValidated] = useState(false);
  const [url, setUrl] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = event.target[0].value;
    const status = event.target[1].value;
  
    try {
      const response = await fetch("http://localhost:8080/api/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, status }),
      });
  
    //   if (!response.ok) {
    //     throw new Error("Failed to add URL");
    //   }
      Swal.fire({
        title: 'Success!',
        text: 'Success',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Success!',
        text: 'fail',
        icon: 'success',
        confirmButtonText: 'Okay',
      });
    
    }
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <CCard>
            <CCardTitle style={{ textAlign: 'center', padding: '1rem 0' }}>
              Website URL Management
            </CCardTitle>
            <CCardBody>
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Website Url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    label="Select"
                    required
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  >
                    <option disabled value="">
                      Choose...
                    </option>
                    <option value="Allow">Allow</option>
                    <option value="Block">Block</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Submit form
                  </CButton>
                </CCol>
              </CForm>
<br></br>
              <WebsiteList/>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
}

export default Website;
