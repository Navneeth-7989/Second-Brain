import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value
       await axios.post(`${BACKEND_URL}/api/v1/signup`,{
          
            email,
            username,
            password
          
        },{
            withCredentials: true
        })
        navigate("/signin")
        alert("You have signed up")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input ref={emailRef} placeholder="email" />
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />
            <div className="flex justify-center pt-4">
                <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} loading={false}/>
            </div>

        </div>
    </div>
}