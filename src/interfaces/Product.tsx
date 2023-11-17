export interface ProductProps {
    product : {
        id: number;
        name: string;
        price: number;
        description: string;
        img_url: string;
    }, 
    onDelete: (productId: number) => void;
    onUpdate: (updatedProductData: ProductProps['product']) => void;
};