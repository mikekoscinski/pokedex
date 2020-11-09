const axios = require('axios');
const cheerio = require('cheerio');

const pokemonNames = [
	"Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran-f", "Nidorina", "Nidoqueen", "Nidoran-m", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr-Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-oh", "Celebi", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys",
];
const urlsToScrape = [];
const pokemonURLPairsToScrape = [];
// Master array containing all pokemon/move permutations. TODO: print as cli-table
const parentPokemonMoveTable = [];

function generateURLsForScraper () {
	pokemonNames.forEach(pokemon => {
		const newURL = `https://pokemondb.net/pokedex/${pokemon}/moves/3`;
		urlsToScrape.push(newURL);
	});
};

function createPokemonURLPairs () {
	pokemonNames.forEach(pokemon => {
		const newPokemonToScrape = { 
			name: pokemon,
			url: urlsToScrape.find(url => url.includes(pokemon)),
		}
		pokemonURLPairsToScrape.push(newPokemonToScrape);
	});	
}

function prepareScraper() {
	generateURLsForScraper();
	createPokemonURLPairs();
}

function getPokemonMoves (pokemon) {
	axios.get(pokemon.url)
		.then(function (response) {
			// This entire local scope handles success of HTTP GET request to *individual* URL
			const $ = cheerio.load(response.data);
			const pokemonsMoves = [];
			// Select move panel for emerald version
			const emeraldMovesTab = $('div .tabs-panel').next().next().children().children();
			// Select the move table children from the move panel
			const levelUpMovesTable = emeraldMovesTab.children().first().next().next().children().children().last();
			const eggMovesTable = emeraldMovesTab.children().first().next().next().next().next().next().children().children().last();
			const moveTutorMovesTable = emeraldMovesTab.children().first().next().next().next().next().next().next().next().next().children().children().last();
			const preEvolutionMovesTable = emeraldMovesTab.children().first().next().next().next().next().next().next().next().next().next().next().next().children().children().last();
			const hmMovesTable = emeraldMovesTab.next().children().first().next().next().children().children().last();
			const tmMovesTable = emeraldMovesTab.next().children().first().next().next().next().next().next().children().children().last();
			
			// Consolidate move tables to iterate the grabMoves() function over using forEach
			const childPokemonMoveTables = [
				{ move_source: levelUpMovesTable, method_obtained: 'Level up' },
				{ move_source: eggMovesTable, method_obtained: 'Egg' },
				{ move_source: moveTutorMovesTable, method_obtained: 'Move Tutor' },
				{ move_source: preEvolutionMovesTable, method_obtained: 'Pre-evolution' },
				{ move_source: hmMovesTable, method_obtained: 'HM' },
				{ move_source: tmMovesTable, method_obtained: 'TM' },
			];
			
			function grabMovesFromChildTable (table) {				
				$(table.move_source).children().each(function (index, element) {
					let move_id = $(this).children().first().text();
					let level_obtained = '—'
					if (table.method_obtained === 'Level up') {
						move_id = $(this).children().first().next().text();
						level_obtained = parseInt($(this).children().first().text());
					}
					if (table.method_obtained === 'HM' || table.method_obtained === 'TM') {
						move_id = $(this).children().first().next().text();
					}
					const newChildPokemonMovePermutationToAdd = {
						pokemon_name: pokemon.name,
						move_id: move_id,
						method_obtained: table.method_obtained,
						level_obtained: level_obtained,
					};
					parentPokemonMoveTable.push(newChildPokemonMovePermutationToAdd);
				});
			}
			// For each table, grab its moves and push to master pokemon/move table
			childPokemonMoveTables.forEach(table => grabMovesFromChildTable(table));
		})
		.catch(function (error) {
			// handle error
			console.error(error);
		})
		.then(function () {
			// 
		}
	);
}

// TODO: Need to add async/await to console.log pokemonMovePairs only after the scraper has grabbed all moves
function runScraper () {
	pokemonURLPairsToScrape.forEach(pokemon => getPokemonMoves(pokemon));
	
}

// const nidokingTestObject = {
// 	name: 'Nidoking',
// 	url: 'https://pokemondb.net/pokedex/nidoking/moves/3',
// }

prepareScraper();
// runScraper(nidokingTestObject);
runScraper();
console.log(parentPokemonMoveTable.length);
