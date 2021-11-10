import React from "react";
import './Tiles.css'

export default function Tiles({arr}){
    return (
        <div className='Row'>
        {arr.map(element => {
            if (element == 2) {
                return(
                    <div className='Tile'>{element < 1 ? '': element}</div>
                )
                } else {
                    return(
                    <div className='Tile'>{element < 1 ? '': element}</div>
                    )
                }
        })}
        </div>
    );
}