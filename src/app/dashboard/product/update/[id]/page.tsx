"use client";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/contextProvider";

function Update({params}: {params: {id: number}}) {
    const {id} = params;
    const {auth} = useContext(AuthContext);
    const [success, setSuccess] = useState<string | null>(null);
    const [fail, setFail] = useState<string | null>(null);
    const [product, setProduct] = useState([]);
    const [categories, setCategories] = useState([]);

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const stockQuantityRef = useRef<HTMLInputElement>(null);
    const categoryIdRef = useRef<HTMLSelectElement>(null);

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
    });

    useEffect(() => {
        // let api_token = localStorage.getItem('api_token');
        axios.get(`http://shop.com/api/productmanager/product/${id}`, {
            headers: {
                "Content-Type": 'Application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            if(response.data.product) {
                setProduct(response.data.product);
            }
        });
        axios.get('http://shop.com/api/superadmin/category', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            setCategories(response.data.categories);
        });

    }, [id])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setErrors({
            ...errors,
            [e.target.name]: ''
        })
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // let api_token = localStorage.getItem('api_token');
        
        axios.patch(`http://shop.com/api/productmanager/product/${id}`, {
                name: nameRef.current?.value,
                description: descriptionRef.current?.value,
                price: priceRef.current?.value,
                stock_quantity: stockQuantityRef.current?.value,
                category_id: categoryIdRef.current?.value
            },
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            },
            data: {
                
            }
        })
        .then(response => {
            if(response.data.errors) {
                setErrors(response.data.errors);
            }

            if(response.data.fail) {
                setFail(response.data.fail);
            }

            if(response.data.success) {
                setSuccess(response.data.success);
            }
        })

    }
    return (
        <>
            <h1 className="font-bold text-4xl mb-3">Update Product</h1>
            <div className="bg-white text-black p-4 rounded-md pl-20">
                {
                    success ? (
                        <div className="bg-green-700 py-1 px-4 rounded-lg">
                            { success }
                        </div>
                    ) : ''
                }
                {
                    fail ? (
                        <div className="bg-red-700 py-1 px-4 rounded-lg">
                            { fail }
                        </div>
                    ) : ''
                }
                {
                    product.length > 0 ? (
                        <form className="mt-3" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Name:</label>
                                <input type="text" className="block border-2 mt-1 w-2/4 rounded text-black" name="name" value={product[0]['name']} onChange={handleChange} ref={nameRef} />
                                {
                                    errors['name'] && <span className="text-red-700">{errors['name']}</span>
                                }
                            </div>
                            <div className="mb-3">
                                <label>Description:</label>
                                <textarea className="block border-2 mt-1 w-2/4 rounded text-black" name="description" onChange={handleChange} rows={5} value={product[0]['description']} ref={descriptionRef}>
                                </textarea>
                                {
                                    errors['description'] && <span className="text-red-700">{errors['description']}</span>
                                }
                            </div>
                            <div className="mb-3">
                                <label>Price:</label>
                                <input type="number" className="block border-2 mt-1 w-2/4 rounded text-black" name="price" value={product[0]['price']} onChange={handleChange} min="0.00" step="0.01" ref={priceRef} />
                                {
                                    errors['price'] && <span className="text-red-700">{errors['price']}</span>
                                }
                            </div>
                            <div className="mb-3">
                                <label>Stock Quantity:</label>
                                <input type="number" className="block border-2 mt-1 w-2/4 rounded text-black" name="stock_quantity" value={product[0]['stock_quantity']} onChange={handleChange} min="0" step="1" ref={stockQuantityRef} />
                                {
                                    errors['stock_quantity'] && <span className="text-red-700">{errors['stock_quantity']}</span>
                                }
                            </div>
                            <div className="mb-3">
                                <label>Select Category</label>
                                <select name="category_id" id="category_id" className="block border-2 w-2/4 rounded text-black py-1 pl-2 mt-2" onChange={handleChange} value={product[0]['category']['id']} ref={categoryIdRef}>
                                    {
                                        categories.map((category) => {
                                            return(
                                                <option value={category['id']} key={category['id']}>{ category['name'] }</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <button type="submit" className="border-2 bg-blue-600 py-2 px-4 rounded-xl">Update Product</button>
                            </div>
                        </form>
                    ) : "Not product"
                }
            </div>
        </>
    )
}

export default Update;