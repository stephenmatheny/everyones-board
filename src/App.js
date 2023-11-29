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
]

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

 // Note: the empty deps array [] means
    // this useEffect will run once
    // const App = () => {
    //     const [error, setError] = useState(null);
    //     const [isLoaded, setIsLoaded] = useState(false);
    //     const [items, setItems] = useState([]);

    //     useEffect(() => {
    //         fetch("https://restcountries.eu/rest/v2/all")
    //             .then((res) => res.json())
    //             .then(
    //                 (result) => {
    //                     setIsLoaded(true);
    //                     setItems(result);
    //                 },
    //                 // Note: it's important to handle errors here
    //                 // instead of a catch() block so that we don't swallow
    //                 // exceptions from actual bugs in components.
    //                 (error) => {
    //                     setIsLoaded(true);
    //                     setError(error);
    //                 }
    //             );
    //     }, []);

    //     if (error) {
    //         return <>{error.message}</>;
    //     } else if (!isLoaded) {
    //         return <>loading...</>;
    //     } else {
    //         return (
    //             /* here we map over the element and display each item as a card  */
    //             <div className="wrapper">
    //                 <ul className="card-grid">
    //                     {items.map((item) => (
    //                         <li>
    //                             <article className="card" key={item.callingCodes}>
    //                                 <div className="card-image">
    //                                     <img src={item.flag} alt={item.name} />
    //                                 </div>
    //                                 <div className="card-content">
    //                                     <h2 className="card-name">{item.name}</h2>
    //                                     <ol className="card-list">
    //                                         <li>
    //                                             population:{" "}
    //                                             <span>{item.population}</span>
    //                                         </li>
    //                                         <li>
    //                                             Region: <span>{item.region}</span>
    //                                         </li>
    //                                         <li>
    //                                             Capital: <span>{item.capital}</span>
    //                                         </li>
    //                                     </ol>
    //                                 </div>
    //                             </article>
    //                         </li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         );
    //     }
    // }

export default App;
