"use client"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/contextProvider";

function Product() {
    const {auth} = useContext(AuthContext);
    const [success, setSuccess] = useState<string | null>(null);
    const [fail, setFail] = useState<string | null>(null);
    const [products, setProducts] = useState([]);
    // const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        // setRole(localStorage.getItem('role'));
        setSuccess(null);
    }, []);

    useEffect(() => {
        if(auth.role === 'super_admin' || auth.role === 'product_manager') {
            getProdcuts();
        }   
    }, [auth.role]);

    const getProdcuts = () => {
        // let api_token = localStorage.getItem('api_token');
        axios.get('http://shop.com/api/productmanager/product', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            setProducts(response.data.products);
        })
    }

    const deleteProduct = (id : number) => {
        // let api_token = localStorage.getItem('api_token');
        axios.delete(`http://shop.com/api/productmanager/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            if(response.data.success) {
                setSuccess(response.data.success);
                getProdcuts();
            }

            if(response.data.fail) {
                setFail(response.data.fail);
            }
        })
    }

    return (
        <>
            <div className="flex mb-3 items-center">
                <h1 className="font-bold text-4xl">Manage Product</h1>
                <a href="/dashboard/product/create" className="ml-10 border-2 px-4 bg-green-700 rounded-lg py-2 text-xl">Create</a>
            </div>
            {
                success ? (
                    <div className="bg-green-700 py-2 px-4 rounded-lg mb-3">
                        { success }
                    </div>
                ) : ''
            }
            {
                fail ? (
                    <div className="bg-green-700 py-2 px-4 rounded-lg mb-3">
                        { fail }
                    </div>
                ) : ''
            }
            <div className="bg-white text-black p-4 rounded-md">
                {
                    products.length ? (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Name</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Description</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Price</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Stock Quantity</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Category</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product) => {
                                        return(
                                            <tr key={ product['id'] }>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ product['name'] }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ (product['description'] as string)?.substring(0, 40) }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ product['price'] }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2 text-center">{ product['stock_quantity'] }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ product['category']['name'] }</td>
                                                <td className="border-2 border-slate-500 py-2 px-2">
                                                    <div className="flex justify-around">
                                                        <a href={`/dashboard/product/show/${product['id']}`} className="bg-blue-700 px-6 py-2 text-white rounded-md shadow-xl mr-3">Show</a>
                                                        {
                                                            auth.role === product['admin']['role'] ? (
                                                                <button className="bg-red-700 px-6 py-2 text-white rounded-md shadow-xl inline" onClick={() => {
                                                                    deleteProduct(product['id'])
                                                                }}>Delete</button>
                                                            ) : ''
                                                        }
                                                    </div>
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

export default Product;