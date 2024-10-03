"use client";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import Link from "next/link";
import { AuthContext } from "../contextProvider";

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const {auth, setAuth, setTotalQuantity} = useContext(AuthContext);
    const roleArray = ['super_admin', 'product_manager', 'order_manager'];

    useEffect(() => {
        getAllProducts();
    }, []);

    const searchProductsWithCategory = (id : number) => {
        axios.get(`http://shop.com/api/category/${id}/products`)
            .then(response => {
                setProducts(response.data.products);
                setCategories(response.data.categories);
            });
    }

    const getAllProducts = () => {
        axios.get('http://shop.com/api/home', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setProducts(response.data.products);
                setCategories(response.data.categories);
            });
    }

    const addToCart = async (id: number) => {
        await axios.post(`http://shop.com/api/cart/product/${id}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        });

        await axios.get('http://shop.com/api/cart', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.api_token}`
            }
        })
        .then(response => {
            if(response.data.total_quantity) {
                setTotalQuantity(response.data.total_quantity);
            }
        })
    }

    return (
        <div className="custom_container mx-auto mt-10">
            <div className="grid grid-cols-12 gap-x-2 mt-5">
                <div className="col-span-2">
                    <h1 className="font-bold text-4xl mb-3">Categories</h1>
                    <div className="border-2 p-3 bg-white text-black rounded-md">
                        <ul>
                            <li className="border-2 py-1 px-2 rounded-md mb-2 cursor-pointer" onClick={() => {
                                getAllProducts();
                            }}>All</li>
                            {
                                categories.length > 0 ? (
                                    categories.map((category) => {
                                        return(
                                            <li key={ category['id'] } className="border-2 py-1 px-2 rounded-md mb-2 cursor-pointer" onClick={() => {
                                                searchProductsWithCategory(category['id']);
                                            }}>{ category['name'] }</li>
                                        )
                                    })
                                ) : 'Not category'
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-span-10">
                    <h1 className="font-bold text-4xl mb-3">All Products</h1>
                    <div className="grid grid-cols-4 gap-x-2 gap-y-4">
                        {
                            products.length > 0 ? (
                                products.map((product) => {
                                    return (
                                        <div key={ product['id'] } className="border-2 p-3 bg-white text-black rounded-md">
                                            <div className="flex items-center justify-between">
                                                <h1 className="text-2xl font-semibold">{ product['name'] } </h1>
                                                <span className="border-2 border-black py-1 px-2 rounded-xl text-sm">{ product['price'] }$</span>
                                            </div>
                                            <p className="my-2">{ product['description'] }</p>
                                            <div className="flex justify-between">
                                                {
                                                    (auth.api_token && !(roleArray.includes(auth.role))) ? (
                                                        <Link href=''>
                                                            <button className="border-2 border-green-700 py-1 px-2 rounded-xl hover:bg-green-700 hover:text-white" onClick={() => {
                                                                addToCart(product['id']);
                                                            }}>Add To Cart</button>
                                                        </Link>
                                                    ) : ''
                                                }
                                                <Link href={`/product/${product['id']}`}>
                                                    <button className="border-2 border-black py-1 px-2 rounded-xl">View Detail</button>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : "Not product"
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;