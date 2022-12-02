import React, { useState } from 'react';
import './style/ProductItemCard.css';
import * as THREE from 'three';
import DisplayArea from './DisplayArea';

class ProductItemCard extends React.Component {
  
    handleClick() {
        this.props.onClick(this.props.product)
    }


    render() {
        return (
            <div id='product-item' onClick={() => { this.handleClick() }}>
                <div id="img-body">
                   <DisplayArea product={this.props.product} />
                </div>
                <span>{this.props.product.name}</span>
            </div>
        );
    }
};
export default ProductItemCard;
