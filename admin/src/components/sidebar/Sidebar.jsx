import React, { useContext } from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext)

  return (
    <div className="sidebar">
      <div className="top">
      <Link to="/" style={{textDecoration: 'none'}}>
        <span className="logo">AdminPanel</span>
      </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{textDecoration: 'none'}}>
          <li>
            <PersonIcon className="icon"/>
            <span>Users</span>
          </li>
          </Link>

          <Link to="/hotels" style={{textDecoration: 'none'}}>
          <li>
            <StoreIcon className="icon"/>
            <span>Hotels</span>
          </li>
          </Link>
          <Link to="/rooms" style={{textDecoration: 'none'}}>
          <li>
            <MeetingRoomIcon className="icon"/>
            <span>Rooms</span>
          </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon"/>
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <BarChartIcon className="icon"/>
            <span>Stats</span>
          </li>
          <li>
            <NotificationsIcon className="icon"/>
            <span>Notification</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamIcon className="icon"/>
            <span>System Health</span>
          </li>
          <li>
            <PsychologyIcon className="icon"/>
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon"/>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleIcon className="icon"/>
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className="icon"/>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=> dispatch({type: "LIGHT"})}></div>
        <div className="colorOption" onClick={()=> dispatch({type: "DARK"})}></div>
      </div>
    </div>
  )
}

export default Sidebar