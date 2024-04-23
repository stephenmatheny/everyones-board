import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import Games from './pages/Games/Games';
import About from './pages/About/About';
import NavBar from './components/NavBar/NavBar';
import NoMatch from './pages/NoMatch/NoMatch';
import Footer from './components/Footer/Footer';

const routes = [
	{
		path: "/",
		element: <Home />
	},
	{
		path: "/games",
		element: <Games />
	},
	{
		path: "/about",
		element: <About />
	},
	{
		path: "*",
		element: <NoMatch />
	}
];

const App = () => {
  return (
	<>
		<NavBar />
		<main class="main-container">
			<Routes>
				{routes.map((route) => (
						<Route path={route.path} element={route.element} />
				))}
        <Route path="/games/:id" element={<Game />} />
			</Routes>
		</main>
		<Footer />
	</>
  );
}

export default App;
