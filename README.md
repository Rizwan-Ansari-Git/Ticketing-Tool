# ITSM - URL Detector

ITSM is a React application designed to analyze URLs and detect potential phishing attempts based on predefined patterns. This app aims to provide real-time URL safety checks, offering a simple and effective interface for users to verify whether a URL is safe, suspicious, or potentially malicious.

## Product Example: ITSM

### Key Features

- **IP Address Detection**: 
URLs that use raw IP addresses instead of domain names are often suspicious and flagged by the system.

- **Real-Time Analysis**:  
The app ensures that the URL uses the HTTPS protocol, which is essential for web security.

- **Secure Protocol Verification**:  
  If a user encounters a suspicious URL that isn't flagged by the detector, they can easily report it through a simple form in the app or browser extension. This report gets sent to the PhishGuard Pro team, who reviews and adds it to the database if verified.

- **Port and Pathname Validation**:  
  URLs with non-standard ports or excessively long pathnames are flagged. Additionally, URLs containing unsafe query parameters are identified.

### Future Updates
- **Browser Extension**:  
  Users can use the ITSM extension for Chrome and Firefox. When they visit a website, the extension checks the URL in real time and displays a colored indicator in the browser’s address bar (green for safe, yellow for suspicious, red for phishing). If the user attempts to navigate to a known phishing site, a popup appears with a warning and options to report the site.


## Login Credential
**UserName:**: 
Admin

**Password:**: 
Admin123

## Link:https://rizwan-ansari-git.github.io/URL-Detection/


## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Rizwan-Ansari-Git/ITSM.git
