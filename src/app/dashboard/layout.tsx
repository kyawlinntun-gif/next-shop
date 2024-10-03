"use client"
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/contextProvider";

function Dashboard({ children }: { children: React.ReactNode }) {
    const {auth} = useContext(AuthContext);
    // const [role, setRole] = useState<string | null>(null);
    const [customers, setCustomers] = useState([]);
    const [success, setSuccess] = useState<string | null>(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // setRole(localStorage.getItem('role'));
        setSuccess(null);
    }, []);

    return (
        <div className="custom_container mx-auto">
            <h1 className="font-bold text-5xl my-3">Admin Dashboard</h1>
            <div className="grid grid-cols-12 gap-x-2">
                <div className="col-span-2">
                    <h1 className="font-bold text-4xl mb-3">Sidebar</h1>
                    <div className="border-2 p-3 rounded-md bg-white text-black">
                        <ul>
                            {
                                auth.role === 'super_admin' ? (
                                    <>
                                        <Link href='/dashboard/customer'>
                                            <li className="border-2 py-1 px-2 rounded-md mb-2">
                                                Manger Customer
                                            </li>
                                        </Link>
                                        <Link href='/dashboard/category'>
                                            <li className="border-2 py-1 px-2 rounded-md mb-2 cursor-pointer">Manage Category</li>
                                        </Link>
                                        <Link href='/dashboard/product'>
                                            <li className="border-2 py-1 px-2 rounded-md mb-2 cursor-pointer">Manage Product</li>
                                        </Link>
                                    </>
                                ) : ''
                            }
                            {
                                auth.role === 'product_manager' ? (
                                    <Link href='/dashboard/product'>
                                        <li className="border-2 py-1 px-2 rounded-md mb-2 cursor-pointer">Manage Product</li>
                                    </Link>
                                ) : ''
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-span-10">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;