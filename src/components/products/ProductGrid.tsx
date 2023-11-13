import React, { useState, useEffect } from 'react';
import ProductGridItem from './ProductGridItem';
import '../../assets/css/ProductSearchPage.css'

const ProductSearchPage = () => {
    const apiUrl = '/api-items';
    const [products, setProducts] = useState<ProductGridItem[]>([]);
    useEffect(() => {
        // Fetch data from the API
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((response) => {
                const { message, data } = response;
                if (data) {
                  setProducts(data);
                } else {
                  console.error('API Error:', message);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    console.log(products);
    return (
        <>
            <div className="container mx-auto my-32">
                <h2 className='text-3xl mb-5'>All Products</h2>
                <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <ProductGridItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};


export default ProductSearchPage;