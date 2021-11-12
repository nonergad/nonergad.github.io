import React from "react";
import './GameOverScr.css'

export default function StartGameScr({func}){
    return (
        <div className='StartScr'>
            <div className='StartMenu'>
                2048 GAME
                <div className='StartButton' onClick={func}>Start ►</div>
            </div>
        </div>
    );
}