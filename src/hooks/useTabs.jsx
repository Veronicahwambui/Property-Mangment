import { useState , useEffect, useCallback} from 'react';
import { useLocation } from 'react-router-dom';

export default function useTabs() {
   let location = useLocation()

   const [activeLink , setActiveLink] = useState(JSON.parse(localStorage.getItem("activeLink")))
  const [path , setPath] = useState(location.pathname)
   
   try {
    useEffect(() => {
        setPath(location.pathname);
     
       }, []);
   } catch (error) {
    
   }

   if ( path !== location.pathname ){
    localStorage.setItem("activeLink", JSON.stringify(1))
}


   useEffect(() => {  
    if (  localStorage.getItem("activeLink") === null){
        localStorage.setItem("activeLink", JSON.stringify(1))
        setActiveLink(1);     
       }

     localStorage.setItem("activeLink", JSON.stringify(activeLink))
      setActiveLink(()=> JSON.parse(localStorage.getItem("activeLink"))); 
    }, [activeLink])

  
    
//    window.addEventListener('popstate' , ()=>{
//     localStorage.setItem("activeLink", JSON.stringify(1))
//    })

   
  return [activeLink ,setActiveLink]
}
