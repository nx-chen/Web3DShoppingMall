import React, { Component } from 'react';
import ProductItemCard from './ProductItemCard';
import ShoppingAreaTest from './ShoppingAreaTest';
import './ShoppingMall.css';

class ShoppingMall extends Component {

    state = {
        isFullScreen: false,
        scenes: [
            { name: "Scene 1", assetPath: "Assets/Scenes/" },
            { name: "Scene 2", assetPath: "Assets/Scenes/" },
            { name: "Scene 3", assetPath: "Assets/Scenes/" },
        ],
        products: [
            { name: "Antique dresser blue", assetPath: "Assets/Meubles/antique_dresser_blue.glb", imagePath: "Assets/Meubles/antique_dresser_blue.png" },
            { name: "Antique dresser green", assetPath: "Assets/Meubles/antique_dresser_green.glb", imagePath: "Assets/Meubles/antique_dresser_green.png" },
            { name: "Grand classic Edwardian Dining Armchair", assetPath: "Assets/Meubles/grand_classic_edwardian_dining_armchair.glb", imagePath: "Assets/Meubles/grand_classic_edwardian_dining_armchair.png" },
            { name: "Victorian Chair", assetPath: "Assets/Meubles/victorian_chair.glb", imagePath: "Assets/Meubles/victorian_chair.png" },

            { name: "victorian desk", assetPath: "Assets/Meubles/victorian_desk_with_props.glb", imagePath: "Assets/Meubles/victorian_desk_with_props.png" },
        ],
        productSelected: null,
        sceneSelected:  null,
    };

    componentDidMount() {
        //when user scroll, switch full screen or not
        window.addEventListener('mousewheel', (e) => {
            if (e.deltaY > 0) {
                this.setState({
                    isFullScreen: true,
                })
            } else {
                this.setState({
                    isFullScreen: false,
                })
            }
        });
        this.setState({
            productSelected: this.state.products[0],
            sceneSelected:this.state.scenes[0]
        })
    }

    changeSelectedProduct = (product) => {
        console.log(product)
        this.setState({
            productSelected: product
        });
      };

      changeSelectedScene = (scene) => {
        console.log(scene)
        this.setState({
            sceneSelected: scene
        });
      };

    render() {
        return (
            <div id="ShoppingMall">
                <div id="list-products" className={this.state.isFullScreen ? "fullscreen" : null}>
                    <div id="list-title">
                        <p>Our Products</p>
                    </div>
                    <div id="list-products-body">
                        {this.state.products.map((prod, i) => (
                            <ProductItemCard key={i} product={prod} onClick = {this.changeSelectedProduct}/>
                        ))}
                    </div>
                </div>
                <div id="list-scenes" className={this.state.isFullScreen ? "fullscreen" : null}>
                    <div id="list-title">
                        <p>Change scene</p>
                    </div>

                </div>
                <ShoppingAreaTest productSrc={this.state.productSelected ? this.state.productSelected.assetPath :"Assets/Meubles/antique_dresser_blue.glb"}/>
            </div>
        );
    }
}

export default ShoppingMall;

