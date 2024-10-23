import { LoginForm } from "@/components/common/LoginForm";
import React from "react";


export default function Login() {

    return (
        <div className="bg-blue-500">
            <div className="flex min-h-screen items-center justify-center pb-10">
                <LoginForm/>
            </div>
        </div>
    )

}