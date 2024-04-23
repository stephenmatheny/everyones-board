const listFromArray = (games) => {
	// Capitalize first letter of each type && join list
	game.types = game.types.map((type) => (
		type.charAt(0).toUpperCase() + type.substring(1)
	));
	let typeList = game.types.join(", ");
	game.mechanics = game.mechanics.map((mechanic) => (
		mechanic.charAt(0).toUpperCase() + mechanic.substring(1)
	));
	let mechanicList = game.mechanics.join(", ");
}

export default listFromArray;