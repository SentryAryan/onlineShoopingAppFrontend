// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faUtensils, faPeopleRoof, faClipboardList, faChartLine, faUsers, faBoxOpen, faChartPie, faCog } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../../store/slices/isLoginSlice';
import { setLoggedInUser } from '../../store/slices/authSlice';

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      setIsClosed(true);
    } else {
      setIsClosed(false);
    }
  }, []);

  const handleLogout = () => {
    dispatch(setIsLogin(false));
    dispatch(setLoggedInUser(null));
    toast.success("Logout successful");
  };

  return (
    <>
      <nav className="navbar">

        <div className="logo_item" onClick={() => navigate('/admin')}>
          <FontAwesomeIcon icon={faBars} className="bx bx-menu" id="sidebarOpen" onClick={toggleSidebar} />
          <img src={logo} alt="logo" /> Admin Pannel
        </div>
        <div className="navbar_content cursor-pointer" onClick={() => navigate('/admin/adminPage')}>
          <img src={profile} alt="" className="profile" />
        </div>
      </nav>
      <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
        <div className="menu_content">
          <ul className="menu_items">
            <li className="item">
              <NavLink to="/admin"
                className="nav_link"
              >
                <div className="submenu_item">
                  <span className="navlink_icon">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  <span className="navlink">Dashboard</span>
                </div>
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/admin/add-product" className="nav_link">
                <div className="submenu_item">
                  <span className="navlink_icon">
                    <FontAwesomeIcon icon={faBoxOpen} />
                  </span>
                  <span className="navlink">Add Product</span>
                </div>
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/manage-orders" className="nav_link">
                <div className="submenu_item">
                  <span className="navlink_icon">
                    <FontAwesomeIcon icon={faClipboardList} />
                  </span>
                  <span className="navlink">Manage Orders</span>

                </div>
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/admin/manage-sales" className="nav_link">
                <div className="submenu_item">
                  <span className="navlink_icon">
                    <FontAwesomeIcon icon={faChartLine} />
                  </span>
                  <span className="navlink">Manage Sales</span>
                </div>
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/admin/manage-products" className="nav_link">
                <div className="submenu_item">
                  <span className="navlink_icon">
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                  <span className="navlink">Manage Products</span>
                </div>
              </NavLink>
            </li>

            <li className="item">
              <NavLink to="/admin/settings" className="nav_link">
                <div className="submenu_item">
                  <span className="navlink_icon">
                    <FontAwesomeIcon icon={faCog} />
                  </span>
                  <span className="navlink">Setting</span>
                </div>
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/" className="nav_link">
                <div className="submenu_item">
                  <span className="navlink_icon">
                    <FontAwesomeIcon icon={faChartPie} />
                  </span>
                  <span className="navlink" onClick={() => handleLogout()}>Logout</span>
                </div>
              </NavLink>
            </li>
          </ul >
        </div >
      </nav >
    </>
  );
};

export default Sidebar;
