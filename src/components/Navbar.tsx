"use client";
import { AuthContext } from "@/contextProvider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    // const [api_token, setApi_token] = useState<string | null>(null);
    const {auth, setAuth, totalQuantity} = useContext(AuthContext);
    const router = useRouter();

    // useEffect(() => {
    //     if(localStorage.getItem('api_token')) {
    //         setApi_token(localStorage.getItem('api_token'));
    //     }
    // }, []);

    const handleLogout = async () => {
        await axios.post('http://shop.com/api/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        }).then(response => {
            if(response.data.status) {
                // localStorage.removeItem('api_token');
                // setApi_token(null);
                // localStorage.removeItem('role');
                let api_token = '';
                let role = '';
                setAuth(
                    api_token,
                    role
                );

                router.push('/');
            }
        });
    }

    return(
        <nav className="bg-stone-500 text-white">
            <div className="custom_container mx-auto flex">
                <ul className="flex items-center h-10">
                    <li>
                        <Link href='/'>Home</Link>
                    </li>
                </ul>
                <ul className="flex gap-3 items-center justify-end h-10 ml-auto">
                    {
                        auth.api_token ? (
                            <>
                                {
                                    auth.role ? (
                                        <li>
                                            <Link href='/dashboard'>Dashboard</Link>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link href='/cart'>
                                                <FontAwesomeIcon icon={faCartShopping} className="mr-2"/>{totalQuantity}
                                            </Link>
                                        </li>
                                    )
                                }
                                <li onClick={handleLogout} className="cursor-pointer">
                                    Logout
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href='/login'>Login</Link>
                                </li>
                                <li>
                                    <Link href="/register">Register</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;