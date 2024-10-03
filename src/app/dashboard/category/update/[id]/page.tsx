"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contextProvider";

function Update({ params } : { params: { id: number } }) {
    const {auth} = useContext(AuthContext);
    const { id } = params;
    const router = useRouter();
    const [success, setSuccess] = useState<string | null>(null);
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
        'name': ''
    });

    const [errors, setErrors] = useState({
        "name": ''
    });

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

    useEffect(() => {
        getCategory();
    }, [id])

    const getCategory = () => {
        // let api_token = localStorage.getItem('api_token');
        axios.get(`http://shop.com/api/superadmin/category/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            setCategory(response.data.category);
        });
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // let api_token = localStorage.getItem('api_token');
        axios.patch('http://shop.com/api/superadmin/category',
            {
                name: formData['name'],
                category_id: id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.api_token}`
                }
            })
            .then(response => {
                if(response.data.errors) {
                    setErrors(response.data.errors);
                }

                if(response.data.success) {
                    setSuccess(response.data.success);
                    getCategory();
                    router.push(`/dashboard/category/update/${id}`);
                }
            });
    }

    return (
        <>
            <h1 className="font-bold text-4xl mb-3">Update Category</h1>
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
                        {
                            category.map(category => (
                                <h2 key={category['id']} className="text-2xl font-semibold mb-2">{ category['name'] }</h2>
                            ))
                        }
                        <label>Name:</label>
                        <input type="text" className="block border-2 mt-1 w-1/3 rounded text-black" name="name" value={formData.name} onChange={handleChange} />
                        {
                            errors['name'] && <span className="text-red-700">{errors['name']}</span>
                        }
                    </div>
                    
                    <div>
                        <button type="submit" className="border-2 bg-green-600 py-2 px-4 rounded-xl">Update Category</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Update;