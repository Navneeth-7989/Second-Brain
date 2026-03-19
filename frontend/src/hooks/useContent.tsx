import axios from "axios";
import { useEffect, useState } from "react";

export function useContent(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [contents, setContents] = useState([]);

    function refresh(){
    console.log("REFETCHING...");
    axios.get(`${BACKEND_URL}/api/v1/content`,{
        withCredentials: true
    }).then((response)=>{
        
        setContents(response.data.content);
    });
}

    useEffect(()=>{
       refresh()
      let interval =  setInterval(()=>{
        refresh()
       }, 10* 1000)

       return ()=>{
        clearInterval(interval);
       }
    }, []);

    return {contents, refresh};
}