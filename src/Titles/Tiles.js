import React from "react";
import './Tiles.css'

export default function Tiles({arr,xIndex}){
    let color;
    return (
        <div className='Row'>
        {arr.map((element, index) => {
            switch (element) {
                case 0:
                    color = {backgroundColor:'hsl(0, 0%, 95%)'}
                    break;
                case 2:
                    color = {backgroundColor:'rgb(200, 200, 200)'}
                    break;
                case 4:
                    color = {backgroundColor:'rgb(241,196,15)'}
                    break;
                case 8:
                    color = {background:'rgb(243,156,17)'}
                    break;
                case 16:
                    color = {background:'rgb(231,126,35)'}
                    break;
                case 32:
                    color = {background:'rgb(210,84,0)'}
                    break;
                case 64:
                    color = {background:'rgb(232,76,61)'}
                    break;
                case 128:
                    color = {background:'rgb(193,57,43)'}
                    break;
                case 256:
                    color = {background:'rgb(155,88,181)'}
                    break;
                case 512:
                    color = {background:'rgb(143,68,173)'}
                    break;
                case 1024:
                    color = {background:'rgb(53,152,219)'}
                    break;
                case 2048:
                    color = {background:'rgb(42,128,185)'}
                    break;
                default:
                    break;
            }
            return(
                <div className='Tile' style={color} data-x={xIndex} data-y={index}>
                    <p>
                    { element < 1 ? '': element}
                    </p>
                </div>
            )
        })}
        </div>
    );
}