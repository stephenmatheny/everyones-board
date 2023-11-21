import React from "react";
import logo from "../logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

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
		<nav>
			<Link to="/"><img src={logo} alt="logo" className="navLogo"></img></Link>
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