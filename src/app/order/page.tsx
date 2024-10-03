"use client";
import { AuthContext } from "@/contextProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

interface Order {
    id: number;
    total_amount: number;
    status: string;
    handle_by_admin: string;
}

function Order() {
    const {auth} = useContext(AuthContext);
    const [order, setOrder] = useState<Order>();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(auth && auth.api_token) {
            axios.get('http://shop.com/api/order', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.api_token}`
                }
            })
                .then(response => {
                    if(response.data.order) {
                        setOrder(response.data.order);
                    }
                    if(response.data.products) {
                        setProducts(response.data.products);
                    }
                })
        }
    }, [auth]);

    return(
        <>
            <div className="custom_container mx-auto mt-20">
                <div className="grid grid-cols-12">
                    <div className="col-span-4 col-start-5 bg-white text-black px-4 py-4 rounded-lg">
                        {/* {
                            success ? (
                                <div className="bg-green-700 py-1 px-4 rounded-lg text-white">
                                    { success }
                                </div>
                            ) : ''
                        } */}
                        <h1 className="text-4xl mx-auto mb-4">Order Lists</h1>
                        <table className="border-2 mx-auto">
                            <thead>
                                <tr>
                                    <th className="border-2 px-2">Total Amount</th>
                                    <th className="border-2 px-2">Status</th>
                                    <th className="border-2 px-2">Handle By Admin</th>
                                    <th className="border-2 px-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order ? (
                                                <tr key={order['id']}>
                                                    <td className="border-2 px-2">{order['total_amount']}</td>
                                                    <td className="border-2 px-2">{order['status']}</td>
                                                    <td className="border-2 px-2 text-center">{order['handle_by_admin'] === 'completed' ? "Completed" : order['handle_by_admin'] === 'cancel' ? "Cancel" : "Pending"}</td>
                                                    <td className="text-center">
                                                    <button
                                                        className={`border-2 px-2 py-1 rounded-xl text-white ${
                                                            order['handle_by_admin'] !== 'completed'
                                                                ? 'bg-gray-400 cursor-not-allowed'
                                                                : 'bg-green-700'
                                                        }`}
                                                        disabled={order['handle_by_admin'] !== 'completed'}
                                                    >
                                                        Paid
                                                    </button>
                                                    </td>
                                                </tr>
                                    ) : <tr></tr>
                                }
                            </tbody>
                        </table>
                        <h1 className="text-4xl mx-auto my-4">Order Product Lists</h1>
                        <table className="border-2 mx-auto">
                            <thead>
                                <tr>
                                    <th className="border-2 px-2">Name</th>
                                    <th className="border-2 px-2">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length > 0 ? (
                                        products.map((product, index) => (
                                            <tr key={index}>
                                                <td className="border-2 px-2">{product['name']}</td>
                                                <td className="border-2 px-2 text-center">{product['quantity']}</td>
                                            </tr>
                                        ))
                                    ) : <tr></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;