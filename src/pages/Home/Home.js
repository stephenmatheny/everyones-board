import "./Home.css";
import logoDarkMode from "../../logo-dark-mode.svg";
import { useState, useEffect } from "react";

const Home = () => {
	const [data, setData] = useState(null);

	function handleClick() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.geekdo.com/xmlapi/boardgame/1');
		xhr.onload = function() {
		if (xhr.status === 200) {
			setData(JSON.parse(xhr.responseText));
		}
		};
		xhr.send();
	}
    return (
        <div class="home-div">
            {/* Home */}
            {/* <img src={logoDarkMode} alt="dark-mode-logo" class="home-logo"></img> */}
            
            {/* <button onClick={handleClick}>Get Data</button> */}
			HOME PAGE TEST
        </div>
    )
}

export default Home;