import React, { useState, useEffect } from 'react';
import './style/ProductItemCard.css';
import * as THREE from 'three';
import DisplayArea from './DisplayArea';
import ClipLoader from "react-spinners/ClipLoader";

const ProductItemCard = ({ canvasId, product, pageActual, onClick }) => {

    //const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => {
        onClick(product)
    }

    const ChangeStatus = () => {
        console.log("***************");
        //setIsLoading(false);
    }

    return (
        <div id='product-item' onClick={handleClick} >
            <div id="img-body">
                <DisplayArea product={product} changeStatus={ChangeStatus} />
            </div>
            <span>{product.name}</span>
        </div>
    );
};
export default ProductItemCard;
