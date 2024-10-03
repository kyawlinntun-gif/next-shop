"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/contextProvider";

function Detail({ params } : { params: { id : number } }) {
    const {auth} = useContext(AuthContext);
    const {id} = params;
    // const [role, setRole] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        // setRole(localStorage.getItem('role'));
        setSuccess(null);
    }, []);

    useEffect(() => {
        if(auth.role === 'super_admin' || auth.role === 'product_manager') {
            getProduct();
        }   
    }, [auth.role]);

    const getProduct = () => {
        // let api_token = localStorage.getItem('api_token');
        axios.get(`http://shop.com/api/productmanager/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.role}`
            }
        })
            .then(response => {
                setProduct(response.data.product);
            });
    }

    return (
        <>
            <h1 className="font-bold text-4xl mb-3">Manage Product</h1>
            <div className="bg-white text-black p-4 rounded-md">
                {
                    product.length > 0 ? (
                        product.map((product) => (
                            <div key={product['id']}>
                                <h1 className="font-semibold text-2xl">{product['name']}<span className="border-2 border-yellow-300 bg-yellow-300 text-white px-4 text-md rounded-xl ml-4">{product['stock_quantity']}</span></h1>
                                <p className="my-4">
                                    { product['description'] }
                                </p>
                                <div>
                                    <span className="border-2 border-gray-300 bg-gray-300 text-white px-2 py-1 rounded-xl">${ product['price'] }</span>
                                    <span className="font-bold text-xl ml-6">
                                        Category: {product['category']['name']}
                                    </span>
                                </div>
                                {
                                    auth.role === product['admin']['role'] ? (
                                        <a href={`/dashboard/product/update/${product['id']}`} className="font-semibold mt-4 border-2 px-2 py-1 rounded-xl border-yellow-600 inline-block">Update</a>
                                    ) : ''
                                }
                            </div>
                        ))
                    ) : ""
                }
            </div>
        </>
    )
}

export default Detail;