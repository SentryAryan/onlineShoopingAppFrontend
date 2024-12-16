import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Sidebar from './AdminPanel/Sidebar';
import Dashboard from './AdminPanel/Dashboard';
import AddProduct from './AdminPanel/AddProduct';
import ManageOrders from './AdminPanel/ManageOrders';
import ManageSales from './AdminPanel/ManageSales';
import ManageProducts from './AdminPanel/ManageProducts';
import Logout from './AdminPanel/Logout';
import Settings from './AdminPanel/Settings';
import './Admin.css';
import AdminPage from '../pages/AdminPage';


function Layout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

function Layout2() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content2">
        <Outlet />
      </div>
    </div>
  );
}

function Admin() {
  return (
    <div className="admin-container">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/manage-orders" element={<ManageOrders />} />
          <Route path="/manage-sales" element={<ManageSales />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="/adminPage" element={<Layout2 />}>
          <Route index element={<AdminPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Admin;
