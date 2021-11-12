import React from "react";
import './GameOverScr.css'

export default function GameWinScr({func}){
    return (
        <div className='GameOverScr'>
            <div className='GameOverMenu'>
                You Won!
                <button onClick={func}>Restart</button>
            </div>
        </div>
    );
}