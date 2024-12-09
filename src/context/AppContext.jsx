import { createContext, useState } from "react";


export const AppContext = createContext();

const AppContextProvider = (props)=>{

   const [loading, setLoading] = useState(false)

   const currency = '$'

   const calculateAge = (dob)=>{
      const today = new Date();
      const birthDate = new Date(dob);

      let age = today.getFullYear() - birthDate.getFullYear()

      return age;

   }
   const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
   const slotDateFormat = (slotDate) => {
      const DateArray = slotDate.split('_');
      return DateArray[0] + " " + months[Number(DateArray[1])] + " " + DateArray[2]
   }

     const value = {
         calculateAge,
         slotDateFormat,
         currency,
         loading,
         setLoading
     }

     return (
      <AppContext.Provider value={value}>
          {props.children}
      </AppContext.Provider>
     )
}

export default AppContextProvider;
