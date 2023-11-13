import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { ProductProps } from '../../interfaces/Product';

const ProductGridItem: React.FC<ProductProps> = ({ product }) => {
    return (
        <>
            <div className="w-full relative group">
                <div className="max-w-80 max-h-80 rounded-t-lg relative overflow-y-hidden ">
                    <div>
                        <img className="w-full h-full" src={product.img_url} />
                    </div>
                </div>
                <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 border-b-0 px-4">
                    <div className="flex items-center justify-between font-titleFont">
                        <h2 className="text-lg text-primeColor font-bold">
                            {product.name}
                        </h2>
                        <p className="text-[#767676] text-[14px]">${product.price}</p>
                    </div>
                </div>
                <div className="max-w-80 pb-4 flex flex-col border-[1px] border-t-0 border-b-0 px-3">
                    <div className="flex items-center justify-between font-titleFont">
                        <p className="text-sm">
                            {product.description}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center border-[1px] border-t-0 mb-6 pb-3">
                    <button className="flex items-center bg-green-400 hover:bg-green-700 text-white px-4 py-2 rounded mr-2">
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <span className="ml-2">Edit</span>
                    </button>
                    <button className="flex items-center bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded">
                        <FontAwesomeIcon icon={faTrashCan} />
                        <span className="ml-2">Delete</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductGridItem;