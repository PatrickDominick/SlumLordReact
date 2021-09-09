import React, { Component } from 'react'

import resetGame from "../../scripts/resetGame"

export default class GameOver extends Component {
    componentDidMount() {
        const handleReset = async () =>  {
                const resetData = await resetGame(props.user.id)
        
                if(resetData.error) {
                    props.handleSetError(resetData.error)
                }
                else {
                    this.props.handleSetUser(resetData)
                }
        }
        
        handleReset()
    }
    

    render() {
        return (
            <div className="gameover-wrapper">
                <h3>Game Over</h3>
                <button onClick={() => this.props.history.push("/rules")}>Play Again</button>
            </div>
        )
    }
}