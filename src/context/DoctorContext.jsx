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
   const [loading,setLoading] = useState(false)

   const getAppointments = async ()=>{
      try {
         setLoading(true)
         const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {headers:{dToken}})

         if(data.success){
            setAppointments(data.appointments.reverse())
         }else{
            toast.error(data.message)
         }
      } catch (error) {
         console.error(error)
         toast.error(error.message)
      }finally{
         setLoading(false)
      }
   }

   const completeAppointment = async(appointmentId)=>{
      try {
         setLoading(true)
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
      }finally{
         setLoading(false)
      }
   }

   const cancelAppointment = async (appointmentId) => {
      try {
         setLoading(true)
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
      }finally{
         setLoading(false)
      }
   }

   const doctorDashboard = async()=>{
        try {
         setLoading(true)
           const { data } = await axios.get(backendUrl + '/api/doctor/doctor-dashboard',{headers:{dToken}})
           
           if(data.success){
            setDashData(data.dashData)
           }else{
            toast.error(data.message)
           }

        } catch (error) {
           console.error(error)
           toast.error(error.message)
        }finally{
         setLoading(false)
        }
   }

   const getProfileData = async()=>{
      try {
         setLoading(true)
         const {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})

         if(data.success){
            setProfileData(data.profileData)
         }else{
            toast.error(data.message)
         }
      } catch (error) {
         console.error(error)
         toast.error(error.message)
      }finally{
         setLoading(false)
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
       getProfileData,
       loading,
       setLoading
   }

   return (
      <DoctorContext.Provider value={value}>
         {props.children}
      </DoctorContext.Provider>
   )
}

export default DoctorContextProvider;
