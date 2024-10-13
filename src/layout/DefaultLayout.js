import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import Adminnav from '../Sidebar/Adminnav';
import Usernav from '../Sidebar/Usernav';
import EngineerNav from '../Sidebar/EngineerNav';

const DefaultLayout = () => {

     // Retrieve the user role from localStorage
     const roleType = localStorage.getItem('RoleType'); // "user" or "admin"


    
     // Determine which navigation to use based on user role
     let navigation;
     if (roleType === 'user') {
       navigation = Usernav;
     } else if (roleType === 'admin') {
       navigation = Adminnav;
     } else if (roleType === 'enginner') {
       navigation = EngineerNav;
     } else {
       navigation = null; // Handle invalid or missing role (optional)
     }
     
  return (
    <div>
 <AppSidebar navigation={navigation} /> {/* Pass the navigation to AppSidebar */}
      
      {/* <AppSidebar /> */}
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />

        <div className="flex-grow-1 p-4 ml-6">
        <AppContent /> {/* Assuming AppContent is the main content area */}
      </div>
      
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
