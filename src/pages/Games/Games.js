import GameCard from "../../components/GameCard/GameCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Games.css";
import GAME_LIST from "./gameList";

const Games = () => {
	return (
		<div class="games">
			<SearchBar />
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