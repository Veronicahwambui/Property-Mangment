/* global $*/
import { useState , useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';

export default function useTabs() {
  const location = useLocation()
  const [activeLink , setActiveLink] = useState(() =>  JSON.parse(localStorage.getItem("activeLink")) ) 
  if ( location.pathname != localStorage.getItem("location")) {
     localStorage.setItem("location", location.pathname )
     setActiveLink(1)
     localStorage.setItem("activeLink" , 1)
  }

  localStorage.setItem("activeLink" , activeLink)

  return [activeLink ,setActiveLink, location]
}
