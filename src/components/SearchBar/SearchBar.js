import "./SearchBar.css";
import { IoSearchSharp } from "react-icons/io5";


const SearchBar = () => {
	return (
		<div class="search-main">
			<div className="search-text">
				Search Bar
			</div>
			<div>
				<IoSearchSharp />
			</div>
		</div>
	)
}

export default SearchBar;