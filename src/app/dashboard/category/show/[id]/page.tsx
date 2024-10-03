"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contextProvider";

function Detail({ params } : { params: { id : number } }) {
    const {auth} = useContext(AuthContext);
    const { id } = params;
    // const [role, setRole] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        // setRole(localStorage.getItem('role'));
        setSuccess(null);
    }, []);

    useEffect(() => {
        if(auth.role === 'super_admin') {
            getCategory();
        }   
    }, [auth.role]);

    const getCategory = () => {
        // let api_token = localStorage.getItem('api_token');
        axios.get(`http://shop.com/api/superadmin/category/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            },
            data: {
                FormData
            }
        })
            .then(response => {
                setCategory(response.data.category);
            });
    }

    return(
        <>
            <h1 className="font-bold text-4xl">Manage Customer</h1>
            <div className="bg-white text-black p-4 rounded-md">
                {
                    category.length > 0 ? (
                        category.map((category) => (
                            <h1 className="font-semibold text-2xl" key={category['id']}>{category['name']}</h1>
                        ))
                    ) : ""
                }
            </div>
        </>
    )
}

export default Detail;