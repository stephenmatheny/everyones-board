import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Games from './pages/Games';
import About from './pages/About';
import NavBar from './components/NavBar';
import NoMatch from './pages/NoMatch';
import Footer from './components/Footer';

function App() {
  return (
	<>
		<NavBar />
		<main id="container">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/games" element={<Games />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</main>
		<Footer />
	</>
  );
}

export default App;
