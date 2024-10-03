"use client";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contextProvider";

function Create() {
    const {auth} = useContext(AuthContext);
    const [success, setSuccess] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: 1
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // let api_token = localStorage.getItem('api_token');
        axios.get('http://shop.com/api/superadmin/category', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        }).then(response => {
            setCategories(response.data.categories);
        })
    }, [])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // let api_token = localStorage.getItem('api_token');
        axios.post('http://shop.com/api/productmanager/product', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {

            if(response.data.errors) {
                setErrors(response.data.errors);
            }

            if(response.data.success) {
                setSuccess(response.data.success);

                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    stock_quantity: '',
                    category_id: 1
                })
            }
        });
    }

    return(
        <>
            <h1 className="font-bold text-4xl mb-3">Create Product</h1>
            <div className="bg-white text-black p-4 rounded-md pl-20">
                {
                    success ? (
                        <div className="bg-green-700 py-1 px-4 rounded-lg">
                            { success }
                        </div>
                    ) : ''
                }
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Name:</label>
                        <input type="text" className="block border-2 mt-1 w-2/4 rounded text-black" name="name" value={formData.name} onChange={handleChange} />
                        {
                            errors['name'] && <span className="text-red-700">{errors['name']}</span>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Description:</label>
                        <textarea className="block border-2 mt-1 w-2/4 rounded text-black" name="description" onChange={handleChange} rows={5} value={formData.description}>
                        </textarea>
                        {
                            errors['description'] && <span className="text-red-700">{errors['description']}</span>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Price:</label>
                        <input type="number" className="block border-2 mt-1 w-2/4 rounded text-black" name="price" value={formData.price} onChange={handleChange} min="0.00" step="0.01" />
                        {
                            errors['price'] && <span className="text-red-700">{errors['price']}</span>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Stock Quantity:</label>
                        <input type="number" className="block border-2 mt-1 w-2/4 rounded text-black" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} min="0" step="1" />
                        {
                            errors['stock_quantity'] && <span className="text-red-700">{errors['stock_quantity']}</span>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Select Category</label>
                        <select name="category_id" id="category_id" className="block border-2 w-2/4 rounded text-black py-1 pl-2 mt-2" onChange={handleChange}>
                            {
                                categories.map((category) => {
                                    return(
                                        <option value={category['id']} key={category['id']} >{ category['name'] }</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="border-2 bg-blue-600 py-2 px-4 rounded-xl">Create Product</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Create;