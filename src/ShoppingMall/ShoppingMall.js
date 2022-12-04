import React, { Component, useEffect, useState } from 'react';
import ProductItemCard from './ProductItemCard';
import DisplayArea from './DisplayArea';
import './style/ShoppingMall.css';

const ShoppingMall = () => {

    const products = [


        //armoires
        { name: "Antique dresser blue", assetPath: "Assets/Meubles/antique_dresser_blue.glb" },
        { name: "Antique dresser green", assetPath: "Assets/Meubles/antique_green_v3.glb" },
        { name: "Antique wardrobe", assetPath: "Assets/Meubles/antique_wardrobe.glb" },
        { name: "Bedside table", assetPath: "Assets/Meubles/bedside_table_2.glb" },
        //tables
        { name: "Antique desk", assetPath: "Assets/Meubles/antique_desk.glb" },
        { name: "Old Table", assetPath: "Assets/Meubles/old_table.glb" },
        { name: "Victorian desk", assetPath: "Assets/Meubles/victorian_desk_with_props.glb" },
        //sofas chaises
        { name: "Chesterfield sofa", assetPath: "Assets/Meubles/chesterfield-sofa.glb" },
        { name: "Grand classic Edwardian Dining Armchair", assetPath: "Assets/Meubles/edwardian_chair_v3.glb" },
        { name: "Victorian Chair", assetPath: "Assets/Meubles/victorian_chair_v2.glb" },
        { name: "Couch", assetPath: "Assets/Meubles/couch.glb" },
        //autres
        { name: "Old gramophone", assetPath: "Assets/Meubles/old_gramophone.glb" },
        { name: "Vintage gramophone", assetPath: "Assets/Meubles/vintage_gramophone.glb" },
        { name: "Retro piano", assetPath: "Assets/Meubles/retro-piano.glb" },
        { name: "Rocking horse with wheels", assetPath: "Assets/Meubles/rocking_horse_with_wheels.glb" },
        { name: "Standing bird cage", assetPath: "Assets/Meubles/standing_bird_cage.glb" },

    ];

    const [productSelected, setProductSelected] = useState(products[0]);
    const [pageActual, setPageActual] = useState(0);
    const [pageMax, setPageMax] = useState(0);


    useEffect(() => {
        console.log("we are at page:", pageActual);
    }, [pageActual])

    useEffect(() => {
        let temp = parseInt(products.length / 3) - 1;
        setPageMax(products.length % 3 === 0 ? temp : temp + 1);
        console.log("coucou");
    }, [])

    const changeSelectedProduct = (product) => {
        console.log(product)
        setProductSelected(product)

    };

    function PreviousPage() {
        let previousPage = pageActual - 1;
        setPageActual(previousPage < 0 ? pageMax : previousPage);
        console.log(previousPage);
    };

    function NextPage() {
        let nextPage = pageActual + 1;
        setPageActual(nextPage > pageMax ? 0 : nextPage);
    };


    return (
        <div id="ShoppingMall">
            <div id="list-products">
                <div id="list-title">
                    <p>Our Products</p>
                </div>
                <div id="list-products-body">
                    {products.map((prod, i) => {
                        return parseInt(i / 3) === pageActual ?
                            <ProductItemCard key={i} canvasId={i} product={prod} pageActual={pageActual} onClick={changeSelectedProduct} />
                            : null

                    })
                    }
                </div>
                <button id="btnNextPage" onClick={NextPage} className="btnPagination">
                    <img src='Assets/Images/fleche-right.png' alt='Assets/Images/fleche-right.png' />
                </button>

                <button id="btnPreviousPage" onClick={PreviousPage} className="btnPagination">
                    <img src='Assets/Images/fleche-left.png' alt='Assets/Images/fleche-left.png' />
                </button>
            </div>

        </div>
    );
}
export default ShoppingMall;
/*
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
                            <ProductItemCard key={i} canvasId={i} product={prod} onClick = {this.changeSelectedProduct}/>
                        ))}
                    </div>
                </div>
                <div id="list-scenes" className={this.state.isFullScreen ? "fullscreen" : null}>
                    <div id="list-title">
                        <p>Change scene</p>
                    </div>

                </div>
                
            </div>
        );
    }
}

export default ShoppingMall;

*/