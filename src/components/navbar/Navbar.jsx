import "./Navbar.scss"
import React from 'react'
import { NavLink } from 'react-router-dom';


const links = [
  {
    path: "raw-data",
    name: "Raw Data"
  },
  {
    path: "resources",
    name: "Resources"
  },
  {
    path: "applications",
    name: "Applications"
  }];

export default function Navbar() {
  return (
    <div className='Navbar'>
      {links.map(link => (
        <NavLink to={link.path} key={link.path} >{link.name}</NavLink>
      ))}
    </div>
  )
}
