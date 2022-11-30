import React, { useState } from 'react';
import './ProductItemCard.css';

class ProductItemCard extends React.Component {

    handleClick(){
        this.props.onClick(this.props.product)
    }


    render() {
        return (
            <div id='product-item' onClick={ ()  => {this.handleClick()}}>
                <div id="img-body">
                    <img id="img-item" src={this.props.product.imagePath} alt="img item"></img>
                </div>
                <span>{this.props.product.name}</span>
            </div>
        );
    }
};
export default ProductItemCard;
