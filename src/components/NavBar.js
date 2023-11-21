import React from "react";
import logo from "../logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
	return (
		<nav>
			<Link to="/"><img src={logo} alt="logo" className="navLogo"></img></Link>
			<ul>
				<li>
					<NavLink to="/games" className="nav-link">Games</NavLink>
				</li>
				<li>
					<NavLink to="/about" className="nav-link">About</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;