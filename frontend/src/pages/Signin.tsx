import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin() {
   
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    async function signin(){
       
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value
       const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
          
            email,
            password
          
        },{
            withCredentials: true
        })
        const token = response.data.token;
        navigate("/Dashboard")
        
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder="email" ref={emailRef}/>
           
            <Input placeholder="Password" ref={passwordRef} />
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signin" fullWidth={true} loading={false} onClick={signin}/>
            </div>

        </div>
    </div>
}