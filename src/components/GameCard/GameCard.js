import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./GameCard.css";

const GameCard = ({ game }) => {
	// Capitalize first letter of each type && join list
	game.types = game.types.map((type) => (
		type.charAt(0).toUpperCase() + type.substring(1)
	));
	let typeList = game.types.join(", ");
	game.mechanics = game.mechanics.map((mechanic) => (
		mechanic.charAt(0).toUpperCase() + mechanic.substring(1)
	));
	let mechanicList = game.mechanics.join(", ");

	return (
			<Link to={"/games/" + game.id} id="game-card-container">
				<img src={game.img_src} alt={game.alt_txt}></img>
				<div id="game-info">
					<h3 id="name">{game.title}</h3>
					<p>{game.short_description}</p>
					<p><b>Number of Players:</b> {game.num_players_min}-{game.num_players_max}</p>
					<p><b>Play Time:</b> {game.play_time_min}-{game.play_time_max}</p>
					{<p><b>Game Type:</b> {typeList}</p>}
				</div>
			</Link>
	);
}

export default GameCard;