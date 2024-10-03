"use client"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contextProvider";

function Category() {
    const {auth} = useContext(AuthContext);
    const [success, setSuccess] = useState<string | null>(null);
    const [categories, setCategories] = useState([]);
    // const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // setRole(localStorage.getItem('role'));
        setSuccess(null);
    }, []);

    useEffect(() => {
        if(auth.role === 'super_admin') {
            getCategories();
        }   
    }, [auth.role]);

    const getCategories = () => {
        // let api_token = localStorage.getItem('api_token');
        axios.get('http://shop.com/api/superadmin/category', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            setCategories(response.data.categories);
        });
    }

    const deleteCategory = (id : number) => {
        // let api_token = localStorage.getItem('api_token');
        axios.delete(`http://shop.com/api/superadmin/category/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            setSuccess(response.data.success);
            getCategories();
            router.push('/dashboard/category');
        });
    }

    return(
        <>
            <div className="flex mb-3 items-center">
                <h1 className="font-bold text-4xl">Manage Customer</h1>
                <a href="/dashboard/category/create" className="ml-10 border-2 px-4 bg-green-700 rounded-lg py-2 text-xl">Create</a>
            </div>
            {
                success ? (
                    <div className="bg-green-700 py-2 px-4 rounded-lg mb-3">
                        { success }
                    </div>
                ) : ''
            }
            <div className="bg-white text-black p-4 rounded-md">
                {
                    categories.length ? (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Name</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map((category) => {
                                        return(
                                            <tr key={ category['id'] }>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ category['name'] }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2 text-center">
                                                    <a href={`/dashboard/category/show/${category['id']}`} className="bg-blue-700 px-6 py-2 text-white rounded-md shadow-xl mr-3">Show</a>
                                                    <a href={`/dashboard/category/update/${category['id']}`} className="bg-yellow-700 px-6 py-2 text-white rounded-md shadow-xl mr-3">Update</a>
                                                    <button className="bg-red-700 px-6 py-2 text-white rounded-md shadow-xl" onClick={() => {
                                                        deleteCategory(category['id'])
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : ''
                }
            </div>
        </>
    )
}

export default Category;