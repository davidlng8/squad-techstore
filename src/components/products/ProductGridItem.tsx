import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { ProductProps } from '../../interfaces/Product';
import Spinner from '../ui/Spinner';
import ProductModal from './ProductModal'; // Import the modal component

const deleteProduct = async (productId: number) => {
    const response = await fetch(`/api-items/${productId}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
    return await response.json();
};

const updateProduct = async (productId: number, data: any) => {
    const response = await fetch(`/api-items/${productId}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Failed to update product');
    }
    return await response.json();
};

const ProductGridItem: React.FC<ProductProps> = ({ product, onDelete, onUpdate }) => {
    const [actionInProgress, setActionInProgress] = useState(false);
    const [actionMessage, setActionMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteHandler = () => {
        // Disable buttons during the delete operation and clear out the response message
        setActionInProgress(true);
        setActionMessage('');
        setTimeout(() => {
            // Simulate the API loading time
            deleteProduct(product.id)    
                .then(() => {
                    setActionMessage('Item successfully deleted');
                })
                .catch(error => {
                    setActionMessage(error.message);
                }).finally(() => {
                    setTimeout(() => {
                        // Allow the message to linger for 2 seconds
                        setActionInProgress(false);
                        setActionMessage('');
                        onDelete(product.id);
                    }, 2000);
                });
        }, 2000);
    };

    const editHandler = (updateData : ProductProps['product']) => {
        // Close the edit modal
        setIsModalOpen(false);
        // Show the spinner modal
        setActionInProgress(true);
        setTimeout(() => {
            updateProduct(Number(updateData.id), updateData)
                .then(() => {
                    setActionMessage('Product update successful');
                    onUpdate(updateData);
                })
                .catch(error => {
                    setActionMessage(error.message);
                    setActionMessage('An error occured. Cannot update at this time');
                }).finally(() => {
                    setTimeout(() => {
                        setActionInProgress(false);
                        setActionMessage('');
                    }, 2000);
                });
        }, 2000);
    }

    return (
        <>
            <div className="relative bg-white p-4 shadow-md rounded-md overflow-hidden transition-transform transform-gpu hover:scale-105">
                <div className="aspect-w-1 aspect-h-1 mb-4">
                    {product.img_url ? (
                        // If image is available, show the product image
                        <img src={product.img_url} alt="Product Image" className="w-full h-full object-cover rounded-md" />
                    ) : (<img src="https://placekitten.com/200/200" alt="Default Image" className="w-full h-full object-cover rounded-md" />)}
                </div>
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 h-18 overflow-hidden line-clamp-3 transition-height">
                    {product.description}
                </p>
                {actionInProgress && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        {actionMessage ? (
                            <div className={`bg-white p-4 rounded-md ${actionMessage.includes('success') ? 'border-green-500' : 'border-red-500'} border`}>
                                {actionMessage}
                            </div>
                        ) : (
                            <Spinner />
                        )}
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-blue-500 font-bold">${product.price}</span>
                    <div className="space-x-2">
                        <button
                            disabled={actionInProgress}
                            onClick={() => setIsModalOpen(true)}
                            className={`bg-green-500 text-white px-4 py-2 rounded-md mr-2 ${actionInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <span className="ml-2">Edit</span>
                        </button>
                        <button
                            onClick={deleteHandler}
                            disabled={actionInProgress}
                            className={`bg-red-700 text-white px-4 py-2 rounded-md ${actionInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-900'}`}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                            <span className="ml-2">Delete</span>
                        </button>
                    </div>
                </div>
                <ProductModal itemId={product.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onEdit={editHandler} />
            </div>
        </>
    );
};

export default ProductGridItem;