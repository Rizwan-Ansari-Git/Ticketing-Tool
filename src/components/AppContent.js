import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'

const AppContent = () => {

  const roleType = localStorage.getItem('RoleType'); // "user" or "admin"


  return (
    // <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */}
          {roleType === 'admin' && <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />}
        {roleType === 'user' && <Route path="/" element={<Navigate to="/user/dashboard" replace />} />}
        {roleType === 'engineer' && <Route path="/" element={<Navigate to="/engineer/dashboard" replace />} />}
        </Routes>
      </Suspense>
    // </CContainer>
  )
}

export default React.memo(AppContent)
