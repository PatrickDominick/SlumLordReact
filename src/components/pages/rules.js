import React from 'react'
import Cookies from 'js-cookie';

import resetGame from "../../scripts/resetGame"

export default function rules(props) {
    if (!Cookies.get("username")) {
        props.history.push("/")
    }

    const handleNewGame = async() => {
        const resetData = await resetGame(props.user.id)

        if(resetData.error) {
            props.handleSetError(resetData.error)
        }
        else {
            props.handleSetUser(resetData)
            props.history.push("/game")
        }
    }
    
    return (
        <div className="rules-wrapper">
            <h3>Rules of Slum Landlord</h3>
            <p>Pay your rent on time! <br /> Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Omnis ex cupiditate placeat voluptatum ullam aperiam asperiores. Ad perferendis atque voluptatibus totam? 
            Ad autem qui sapiente eligendi! Dolore aspernatur culpa voluptas.</p>
            <div className="buttons-wrapper">
                <button onClick={() => props.history.push("/game")}>{props.user.existing_game ? "Continue Game!" : "Play!"}</button>
                {props.user.existing_game ? <button onClick={handleNewGame}>New Game</button> : null}

            </div>
        </div>
    )
}