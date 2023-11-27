import "./Game.css";
import GameCard from "../../components/GameCard/GameCard";
import GAME_LIST from "../Games/gameList";
import { useMatch } from "react-router-dom";

const Game = () => {
    let path = window.location.pathname;
    let gameId = path.slice(path.lastIndexOf("/") + 1, path.length);
    return (
        <div>
            {GAME_LIST.filter((game) => (
                game.id == gameId
            ))
            .map((game) => (
                <GameCard game={game} />
            ))}
        </div>
    )
}

export default Game;