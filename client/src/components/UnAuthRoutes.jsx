import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sign from './Sign';
import Template from './Template';

const UnAuthRoutes = (props) => {
  return (
    <>
        <BrowserRouter>
            <Routes>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="/" element={<Template />}>
                <Route index path="home" element={<Sign />} />
              </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default UnAuthRoutes
