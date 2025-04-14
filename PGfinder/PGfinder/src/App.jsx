import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserSidebar from './Componets/layouts/UserSidebar'
// import "./assets/adminlte.css"
// import "./assets/adminlte.min.css"
import { Route, Routes, useLocation } from 'react-router-dom'
import UserProfile  from './Componets/user/UserProfile'
import  Dashboard  from './Componets/user/Dashboard'
import Home from "./Componets/Home";
import Login from './Componets/common/Login'
import  Signup  from './Componets/common/Signup'
import  PgLayout  from "./Componets/layouts/PgLayout"
// import AddPG  from "./Componets/pg/AddPG"
import AddPG2  from "./Componets/pg/AddPG2"
import UpdatePG  from "./Componets/pg/UpdatePG"
import ViewMyPG  from "./Componets/pg/ViewMyPG"
import axios from "axios";
import PGListings from './Componets/user/PGListing'
import Bookings from './Componets/user/Bookings'
import Settings from './Componets/user/Settings'
import ThemeGenerate from './Componets/user/favourite'
import Widgets from './Componets/user/Notifications'
import PGDetails from './Componets/user/PGDetails'
import UserLayout from './Componets/layouts/UserLayout'
import ExplorePG from './Componets/user/ExplorePG'
import LogoutButton from './Componets/user/Logout'
import Favorite from './Componets/user/favourite'
import  PrivateRoutes  from './hooks/PrivateRoutes'

import AdminDashboard from './Componets/Admin/AdminDashboard'
import UserManagement from './Componets/Admin/UserManagement'
import PGManagement from './Componets/Admin/PGManagement'
import BookingManagement from './Componets/Admin/BookingManagement'
import InquiryManagement from './Componets/Admin/InquiryManagement'
import AdminLayout from './Componets/layouts/AdminLayout'
import ContactPage from './Componets/pg/ContactPage'
import AgentProfile from './Componets/pg/AgentProfile'
import AgentViewBookings from './Componets/pg/AgentViewBooking'
import InquiryForm from './Componets/user/InquiryForm'
import About from './Componets/user/About'
import Contact from './Componets/user/Contect'
import Privacy from './Componets/user/Privacy'
import ForgotPassword from './Componets/common/ForgotPassword'




function App() {

  axios.defaults.baseURL = "http://localhost:3000"



  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; 
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);


  return (
    

    <div className={location.pathname === "/login" || location.pathname === "/signup" ? "" : "app-wrapper"}>  
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path='/login' element= {<Login/>}></Route>
        <Route path='/signup' element= {<Signup/>}></Route>
        <Route path='/forgotpassword' element= {<ForgotPassword/>}></Route>
        
        <Route path="/" element={<UserLayout />}>
         <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy/>} />
        <Route path="listings" element={<ExplorePG />} />
        <Route path="pglistings" element={<PGListings />} />
        <Route path="details/:id" element={<PGDetails />} />
        <Route element={<PrivateRoutes />}>
        <Route path="pglistings/bookings/:id" element={<Bookings />} />
        <Route path="settings" element={<Settings />} />
        <Route path="inquiry" element={<InquiryForm />} />
        <Route path="favourites" element={<ThemeGenerate/>} />
        <Route path="notifications" element={<Widgets/>} />
        <Route path="profile" element= {<UserProfile/>}/>
        <Route path="favourites" element={<Favorite/>} />
        <Route path="notifications" element={<Notification/>} />
        <Route path="logout" element= {<LogoutButton/>} />
        </Route> 
        </Route>      
        
        <Route path="/pglayout" element={<PgLayout />}>
        <Route path="/pglayout/dashboard" element={<AdminDashboard/>}/>
        <Route path="/pglayout/addpg2" element={<AddPG2 />} />
        <Route path="/pglayout/contactpage" element={<ContactPage />} />
        <Route path="/pglayout/updatepg/:id" element={<UpdatePG />} />
        <Route path="/pglayout/viewmypg" element={<ViewMyPG />} />
        <Route path="/pglayout/profile" element={<AgentProfile />} />
        <Route path="/pglayout/viewbookings" element={<AgentViewBookings />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="pgs" element={<PGManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="inquiries" element={<InquiryManagement />} />
        </Route>
      </Routes>
      </div>
  )
}

export default App;


