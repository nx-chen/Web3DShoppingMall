import React from 'react';
import './style/ProductItemCard.css';
import DisplayArea from './DisplayArea';

const ProductItemCard = ({ canvasId, product, pageActual, onClick }) => {

    const handleClick = () => {
        onClick(product)
    }

    return (
        <div id='product-item' onClick={handleClick} >
            <div id="img-body">
                <DisplayArea product={product} canvasId={"canvas" + canvasId} sourceId={"source" + canvasId} />
            </div>

            <div id="name-body">
                <p>----- <span>{product.name}</span>-----</p>
            </div>

        </div>
    );
};
export default ProductItemCard;
