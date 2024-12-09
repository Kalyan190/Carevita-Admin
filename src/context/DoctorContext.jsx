import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

   const backendUrl = import.meta.env.VITE_BACKEND_URL
   const [dToken, setDtoken] = useState(localStorage.getItem('DToken') ? localStorage.getItem('DToken') : '')

   const [appointments,setAppointments] = useState([])
   const [dashData,setDashData] = useState([])
   const [profileData,setProfileData] = useState(false)

   const getAppointments = async ()=>{
      try {
         const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {headers:{dToken}})

         if(data.success){
            setAppointments(data.appointments.reverse())
         }else{
            toast.error(data.message)
         }
      } catch (error) {
         console.error(error)
         toast.error(error.message)
      }
   }

   const completeAppointment = async(appointmentId)=>{
      try {
         const { data } = await axios.post(backendUrl + '/api/doctor/appointment-complete',{appointmentId},{headers:{dToken}})

         if(data.success){
            toast.success(data.message);
            getAppointments()
         }else{
            toast.error(data.message)
         }
      } catch (error) {
         console.error(error)
         toast.error(error.message)
      }
   }

   const cancelAppointment = async (appointmentId) => {
      try {
         const { data } = await axios.post(backendUrl + '/api/doctor/appointment-cancelled', { appointmentId }, { headers: { dToken } })

         if (data.success) {
            toast.success(data.message);
            getAppointments()
         } else {
            toast.error(data.message)
         }
      } catch (error) {
         console.error(error)
         toast.error(error.message)
      }
   }

   const doctorDashboard = async()=>{
        try {
           const { data } = await axios.get(backendUrl + '/api/doctor/doctor-dashboard',{headers:{dToken}})
           
           if(data.success){
            setDashData(data.dashData)
           }else{
            toast.error(data.message)
           }

        } catch (error) {
           console.error(error)
           toast.error(error.message)
        }
   }

   const getProfileData = async(req,res)=>{
      try {
         const {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})

         if(data.success){
            setProfileData(data.profileData)
         }else{
            toast.error(data.message)
         }
      } catch (error) {
         console.error(error)
         toast.error(error.message)
      }
   }


   const value = {
       dToken,
       setDtoken,
       backendUrl,
       getAppointments,
       appointments,
       setAppointments,
       completeAppointment,
       cancelAppointment,
       setDashData,
       dashData,
       doctorDashboard,
       profileData,
       setProfileData,
       getProfileData
   }

   return (
      <DoctorContext.Provider value={value}>
         {props.children}
      </DoctorContext.Provider>
   )
}

export default DoctorContextProvider;
