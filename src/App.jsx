import React, { useContext } from 'react'
import AdminLogin from './pages/AdminLogin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import DoctorList from './pages/Admin/DoctorList';
import AddDoctors from './pages/Admin/AddDoctors';
import DoctorLogin from './pages/DoctorLogin';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';


const App = () => {
   const { aToken } = useContext(AdminContext)
   const {dToken} = useContext(DoctorContext)

   return  aToken || dToken ?(
      <div className='bg-[#F8F9FD]'>
         
       <Navbar />
         <div className='flex items-start'>
            <Sidebar />
            <Routes>
               <Route path='/' element={<></>} />
               <Route path='/admin-dashboard' element={<Dashboard />} />
               <Route path='/all-appointments' element={<AllApointments />} />
               <Route path='/add-doctor' element={<AddDoctors />} />
               <Route path='/doctor-list' element={<DoctorList />} />
               // doctor route
               <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
               <Route path='/doctor-profile' element={<DoctorProfile />} />
               <Route path='/doctor-appointments' element={<DoctorAppointments />} />
            </Routes>
         </div>
      </div>
   ) : (
    <>
            <Routes>
               <Route path='/' element={<AdminLogin/>} />
               <Route path='/Doctor-login' element={<DoctorLogin />} />
            </Routes>
    </>
   )
}

export default App
