"use client";
import { AuthContext } from "@/contextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

function Login() {
    const router = useRouter();
    const {setAuth} = useContext(AuthContext);
    const [fail, setFail] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        'email': '',
        'password': '',
    });

    const [errors, setErrors] = useState({
        'email': '',
        'password': '',
    });

    const [success, setSuccess] = useState();

    const handleChange = (e : any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    }

    const handleSubmit = (e : any) => {
        e.preventDefault();

        axios.post('http://shop.com/api/login', formData)
            .then(response => {

                if(response.data.api_token && response.data.role) {
                    setAuth(response.data.api_token, response.data.role);
                } else {
                    setAuth(response.data.api_token, '');
                }
                
                if(response.data.errors) {
                    setErrors({
                        ...errors,
                        ...response.data.errors
                    });
                }

                if(response.data.fail) {
                    setFail(response.data.fail);
                }
                
                if(response.data.success) {
                    setSuccess(response.data.success);
                    router.push('/');
                }
            });
    }

    return(
        <>
            <div className="w-1/3 mx-auto shadow-lg p-10 mt-20 border-2 rounded-lg">
                {
                    success ? (
                        <div className="bg-green-700 py-1 px-4 rounded-lg">
                            { success }
                        </div>
                    ) : ''
                }
                {
                    success ? (
                        <div className="bg-green-700 py-1 px-4 rounded-lg">
                            { success }
                        </div>
                    ) : ''
                }
                <h1 className="font-bold text-4xl">Login</h1>
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Email:</label>
                        <input type="email" className="block border-2 mt-1 w-2/3 rounded text-black" name="email" value={formData.email} onChange={handleChange} />
                        {
                            errors['email'] && <span className="text-red-700">{errors['email']}</span>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Password:</label>
                        <input type="password" className="block border-2 mt-1 w-2/3 rounded text-black" name="password" value={formData.password} onChange={handleChange} />
                        {
                            errors['password'] && <span className="text-red-700">{errors['password']}</span>
                        }
                    </div>
                    <div>
                        <button type="submit" className="border-2 bg-blue-600 py-2 px-4 rounded-xl">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;