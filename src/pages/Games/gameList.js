const GameList = [
	{
		id: 123,
		base_game_ids: null,
		expansion_ids: [124],
		title: "Twilight Imperium: Fourth Edition",
		img_src: "https://cf.geekdo-images.com/_Ppn5lssO5OaildSE-FgFA__itemrep/img/rJfEVG0xStfVWbevNWfHBo4ZVrQ=/fit-in/246x300/filters:strip_icc()/pic3727516.jpg",
		alt_txt: "alt_txt",
		num_players_min: 3,
		num_players_max: 6,
		play_time_min: 240,
		play_time_max: 480,
		short_description: "Build an intergalactic empire through trade, research, conquest and grand politics.",
		types: ["strategy", "thematic"],
		categories: ["civilization", "Civilization", "Economic", "Exploration", "Negotiation", "Political", "Science Fiction", "Space Exploration", "Wargame"],
		mechanics: ["Action Drafting", "Area-Impulse", "Dice Rolling", "Follow", "Grid Movement", "Hexagon Grid", "Increase Value of Unchosen Resources", "King of the Hill", "Modular Board", "Race", "Tech Trees / Tech Tracks", "Trading", "Variable Phase Order", "Variable Player Powers", "Variable Set-up", "Voting"]
	},
	{
		id: 124,
		base_game_ids: [123],
		expansion_ids: null,
		title: "Twilight Imperium: Prophecy of Kings Expansion",
		img_src: "https://cf.geekdo-images.com/bzRLsXf3O8Mpu5B4TUSf2g__itemrep/img/HSCDhIMrSePifWQgienSEGrwtcI=/fit-in/246x300/filters:strip_icc()/pic5563396.png",
		alt_txt: "alt_txt",
		num_players_min: 3,
		num_players_max: 8,
		play_time_min: 240,
		play_time_max: 480,
		short_description: "Expand the galaxy of Twilight Imperium (4th ed.) with new systems, factions and more!",
		types: ["strategy", "thematic"],
		categories: ["civilization", "Civilization", "Economic", "Exploration", "Negotiation", "Political", "Science Fiction", "Space Exploration", "Wargame"],
		mechanics: ["Action Drafting", "Area-Impulse", "Dice Rolling", "Follow", "Grid Movement", "Hexagon Grid", "Increase Value of Unchosen Resources", "King of the Hill", "Modular Board", "Race", "Tech Trees / Tech Tracks", "Trading", "Variable Phase Order", "Variable Player Powers", "Variable Set-up", "Voting"]
	},
	{
		id: 125,
		base_game_ids: null,
		expansion_ids: null,
		title: "Great Western Trail",
		img_src: "https://cf.geekdo-images.com/gDn7AhrDlmfCLSz9ZqoNFQ__itemrep/img/0FOms0QcPYvwEMWVXsy9p0FjGlM=/fit-in/246x300/filters:strip_icc()/pic5988511.jpg",
		alt_txt: "alt_txt",
		num_players_min: 1,
		num_players_max: 4,
		play_time_min: 75,
		play_time_max: 150,
		short_description: "Wrangle your herd of cows across the Midwest prairie and deliver it to Kansas City.",
		types: ["strategy"],
		categories: ["American West", "Animals", "Economic"],
		mechanics: ["Action Drafting", "Area-Impulse", "Dice Rolling", "Follow", "Grid Movement", "Hexagon Grid", "Increase Value of Unchosen Resources", "King of the Hill", "Modular Board", "Race", "Tech Trees / Tech Tracks", "Trading", "Variable Phase Order", "Variable Player Powers", "Variable Set-up", "Voting"],
		expansion_available: true
	}
];

export default GameList;