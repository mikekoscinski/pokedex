// TODO: Save all move responses and turn them into a cli-table

const axios = require('axios');
const cheerio = require('cheerio');

const pokemonURLPairsToScrape = [];
const URLsForScraper = [];
const moveTableElements = [];
const allMovesForAnIndividualPokemon = [];
const methodsMovesAreObtained = ['level up', 'egg', 'hm', 'tm'];
const allPokemonNames = [
	"Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran-f", "Nidorina", "Nidoqueen", "Nidoran-m", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr-Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-oh", "Celebi", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys",
];

function generateURLsForScraper () {
	allPokemonNames.forEach(pokemon => {
		const newURL = `https://pokemondb.net/pokedex/${pokemon}/moves/3`;
		URLsForScraper.push(newURL);
	});
};

function createPokemonURLPairs () {
	allPokemonNames.forEach(pokemon => {
		const newPokemonToScrape = { 
			name: pokemon,
			url: URLsForScraper.find(url => url.includes(pokemon)) 
		}
		pokemonURLPairsToScrape.push(newPokemonToScrape);
	});	
}

// Select table elements to eventually be processed
function filterTableElements () {
	const h3Elements = $('h3').html();
	h3Elements.forEach(h3Element => {
		methodsMovesAreObtained.some(moveCategory => {
			const isMoveTableElement = Boolean(h3Element.innerText.toLowerCase().includes(moveCategory)).valueOf();
			const isEmeraldVersion = Boolean(h3Element.nextElementSibling.innerText.toLowerCase().includes('emerald')).valueOf();
			if (!isMoveTableElement) return;
			if (!isEmeraldVersion) return;
			const h3SiblingDataTable = h3Element.nextElementSibling.nextElementSibling.firstElementChild.querySelector('tbody');
			moveTableElements.push(h3SiblingDataTable);
		});
	});
}

function retrieveMoves () {
	// For each move table...
	moveTableElements.forEach(table => {
		const tableIndex = moveTableElements.indexOf(table);
		const moveEntries = [...table.children];
		// ... grab each move from the table
		moveEntries.forEach(entry => {
			const move_id = entry.querySelector('td[class="cell-name"]').innerText;
			const method_obtained = idMethodObtained();
			const level_obtained = (tableIndex === 0) ?
				`, level_obtained: ${entry.querySelector('td[class="cell-num"]').innerText}` :
				''
				// Only need 'level_obtained' property for moves obtained via level-up
			;
			function idMethodObtained () {
				if (tableIndex === 0) return 'Level Up';
				if (tableIndex === 1) return 'Egg';
				if (tableIndex === 2) return 'HM';
				if (tableIndex === 3) return 'TM';
			}
			// TODO: Eventually need to interpolate 'pokemon_name' from the 'name' parameter from master runScraper(pokemonName) function. Currently, hardcoded to fit Nidoking test example.
			const newMoveToAdd = `{ pokemon_name: 'Nidoking', move_id: ${move_id}, method_obtained: ${method_obtained}${level_obtained}}`;
			// Store each move entry from each move table
			allMovesForAnIndividualPokemon.push(newMoveToAdd);
		});
	});
};

function prepareScraper() {
	generateURLsForScraper();
	createPokemonURLPairs();
}

// function runScraper (name) {
// 	// TODO: Will need to call these forEach pokemon in allPokemon
// 	retrieveMoves();
// 	filterTableElements();
// 	retrieveMoves();
// }

// TODO: Call runScraper forEach pokemon in allPokemon
// runScraper('Nidoking');

// TODO: Add the following to do it for each pairing:
// pokemonURLPairsToScrape.forEach(pokemon => {

function runScraper (pokemon) {
	axios.get(pokemon.url)
		.then(function (response) {
			// handle success
			const $ = cheerio.load(response.data);
			
			// Selects the contents of <div class="grid-row">, which contains each move table. Need to then traverse this parent element to select specific move tables
			const emeraldMovesTab = $('div .tabs-panel').next().next().children().children();

			// Select each group of moves. Note that the long method chains are unfortunately necessary as each chain is sufficiently unique such that attempts to abstract them are unsuccessful
			const levelUpMovesTable = emeraldMovesTab.children().first().next().next().children().children().last();
			const eggMovesTable = emeraldMovesTab.children().first().next().next().next().next().next().children().children().last();
			const moveTutorMoves = emeraldMovesTab.children().first().next().next().next().next().next().next().next().next().children().children().last();
			const preEvolutionMoves = emeraldMovesTab.children().first().next().next().next().next().next().next().next().next().next().next().next().children().children().last();
			const hmMoves = emeraldMovesTab.next().children().first().next().next().children().children().last();
			const tmMoves = emeraldMovesTab.next().children().first().next().next().next().next().next().children().children().last();
			
			// TODO: Write one function to process level-up (grabs level_learned, move_name) and another for everything else (grabs move_name)
			// grab the first cell-num and store it as level
			// grab the move name
			// store each as a variable; store name = pokemon.name; store method based on _______ (need to figure this part out)
			// for each pokemon and each move group, create an object & push to array
			// each pokemon should have 6 groups in the master array. master array will eventually be rendered as table. table then copied to sheet and formatted for postgreSQL
			
			// E.g., tmMoves.forEach(move => grabMoves(move));
			// remember: we start with the table body for each group. so we just need to run a few selectors for each table body, for each element in the body. we must manually assign the pokemon name (from the master parent object property, pokemon.name), and we must manually assign the method_obtained. (We could technically grab it by traversing the DOM again but it would be much more time consuming and harder to QA)
			
			
		})
		.catch(function (error) {
			// handle error
			console.error(error);
		})
		.then(function () {
			// always executed
		}
	);
}



const nidokingTestObject = {
	name: 'Nidoking',
	url: 'https://pokemondb.net/pokedex/nidoking/moves/3',
}

prepareScraper();
// runScraper(nidokingTestObject);

runScraper(pokemonURLPairsToScrape);

// TODO: Use this to run scraper for all pokemon, once logic is correct
// pokemonURLPairsToScrape.forEach(pokemon => {
// 	runScraper(pokemon);
// });
