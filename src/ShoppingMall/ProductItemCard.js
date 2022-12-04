import React, { useState, useEffect } from 'react';
import './style/ProductItemCard.css';
import DisplayArea from './DisplayArea';

const ProductItemCard = ({ canvasId, product, pageActual, onClick }) => {

    const handleClick = () => {
        onClick(product)
    }

    return (
        <div id='product-item' onClick={handleClick} >
            <div id="img-body">
                <DisplayArea product={product} canvasId={"canvas"+canvasId} sourceId={"source"+canvasId}/>
            </div>
            <span>{product.name}</span>
        </div>
    );
};
export default ProductItemCard;
