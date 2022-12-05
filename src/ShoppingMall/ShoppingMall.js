import React, { useState } from 'react';
import ProductItemCard from './ProductItemCard';
import './style/ShoppingMall.css';
import ShowMore from 'react-show-more-list';
import { useNavigate } from "react-router-dom";

const ShoppingMall = () => {

    let navigate = useNavigate();
    
    const products = [
        [
            { id: 0, name: "Antique dresser blue", assetPath: "Assets/Meubles/antique_dresser_blue.glb" },
            { id: 1, name: "Antique dresser green", assetPath: "Assets/Meubles/antique_green_v3.glb" },
            { id: 2, name: "Antique wardrobe", assetPath: "Assets/Meubles/antique_wardrobe.glb" },
        ],
        [
            { id: 3, name: "Bedside table", assetPath: "Assets/Meubles/bedside_table_2.glb" },
            { id: 4, name: "Antique desk", assetPath: "Assets/Meubles/antique_desk.glb" },
            { id: 5, name: "Old Table", assetPath: "Assets/Meubles/old_table.glb" },
        ],
        [
            { id: 6, name: "Table", assetPath: "Assets/Meubles/table.glb" },
            { id: 7, name: "Wooden center table", assetPath: "Assets/Meubles/wooden_center_table.glb" },
            { id: 8, name: "Victorian desk", assetPath: "Assets/Meubles/victorian_desk_with_props.glb" },
        ],
        [
            { id: 9, name: "Small table", assetPath: "Assets/Meubles/small_table.glb" },
            { id: 10, name: "Chesterfield sofa", assetPath: "Assets/Meubles/chesterfield-sofa.glb" },
            { id: 11, name: "Mercury chair", assetPath: "Assets/Meubles/mercury_chair_regency_period.glb" },
        ],
        [
            { id: 12, name: "Grand classic Edwardian Dining Armchair", assetPath: "Assets/Meubles/edwardian_chair_v3.glb" },
            { id: 13, name: "Victorian Chair", assetPath: "Assets/Meubles/victorian_chair_v2.glb" },
            { id: 14, name: "Couch", assetPath: "Assets/Meubles/couch.glb" },
        ],
        [
            { id: 15, name: "Old gramophone", assetPath: "Assets/Meubles/old_gramophone.glb" },
            { id: 16, name: "Vintage gramophone", assetPath: "Assets/Meubles/vintage_gramophone.glb" },
            { id: 17, name: "Rocking horse with wheels", assetPath: "Assets/Meubles/rocking_horse_with_wheels.glb" },
        ],
        [
            { id: 18, name: "Standing bird cage", assetPath: "Assets/Meubles/standing_bird_cage.glb" },
        ],
    ];
  

    const changeSelectedProduct = (product) => {
        console.log(product)
        navigate('/products', { state: { id: product.id } })
    };


    return (
        <div id="ShoppingMall">
            <div id="list-title">
                <p>Our Products</p>
            </div>

            <ShowMore
                id="AllList"
                items={products}
                by={2}
            >
                {({
                    current,
                    onMore,
                }) => (
                    <div id="list-products-body">
                        <React.Fragment>
                            {current.map((row, i) => {
                                return <div key={i} className='listRow'>
                                    {row.map(item => {
                                        return <ProductItemCard key={item.id} canvasId={item.id} product={item} onClick={changeSelectedProduct} />
                                    })}
                                </div>
                            })}
                        </React.Fragment>
                        {!onMore ? null :
                            <button
                                id="btnShowMore"
                                disabled={!onMore}
                                onClick={() => { if (!!onMore) onMore(); }}
                            >
                                ... Show More ...
                            </button>}

                    </div>
                )}
            </ShowMore>
        </div>

    );

}
export default ShoppingMall;
