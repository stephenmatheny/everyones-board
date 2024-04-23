import "./Game.css";
import GameCard from "../../components/GameCard/GameCard";
import GAME_LIST from "../Games/gameList";
import ImageGallery from "react-image-grid-gallery";
import IMAGE_GALLERY_EXAMPLE from "../Games/imageGalleryEx";
import { useMatch } from "react-router-dom";

const Game = () => {
	let path = window.location.pathname;
	let gameId = path.slice(path.lastIndexOf("/") + 1, path.length);
	// Capitalize first letter of each type && join list
	let game = GAME_LIST.filter((game) => (game.id == gameId))[0];
	game.types = game.types.map((type) => (
		type.charAt(0).toUpperCase() + type.substring(1)
	));
	let typeList = game.types.join(", ");
	game.mechanics = game.mechanics.map((mechanic) => (
		mechanic.charAt(0).toUpperCase() + mechanic.substring(1)
	));
	let mechanicList = game.mechanics.join(", ");
	
	return (
		<div>
			<div id="game-main">
				<div id="game-top">
					<div id="game-top-img">
						<img src={game.img_src} alt={game.alt_txt} id="main-img"></img>
					</div>
					<div id="game-info">
						<h1 id="name">{game.title}</h1>
						<p>{game.short_description}</p>
						<p><b>Number of Players:</b> {game.num_players_min}-{game.num_players_max}</p>
						<p><b>Play Time:</b> {game.play_time_min}-{game.play_time_max}</p>
						<p><b>Number of Players:</b> {game.num_players_min}-{game.num_players_max}</p>
						<p><b>Play Time:</b> {game.play_time_min}-{game.play_time_max}</p>
						{<p><b>Game Type:</b> {typeList}</p>}
						{<p><b>Mechanics:</b> {mechanicList}</p>}
					</div>
				</div>
				<div id="more-info">
					<h3>Description:</h3>
					{game.description ? <div dangerouslySetInnerHTML={{__html: game.description}}></div> : "n/a"}
				</div>
				{/* <ImageGallery imgArray={IMAGE_GALLERY_EXAMPLE} columnWidth={340} gapSize={50}/> */}
			</div>
		</div>
	)
}

export default Game;