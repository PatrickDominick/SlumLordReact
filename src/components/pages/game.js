import React, { Component } from 'react'

import loading from '../../../static/assets/loading.gif'
import cat from "../../components/images/cat.jpg"
import dog from "../../components/images/dog.png"
import coin from "../../components/images/coin.jpg"
import flower from "../../components/images/flower.png"
import bee from "../../components/images/bee.png"
import generateBoard from '../../scripts/generateBoard'
import readBoard from "../../scripts/readBoard";

const tokens = ["Cat", "Dog", "Flower", "Bee", "Coin"];

export default class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			boardData: generateBoard(props.user).board,
			rentDue: 15,
			spinsLeft: 5,
			tokensList: this.calculateTokensList(),
			selectedToken: false,
			selectedTokenKey: null,
			selectedTokenName: "",
			loading: false,
			error: ""
		};

		this.handleTokenSelect = this.handleTokenSelect.bind(this);
		this.handleSpin = this.handleSpin.bind(this);
	}

	handleTokenSelect(event) {
		this.setState({
			selectedTokenName: event.target.parentElement.attributes.name.value,
			selectedToken: true,
			selectedTokenKey: event.target.parentElement.attributes.value.value
		});
	}

	handleSpin() {
		this.setState({ loading: true });

		fetch("http://127.0.0.1:5000/token/add", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				name: this.state.selectedTokenName,
				user_id: this.props.user.id
			})
		})
			.then((response) => response.json())
			.then((data) => {
				const boardData = generateBoard(data);

				fetch(`http://127.0.0.1:5000/user/update/${data.id}`, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						money: data.money + boardData.earnings,
						existing_game: true
					})
				})
					.then((response) => response.json())
					.then((data) => {
						if (this.state.spinsLeft === 0) {
							if (data.money >= this.state.rentDue) {
								data.money -= this.state.rentDue;
								this.setState({
									spinsLeft: 5,
									rentDue: this.state.rentDue + 25,
                                    boardData: boardData.board,
                                    tokensList: this.calculateTokensList(),
                                    selectedToken: false,
                                    selectedTokenKey: null,
                                    selectedTokenName: "",
                                    loading: false
								});
							} else {
								this.props.history.push("/gameover");
							}
						} else {
							this.setState({
								spinsLeft: this.state.spinsLeft - 1
							});
						}

						this.props.handleSetUser(data);
					})
					.catch((error) => {
						console.log("Error updating user: ", error);
						this.setState({
							loading: false,
							error: "An error occurred... try again later"
						});
					});
			})
			.catch((error) => {
				console.log("Error updating token: ", error);
				this.setState({
					loading: false,
					error: "An error occurred... try again later"
				});
			});
	}

	calculateTokensList() {
		const randomTokens = [];

		for (let i = 0; i < 3; i++) {
			randomTokens.push(
				tokens[Math.floor(Math.random() * tokens.length)]
			);
		}

		return randomTokens;
	}

    renderSquare(square) {
        switch(square){
            case "Coin": return <img src={coin} />
            case "Cat": return <img src={cat} />
            case "Dog": return <img src={dog} />
            case "Bee": return <img src={bee} />
            case "Flower": return <img src={flower} />
            default: return <div />

        }
    }

	render() {
		return (
			<div className="game-wrapper">
				<div className="game-display-wrapper">
					<div className="grid-wrapper">
						{this.state.boardData.map((square, index) => (
							<div className="square" key={index}>
								{this.renderSquare(square)}
							</div>
						))}
					</div>

					<div className="display-wrapper">
						<h3>Slum Landlord</h3>
						<div className="tokens-wrapper">
							{this.state.tokensList.map((token, index) => (
								<div
                                    name={token}
									value={index}
									key={index}
									className={`token ${
										this.state.selectedTokenKey == index
											? "active"
											: "inactive"
									}`}
									onClick={this.handleTokenSelect}
								>
									{this.renderSquare(token)}
								</div>
							))}
						</div>
						<p>${this.props.user.money}</p>
						<p>Rent Due: {this.state.rentDue}</p>
						<p>Spins until rent: {this.state.spinsLeft}</p>
						<button
							disabled={!this.state.selectedToken}
							onClick={this.handleSpin}
						>
							Spin
						</button>
						{this.state.loading ? (
							<img src={loading} />
						) : (
							<div className="spacer" />
						)}
						<p>{this.state.error}</p>
					</div>
				</div>

				<button onClick={() => this.props.history.push("/rules")}>
					Rules
				</button>
			</div>
		);
	}
}