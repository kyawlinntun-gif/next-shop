"use client";
import { AuthContext } from "@/contextProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

function Register() {
    const router = useRouter();
    const {setAuth, setTotalQuantity} = useContext(AuthContext);
    const [errors, setErrors] = useState({
        "name": '',
        "email": '',
        "password": '',
        "address": '',
        "phone_number": '',
    });

    const [formData, setFormData] = useState({
        "name": '',
        "email": '',
        "password": '',
        "password_confirmation": '',
        "address": '',
        "phone_number": '',
    });

    const handleChange = (e : any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const [success, setSuccess] = useState();

    const handleSubmit = (e : any) => {
        e.preventDefault();
        axios.post('http://shop.com/api/register', formData)
            .then(response => {
                if(response.data.api_token && response.data.role) {
                    setAuth(
                        response.data.api_token,
                        response.data.role,
                    )
                } else {
                    setAuth(response.data.api_token, '');
                    setTotalQuantity(0);
                }
                
                if(response.data.errors) {
                    setErrors({
                        ...errors,
                        ...response.data.errors
                    });
                }

                if(response.data.success) {
                    setSuccess(response.data.success);
                    router.push('/');
                }
            });
    }

    return(
        <div className="w-1/3 mx-auto shadow-lg p-10 mt-20 border-2 rounded-lg">
            {
                success ? (
                    <div className="bg-green-700 py-1 px-4 rounded-lg">
                        { success }
                    </div>
                ) : ''
            }
            <h1 className="font-bold text-4xl">Register</h1>
            <form className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name:</label>
                    <input type="text" className="block border-2 mt-1 w-2/3 rounded text-black" name="name" value={formData.name} onChange={handleChange} />
                    {
                        errors['name'] && <span className="text-red-700">{errors['name']}</span>
                    }
                </div>
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
                <div className="mb-3">
                    <label>Password Confirmation:</label>
                    <input type="password" className="block border-2 mt-1 w-2/3 rounded text-black" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Address:</label>
                    <input type="text" className="block border-2 mt-1 w-2/3 rounded text-black" name="address" value={formData.address} onChange={handleChange} />
                    {
                        errors['address'] && <span className="text-red-700">{errors['address']}</span>
                    }
                </div>
                <div className="mb-3">
                    <label>Phone Number:</label>
                    <input type="number" className="block border-2 mt-1 w-2/3 rounded text-black" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                    {
                        errors['phone_number'] && <span className="text-red-700">{errors['phone_number']}</span>
                    }
                </div>
                <div>
                    <button type="submit" className="border-2 bg-blue-600 py-2 px-4 rounded-xl">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;