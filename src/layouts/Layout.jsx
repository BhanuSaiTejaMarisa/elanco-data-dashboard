import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

export default function Layout() {

  const navigate = useNavigate();
  const params = useParams();
  console.log({ params });
  return (
    <div>
      <Navbar />
      <div>
        <button className='go-back-btn' onClick={() => navigate(-1)}>Back</button>
        <Outlet />
      </div>
    </div>
  )
}
