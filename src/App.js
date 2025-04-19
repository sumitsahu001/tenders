import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Register from './Components/pages/Register.js';
import Login from './Components/pages/Login.js';
import Logout from './Components/pages/Logout.js';
import Usercomponent from './Components/pages/Usercomponent.js';
import EPuser from './Components/pages/EPuser.js';
import CPuser from './Components/pages/CPuser.js';
import Admin from './Components/pages/Admin.js';
import Manageusers from './Components/pages/Manageusers.js';
import CPadmin from './Components/pages/CPadmin.js'; 
import EPadmin from './Components/pages/EPadmin.js';

import Coursor from './Components/Coursor';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import Auth from './Components/pages/Auth.js';

import ViewCategories from './Components/pages/viewCategories.js';
import Viewsubcategory from './Components/pages/Viewsubcategory.js';

import Addcategory from './Components/pages/Addcategory.js';
import Addsubcategory from './Components/pages/Addsubcategory.js';
import AddBid from './Components/pages/Bid/AddBid.js'; 

function App() {
  const [contentText, setContentText] = useState(`Tenders are formal offers or bids submitted by individuals, organizations, or businesses to carry out specific projects or supply goods and services...`);
  const [role, setRole] = useState(localStorage.getItem("role")); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <>
      <Auth />
      <Header setContentText={setContentText} />
      
      <Routes>
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login setRole={setRole} />} />
        <Route path='/logout' element={<Logout setRole={setRole} />} />
        <Route path='/Manageusers' element={<Manageusers />} />
       
        {role === "admin" && (
          <>
            <Route path="/Admin" element={<Admin />} />
            <Route path="/change-password" element={<CPadmin />} />
            <Route path="/update-profile" element={<EPadmin />} />
            <Route path="/addcategory" element={<Addcategory/>} />
            <Route path="/addsubcategory" element={<Addsubcategory/>} />
          </>
        )}

        {role === "user" && (
          <>
            <Route path="/user" element={<Usercomponent />} />
            <Route path="/change-password-user" element={<CPuser />} />
            <Route path="/update-profile-user" element={<EPuser />} />
            <Route path="/Viewcategories" element={<ViewCategories />} />
            <Route path="/Viewsubcategory/:categoryId" element={<Viewsubcategory />} />
            <Route path="/add-bid/:subcategoryId" element={<AddBid />} />
          </>
        )}
      </Routes>

      <Coursor />
      <Content text={contentText} setContentText={setContentText} />
      <Footer />
    </>
  );
}

export default App;