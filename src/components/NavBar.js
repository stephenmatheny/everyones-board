import React from "react";
import logo from "../logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("logo").style.height = "75px";
    // document.getElementById("logo").style.fontSize = "25px";
  } else {
    document.getElementById("logo").style.height = "100px";
    // document.getElementById("logo").style.fontSize = "35px";
  }
}

const nav_config = [
	{
		path: "/", 
		label: "Home"
	}, 
	{
		path: "/games", 
		label: "Games"
	}, 
	{
		path: "/about", 
		label: "About"
	}
]

const NavBar = () => {
	return (
		<nav id="nav-bar">
			<Link to="/"><img src={logo} alt="logo" id="logo" className="navLogo"></img></Link>
			<ul>
				{nav_config.map((nav_item) => (
					<li>
						<NavLink to={nav_item.path} className="nav-link">{nav_item.label}</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default NavBar;