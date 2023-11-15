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

const ProductGridItem: React.FC<ProductProps> = ({ product, onDelete }) => {
    const deleteHandler = () => {
        // Disable buttons during the delete operation and clear out the response message
        setDeleteInProgress(true);
        setDeleteMessage('');
        const productId = product.id;
        deleteProduct(productId)
            .then(() => {
                setDeleteMessage('Item successfully deleted');
            })
            .catch(error => {
                setDeleteMessage(error.message);
            }).finally(() => {
                setTimeout(() => {
                    setDeleteInProgress(false);
                    setDeleteMessage('');
                    onDelete(productId);
                }, 2000);
            });
    };

    const [deleteInProgress, setDeleteInProgress] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                {deleteInProgress && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                        {deleteMessage ? (
                            <div className={`bg-white p-4 rounded-md ${deleteMessage.includes('success') ? 'border-green-500' : 'border-red-500'} border`}>
                                {deleteMessage}
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
                            disabled={deleteInProgress}
                            onClick={() => setIsModalOpen(true)}
                            className={`bg-green-500 text-white px-4 py-2 rounded-md mr-2 ${deleteInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <span className="ml-2">Edit</span>
                        </button>
                        <button
                            onClick={deleteHandler}
                            disabled={deleteInProgress}
                            className={`bg-red-700 text-white px-4 py-2 rounded-md ${deleteInProgress ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-900'}`}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                            <span className="ml-2">Delete</span>
                        </button>
                    </div>
                </div>
                <ProductModal mode="edit" itemId={product.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </>
    );
};

export default ProductGridItem;