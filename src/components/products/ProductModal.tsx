import React, { useState, useEffect } from "react";
import { ProductProps } from "../../interfaces/Product";

interface ModalProps {
    mode: string;
    isOpen: boolean;
    onClose: () => void;
    itemId: number | null,
    // Add any other props needed for editing
}

const updateProduct = async (productId: number, data: any) => {
    console.log('Data to send:', data);
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

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, mode, itemId }) => {
    if (!isOpen) {
        return null;
    }

    const [product, setProduct] = useState<ProductProps['product']>();
    const [fetchMessage, setFetchMessage] = useState('');
    const [editFormData, setEditFormData] = useState({
        name: '',
        price: 0,
        description: '',
        img_url: ''
    });

    if (itemId) {
        const apiUrl = `/api-items/${itemId}`;
        useEffect(() => {
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        setFetchMessage('A network error occured');
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((response) => {
                    const { message, data } = response;
                    if (data) {
                        setProduct(data);
                        setEditFormData({
                            name: data.name,
                            price: Number(data.price),
                            description: data.description,
                            img_url: data.img_url
                        });
                    } else {
                        console.error('API Error:', message);
                        setFetchMessage('Something went wrong while loading the data');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setFetchMessage('Something went wrong while loading the data');
                })
                .finally(() => {
                    console.log('End of transmission');
                });
        }, []);
    }

    const [editFormError, setEditFormError] = useState('');
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const editSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        // Stop the page from reloading
        e.preventDefault();
        try {
            updateProduct(Number(itemId), editFormData)
            .then(() => {
                setEditFormError('Item successfully updated');
                onClose();
                // TODO: Emit message to update product display
            })
            .catch(error => {
                setEditFormError(error.message);
            });

        } catch (exception) {
            console.log(exception);
            setEditFormError('An error occured. Cannot update at this time');
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-md">
                    {!product && fetchMessage.length !== 0 &&
                        <div className="p-10">
                            <h2 className="text-2xl font-bold mb-4">{fetchMessage}</h2>
                            <button
                                className='bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-900'
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    }
                    {product &&
                        <div className="p-10">
                            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                            <form onSubmit={editSubmitHandler}>
                                <div className="relative mb-2">
                                    <label
                                        className="absolute top-3 left-1 transform -translate-y-full text-xs text-black-500"
                                        style={{ transformOrigin: 'top left' }}
                                    >Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        defaultValue={editFormData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded-md w-full" />
                                </div>

                                <div className="relative mb-2">
                                    <label
                                        className="absolute top-3 left-1 transform -translate-y-full text-xs text-black-500"
                                        style={{ transformOrigin: 'top left' }}
                                    >Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={editFormData.price}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded-md w-full" />
                                </div>

                                <div className="relative mb-2">
                                    <label
                                        className="absolute top-3 left-1 transform -translate-y-full text-xs text-black-500"
                                        style={{ transformOrigin: 'top left' }}
                                    >Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        defaultValue={editFormData.description}
                                        className="mt-1 p-2 border rounded-md w-full"/>
                                </div>
                                <div className="relative mb-2">
                                    <label
                                        className="absolute top-3 left-1 transform -translate-y-full text-xs text-black-500"
                                        style={{ transformOrigin: 'top left' }}
                                    >Image URL
                                    </label>
                                    <input
                                        type="text"
                                        id="img_url"
                                        name="img_url"
                                        placeholder="Image URL"
                                        defaultValue={editFormData.img_url}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 border rounded-md w-full" />
                                </div>

                                <div className="space-x-2">
                                    <button className={`bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-700'}`}
                                    >
                                        <span className="ml-2">Save</span>
                                    </button>
                                    <button onClick={onClose} className={`bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-900'}`}
                                    >
                                        <span className="ml-2">Cancel</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default ProductModal;