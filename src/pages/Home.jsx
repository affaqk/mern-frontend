import React, { useEffect, useState } from 'react'
import { carouselImages } from '../data'
import { Link } from 'react-router-dom'

import axios from "axios"
const Home = () => {

    const [products, setProduts] = useState([]);

    const getAllProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/products/get-all-products`)
            console.log(response.data.products);
            setProduts(response.data.products)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <div className="carousel w-full rounded-box">
                {carouselImages.map((img, index) => (
                    <div
                        key={index}
                        id={`slide${index}`}
                        className="carousel-item relative w-full"
                    >
                        <img src={img.img} style={{ width: "100vw", height: "70vh" }} />

                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a
                                href={`#slide${index === 0 ? carouselImages.length - 1 : index - 1} `}
                                className="btn btn-circle"
                            >
                                ❮
                            </a>
                            <a
                                href={`#slide${index === carouselImages.length - 1 ? 0 : index + 1}`}
                                className="btn btn-circle"
                            >
                                ❯
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="container mx-auto p-4">
                <h1 className='text-center mt-8 mb-8 font-bold text-5xl'>Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {
                        products?.map((product) => (
                            <>
                              <Link to = {`/product-detail/${product._id}`}>
                                <div key={product._id} className='border p-4 rounded-xl bg-gray-200'>
                                  
                                    <img className='object-cover w-100 p-4 rounded-lg' src={product.images[0].url} alt="" />
                                    <h3 className='text-lg font-bold mt-2 mb-2 ml-2'>{product.title}</h3>
                                    <p className='ml-2'>Price : <span className='font-bold'> {product.price}</span></p>
                                    <div className="text-center">
                                        <button className='text-white bg-blue-600 px-4 py-2 rounded-4xl mt-4 mb-4 cursor-pointer'>Buy Now</button>
                                    </div>
                                    
                                </div>
                                </Link>
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Home
