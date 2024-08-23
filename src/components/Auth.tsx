import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DATABASE_URL } from "../config";

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequests(){
        try {
            const response = await axios.post(`${DATABASE_URL}/api/v1/user/${ type === "signup" ? "signup" : "signin"}`, Inputs)
            const jwt = response.data;
            localStorage.setItem("token", jwt)
            navigate("/blog")

        } catch (e){
            alert("Error while signing up")
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="font-extrabold text-4xl">

                        {type === "signup" ? "Create an account" : "Log into account"}
                    </div>
                    <div className="text-slate-500 text-md">
                        { type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}> {type === "signup" ? "SignIn" : "Signup"} </Link>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div>
                <Inputs 
                    label="Username" 
                    placeholder="Enter your name" 
                    onChange={(e) => setUserData(c => ({
                        ...c,
                        name: e.target.value
                    }))} 
                />
                </div>
                <div className="mt-4">
                    {type === "signup" ? <Inputs  
                    label="Email" 
                    placeholder="Enter your email"
                    onChange={(e) => setUserData(c => ({
                        ...c,
                        email: e.target.value
                    }))}
                    /> : null}
                </div>
                <div className="mt-4">
                    <Inputs  
                    label="Password" 
                    placeholder="Enter your Password"
                    onChange={(e) => setUserData(c => ({
                        ...c,
                        Password: e.target.value
                    }))}
                    />
                </div>
                <div className="flex justify-center mt-4" >
                <button onClick = {sendRequests} className="text-center bg-black text-white p-3 rounded-lg shadow-xl"> 
                    {type === "signup" ? "SignUp" : "Signn"}  
                </button> 
            </div>
            </div>
        </div>
    );
};

interface InputTypes {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
} 

export function Inputs({ label, placeholder, onChange, type = "text" }: InputTypes) {
    return (<div className="flex flex-col items-center text-center w-full">
                <div className="mb-3">
                    <label className="text-lg font-bold text-gray-900">
                        {label}
                    </label>
                </div>
                <div className="w-1/2">
                    <input
                        onChange={onChange}
                        type={type}
                        className="w-full bg-gray-50 text-gray-900 text-sm rounded-lg shadow-lg px-2 py-4 border border-gray-200"
                        placeholder={placeholder}
                        required
                    />
                </div>
        </div>
    );
}
