import GameCard from "../../components/GameCard/GameCard";
import "./Games.css";
import GAME_LIST from "./gameList";

const Games = () => {
	return (
		<div id="game">
			{GAME_LIST
				// .filter((game) => (
				// 	game.base_game_ids === null
				// ))
				.map((game) => (
					<GameCard game={game} />
			))}
		</div>
	)
}

export default Games;