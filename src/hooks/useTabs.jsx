/* global $*/
import { useState , useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';

export default function useTabs() {

  const [activeLink , setActiveLink] = useState(() => JSON.parse(localStorage.getItem("activeLink")) === null ? 1 :  JSON.parse(localStorage.getItem("activeLink")) ) 
  return [activeLink ,setActiveLink]
}
