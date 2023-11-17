import React, { useState, useEffect } from 'react';
import ProductGridItem from './ProductGridItem';
import '../../assets/css/ProductSearchPage.css'
import { ProductProps } from '../../interfaces/Product';

const ProductGrid: React.FC = () => {
    const apiUrl = '/api-items';
    const [products, setProducts] = useState<ProductGridItem[]>([]);

    const deleteProductHandler = (productId: number) => {
        // Remove the deleted product from the state
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    };

    const editProductHandler = (updatedProductData: ProductProps['product']) => {
        // Update the product data in the state
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProductData.id ? { ...product, ...updatedProductData } : product
          )
        );
    };

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

    if (products.length == 0) {
        return (<><h2 className='text-3xl ml-4 my-10'>No products available</h2></>)
    }
    return (
        <>
            <h2 className='text-3xl ml-4 my-10'>All Products</h2>
            <div className="max-w-screen-2xl px-4 mx-auto mt-8 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                    /** Pass the function to handle deletion so the component can emit the action to the parent */
                    <ProductGridItem key={product.id} product={product} onDelete={deleteProductHandler} onUpdate={editProductHandler}/>
                ))}
            </div>
        </>
    );
};


export default ProductGrid;