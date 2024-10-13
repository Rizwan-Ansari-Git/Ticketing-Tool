import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [urlResults, setUrlResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPhishingCount, setIsPhishingCount] = useState(0);
  const [isSafeCount, setIsSafeCount] = useState(0);
  const [isPhishing, setIsPhishing] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('urlResults')) || [];
    setUrlResults(storedResults);

    const phishingCount = storedResults.filter(item => item.isPhishing).length;
    const safeCount = storedResults.length - phishingCount;
    setIsPhishingCount(phishingCount);
    setIsSafeCount(safeCount);
  }, []);

  const checkPhishingURL = (url) => {
    const phishingPatterns = [

      "wwww", 
      "http://",   
      "\\\\", 
      ".tk", ".ml", ".ga", ".cf", ".gq"
    ];

    // const ipAddressPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
    // const invalidUrlCharacters = /[^a-zA-Z0-9.-/?:]/g;

    const containsPhishingPattern = phishingPatterns.some((pattern) => url.includes(pattern));
    // const containsIPAddress = ipAddressPattern.test(url);
    // const containsInvalidCharacters = invalidUrlCharacters.test(url);

    return containsPhishingPattern 
  };

  const isValidURL = (url) => {
    const parsedUrl = new URL(url);
    
    // Additional validation checks
    const isSecureProtocol = parsedUrl.protocol === 'https:';
    const unsafeDomains = ['example.com', 'malicious-site.com'];
    const isUnsafeDomain = unsafeDomains.some(domain => parsedUrl.hostname.includes(domain));
    const isValidPathLength = parsedUrl.pathname.length <= 2048;
    const hasUnsafeQuery = parsedUrl.search.includes('unsafeParam');
    const isSafePort = parsedUrl.port === '' || (parsedUrl.port >= 1 && parsedUrl.port <= 65535);
    const hasSpecialChars = /[%<>]/.test(parsedUrl.href);
    const isIpAddress = /^\d{1,3}(\.\d{1,3}){3}$/.test(parsedUrl.hostname);
    const validTlds = ['.com', '.org', '.net', '.edu'];
    const hasValidTld = validTlds.some(tld => parsedUrl.hostname.endsWith(tld));
    const unsafeSubdomains = ['malicious', 'scam'];
    const hasUnsafeSubdomain = unsafeSubdomains.some(sub => parsedUrl.hostname.startsWith(sub));

    return (
      isSecureProtocol &&
      !isUnsafeDomain &&
      isValidPathLength &&
      !hasUnsafeQuery &&
      isSafePort &&
      !hasSpecialChars &&
      !isIpAddress &&
      hasValidTld &&
      !hasUnsafeSubdomain
    );
  };

  const handleSubmit = () => {
    setError(''); // Reset error message

    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    // if (!isValidURL(url)) {
    //   setError('Please enter a valid URL.');
    //   return;
    // }

    const phishing = checkPhishingURL(url);
    setIsPhishing(phishing);

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const newResult = { url, isPhishing: phishing, timestamp };
    const updatedResults = [...urlResults, newResult];

    setUrlResults(updatedResults);
    setUrl('');

    if (phishing) {
      setIsPhishingCount(isPhishingCount + 1);
    } else {
      setIsSafeCount(isSafeCount + 1);
    }

    localStorage.setItem('urlResults', JSON.stringify(updatedResults));
  };

  const filteredResults = urlResults.filter(item =>
    item.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pieChartData = {
    labels: ['Safe', 'Unsafe'],
    datasets: [
      {
        data: [isSafeCount, isPhishingCount],
        backgroundColor: ['#008000', '#FF6384'],
        hoverBackgroundColor: ['#008000', '#FF6384'],
      },
    ],
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h5>Phishing URL Detection</h5>
        </CCardHeader>
        <CCardBody>
          <CFormInput
            type="text"
            placeholder="Enter a website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            invalid={!!error} // Use this for visual feedback if needed
          />
          <CButton color="primary" className="mt-3" onClick={handleSubmit}>
            Check URL
          </CButton>
          {error && <div className="text-danger mt-2">{error}</div>} {/* Error message display */}

          {isPhishing !== null && (
            <div className={`mt-4 p-3 ${isPhishing ? 'bg-danger' : 'bg-success'} text-white`}>
              {isPhishing ? "This website is NOT SAFE (Phishing URL)" : "This website is SAFE"}
            </div>
          )}
        </CCardBody>
      </CCard>

      <CRow className="mb-4">
        <CCol md={6}>
          <CCard className="bg-success text-white">
            <CCardBody>
              <h5>Safe URLs</h5>
              <p>{isSafeCount}</p>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="bg-danger text-white">
            <CCardBody>
              <h5>Unsafe URLs</h5>
              <p>{isPhishingCount}</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Checked URLs</h5>
              <CFormInput
                type="text"
                placeholder="Search URLs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-3"
              />
            </CCardHeader>
            <CCardBody>
              <div style={{
                height: '300px',
                overflowY: 'auto',
              }}>
                <CTable align="middle" hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Website URL</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Timestamp</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {filteredResults.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.url}</CTableDataCell>
                        <CTableDataCell className={item.isPhishing ? 'text-danger' : 'text-success'}>
                          {item.isPhishing ? 'Not Safe' : 'Safe'}
                        </CTableDataCell>
                        <CTableDataCell>{item.timestamp}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <h5>Phishing URL Details</h5>
            </CCardHeader>
            <CCardBody>
              <div style={{
                height: '350px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <CChartPie data={pieChartData} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
