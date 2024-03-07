import React from 'react'
import './navbar.css'
import {Link, useLocation} from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const handleRemove = () => {
    localStorage.removeItem('user')
    location.reload()
  }
  return (
    <div className='navbar'>
        <div className="navContainer">
          <Link to="/" style={{color: "white", textDecoration: "none"}}>
            <span className="logo">Hotel Booking</span>
            </Link>
            <div className="navItems">
                { !localStorage.getItem('user') ?  <><button className="navButton">Register</button>
                <Link to="/login">
                <button className="navButton">Login</button>
                </Link></>
                : <Link to="/"><button onClick={handleRemove} className="navButton">Logout</button></Link>
              }
            </div>
        </div>
    </div>
  )
}

export default Navbar