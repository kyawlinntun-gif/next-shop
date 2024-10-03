"use client"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/contextProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Cart() {
    const [carts, setCarts] = useState([]);
    const [totalCarts, setTotalCarts] = useState([]);
    const [order, setOrder] = useState([]);
    const {auth, setTotalQuantity} = useContext(AuthContext);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if(auth && auth.api_token) {
            axios.get('http://shop.com/api/cart/show', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.api_token}`
                }
            })
                .then(response => {
                    if(response.data.products)
                    {
                        setCarts(response.data.products);
                    }
                    if(response.data.total)
                    {
                        setTotalCarts(response.data.total);
                    }
                    if(response.data.order)
                    {
                        setOrder(response.data.order);
                    }
                });
        }
    },[auth]);

    const orderProduct = () => {
        axios.post('http://shop.com/api/order', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            if(response.data.success) {
                setSuccess(response.data.success);
                setTotalQuantity(0);
                router.push('/order');
            }
        })
    }

    return (
        <>
            <div className="custom_container mx-auto mt-20">
                <div className="grid grid-cols-12">
                    <div className="col-span-4 col-start-5 bg-white text-black px-4 py-4 rounded-lg">
                        {
                            success ? (
                                <div className="bg-green-700 py-1 px-4 rounded-lg text-white">
                                    { success }
                                </div>
                            ) : ''
                        }
                        <h1 className="text-4xl mx-auto mb-4">Cart Lists</h1>
                        <table className="border-2 mx-auto">
                            <thead>
                                <tr>
                                    <th className="border-2 px-2">Name</th>
                                    <th className="border-2 px-2">Price</th>
                                    <th className="border-2 px-2">Total Quantity</th>
                                    <th className="border-2 px-2">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    carts.length > 0 ? (
                                        carts.map((cart) => {
                                            return(
                                                <tr key={cart['id']}>
                                                    <td className="border-2 px-2">{cart['name']}</td>
                                                    <td className="border-2 px-2">{cart['price']}</td>
                                                    <td className="border-2 px-2 text-center">{cart['total_quantity']}</td>
                                                    <td className="border-2 px-2 text-end">{cart['total_price']}</td>
                                                </tr>
                                            )
                                        })
                                    ) : <tr></tr>
                                }
                            </tbody>
                            <tfoot>
                                {
                                    totalCarts.length > 0 ? (
                                        totalCarts.map((total, index) => (
                                            <tr key={index}>
                                                <td colSpan={2}></td>
                                                <td className="text-center px-2">{total['total_products_quantity']}</td>
                                                <td className="text-end px-2">{total['total_products_price']}</td>
                                            </tr>
                                        ))
                                    ) : <tr></tr>
                                }
                            </tfoot>
                        </table>
                        {
                            order.length > 0 ? (
                                <a href="/order" className="border-2 px-4 py-2 rounded-xl bg-green-700 text-white inline-block mt-4 ml-2 shadow-2xl">
                                    Continue
                                </a>
                            ) : (
                                <button className="border-2 px-4 py-2 rounded-xl bg-green-700 text-white inline-block mt-4 ml-2 shadow-2xl" onClick={() => {
                                    orderProduct();
                                }}>
                                    Order
                                </button>
                            )
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;