"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contextProvider";

function Sidebar() {
    const {auth} = useContext(AuthContext);
    // const [role, setRole] = useState<string | null>(null);

    // useEffect(() => {
    //     setRole(localStorage.getItem('role'));
    // }, [role]);

    return (
        <>
            <h1 className="font-bold text-4xl mb-3">Sidebar</h1>
            <div className="border-2 p-3 rounded-md bg-white text-black">
                <ul>
                    {
                        auth.role === 'super_admin' ? (
                            <>
                                <Link className="border-2 py-1 px-2 rounded-md mb-2" href="/dashboard/customer">Manage Customer</Link>
                                <Link className="border-2 py-1 px-2 rounded-md mb-2" href="/dashboard/customer">Manage Category</Link>
                                <Link className="border-2 py-1 px-2 rounded-md mb-2" href="/dashboard/customer">Manage Product</Link>
                            </>
                        ) : ''
                    }
                    {
                        auth.role === 'product_manager' ? (
                            <li className="border-2 py-1 px-2 rounded-md mb-2 cursor-pointer">Manage Product</li>
                        ) : ''
                    }
                </ul>
            </div>
        </>
    )
}

export default Sidebar;