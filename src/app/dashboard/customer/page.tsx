"use client"
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contextProvider";

function Dashboard() {
    // const [role, setRole] = useState<string | null>(null);
    const {auth} = useContext(AuthContext);
    const [customers, setCustomers] = useState([]);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        // setRole(localStorage.getItem('role'));
        setSuccess(null);
    }, []);

    useEffect(() => {
        if(auth.role === 'super_admin') {
            getCustomer();
        }   
    }, [auth]);

    const getCustomer = () => {
        if(auth && auth.api_token) {
            axios.get('http://shop.com/api/superadmin/customer', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.api_token}`
                    }
                })
                .then(response => {
                    setCustomers(response.data.customers);
                });
        }
    }

    const deleteCustomer = (id : number) => {
        axios.delete('http://shop.com/api/superadmin/customer', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            },
            data: {
                id
            }
        }).then(response => {
            setSuccess(response.data.success);
            if(response.data.success) {
                getCustomer();
            }
        });
    }

    return (
        <>
            <h1 className="font-bold text-4xl mb-3">Manage Customer</h1>
            {
                success ? (
                    <div className="bg-green-700 py-2 px-4 rounded-lg mb-3">
                        { success }
                    </div>
                ) : ''
            }
            <div className="bg-white text-black p-4 rounded-md">
                {
                    customers.length ? (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Name</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Email</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Address</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Phone Number</th>
                                    <th className="border-2 border-slate-500 py-2 pl-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map((customer) => {
                                        return(
                                            <tr key={ customer['id'] }>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ customer['name'] }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ customer['email'] }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ customer['address'] }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2">{ customer['phone_number'] }</td>
                                                <td className="border-2 border-slate-500 py-2 pl-2 text-center">
                                                    <button className="bg-red-700 px-6 py-2 text-white rounded-md shadow-xl" onClick={() => {
                                                        deleteCustomer(customer['id']);
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

export default Dashboard;