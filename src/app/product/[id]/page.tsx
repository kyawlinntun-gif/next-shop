"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

function ShowProduct() {
    const { id } = useParams();
    const [ product, setProduct ] = useState();

    useEffect(() => {
        axios.get(`http://shop.com/api/product/${id}`)
            .then(response => {
                setProduct(response.data.product);
            });
    }, [id]);

    return (
        <div className="custom_container mx-auto mt-20">
            <div className="grid grid-cols-12">
                {
                    product ? (
                        <div key={ product['id'] } className="border-2 p-3 bg-white text-black col-span-6 col-start-4">
                            <h1 className="font-bold text-4xl mb-10">Product Details</h1>
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-semibold">{ product['name'] } <span className="border-2 border-orange-600 bg-orange-600 py-1 px-2 rounded-xl text-white text-sm">{ product['stock_quantity'] }</span> </h1>
                                <span className="border-2 border-black py-1 px-2 rounded-xl text-sm">{ product['price'] }$</span>
                            </div>
                            <p className="my-2">{ product['description'] }</p>
                            <Link href='/'>
                                <button className="border-2 border-black py-1 px-2 rounded-xl">Go Back</button>
                            </Link>
                        </div>
                    ) : "Not product"
                }
            </div>
        </div>
    )
}

export default ShowProduct;