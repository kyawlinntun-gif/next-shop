"use client";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "@/contextProvider";

function Create() {
    const {auth} = useContext(AuthContext);
    const [formData, setFormData] = useState({
        'name': ''
    });

    const [errors, setErrors] = useState({
        'name': ''
    });

    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        });

        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // let api_token = localStorage.getItem('api_token');
        axios.post('http://shop.com/api/superadmin/category', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        }).then(response => {
            // setSuccess(response.data.success);
            if(response.data.errors) {
                setErrors(response.data.errors);
            }

            if(response.data.success) {
                setSuccess(response.data.success);
            }
        });
    }

    return(
        <>
            <h1 className="font-bold text-4xl mb-3">Create Category</h1>
            {
                success ? (
                    <div className="bg-green-700 py-2 px-4 rounded-lg mb-3">
                        { success }
                    </div>
                ) : ''
            }
            <div className="bg-white text-black p-4 rounded-md">
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name:</label>
                        <input type="text" className="block border-2 mt-1 w-1/3 rounded text-black" name="name" value={formData.name} onChange={handleChange} />
                        {
                            errors['name'] && <span className="text-red-700">{errors['name']}</span>
                        }
                    </div>
                    
                    <div>
                        <button type="submit" className="border-2 bg-green-600 py-2 px-4 rounded-xl">Create Category</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Create;