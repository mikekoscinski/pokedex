const axios = require('axios');
const cheerio = require('cheerio');
const fileSystem = require('fs');
const writeStream = fileSystem.createWriteStream('moves.csv');

// Write headers for .csv output
writeStream.write(`pokemon_name,move_id,method_obtained,level_obtained \n`);

const pokemonNames = [
	"Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran-f", "Nidorina", "Nidoqueen", "Nidoran-m", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr-Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-oh", "Celebi", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys",
];
const urlsToScrape = [];
const pokemonURLPairsToScrape = [];
// Master array containing all pokemon/move permutation objects
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
			const emeraldMovesTab = $('div .tabs-panel').next().next().children();
			
			// TODO: Edge cases to handle:
			// 1st div - No Egg / No Move Tutor / yes pre-evolution
			// 1st div - no egg / yes move tutor / no pre-evolution
			// 1st div - no egg / yes move tutor / yes pre-evolution
			// 2nd div - no HM / yes TM
			
			// TODO: Create hasEggMoveDataTable and add a conditional statement that reassigns the moveTutorDataTable value if there is not an egg table
			
			
			// TODO: The egg moves table is the only table that __could__ be missing. So, a quick hack to check if there is an egg moves table = count the number of <div class="resp-scroll"> in the section. If that is != 3
			
			// The data tables are organized: 
			// 1.) Level up, Egg, Move Tutor, Pre-evolution
			// 2.) HM, TM
			
			const numberOfDataTablesOnPage = emeraldMovesTab.find($('table[class="data-table"]')).length;
			
			const numberOfDataTablesInFirstGridColSpanLg6 = emeraldMovesTab.children().first().find($('table[class="data-table"]')).length;
			
			console.log(`${pokemon.name}: ${numberOfDataTablesOnPage}`);
			
			
			// Select the move table children from the move panel
			
			// const levelUpMovesTable = emeraldMovesTab.children().children().first().next().next().children().children().last();
			
			const levelUpMovesTable = emeraldMovesTab.children().children().filter(function () {
				return $(this).text() === 'Moves learnt by level up';
			}).next().next().children().children().last();
			
			
			
			
			const eggMovesTable = emeraldMovesTab.children().children().first().next().next().next().next().next().children().children().last();
			const moveTutorMovesTable = emeraldMovesTab.children().children().first().next().next().next().next().next().next().next().next().children().children().last();
			const preEvolutionMovesTable = emeraldMovesTab.children().children().first().next().next().next().next().next().next().next().next().next().next().next().children().children().last();
			const hmMovesTable = emeraldMovesTab.children().next().children().first().next().next().children().children().last();
			const tmMovesTable = emeraldMovesTab.children().next().children().first().next().next().next().next().next().children().children().last();
			
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
					let level_obtained = '-'
					if (table.method_obtained === 'Level up') {
						move_id = $(this).children().first().next().text();
						level_obtained = parseInt($(this).children().first().text());
					}
					if (table.method_obtained === 'HM' || table.method_obtained === 'TM') {
						move_id = $(this).children().first().next().text();
					}
					const newChildPokemonMove = {
						pokemon_name: pokemon.name,
						move_id: move_id,
						method_obtained: table.method_obtained,
						level_obtained: level_obtained,
					};
					
					// NOTE: Change which section is commented based on testing/production
					
					// Push to array
					
					
					
					// Write to CSV
					writeStream.write(`${newChildPokemonMove.pokemon_name}, ${newChildPokemonMove.move_id}, ${newChildPokemonMove.method_obtained}, ${newChildPokemonMove.level_obtained} \n`);
				});
			}
			// For each table, grab its moves and push to master pokemon/move table
			childPokemonMoveTables.forEach(table => grabMovesFromChildTable(table));
		})
		.catch(function (error) {
			console.error(error);
		}
	);
}

// NOTE: THIS IS THE MASTER ONE:
// function runScraper () {
// 	pokemonURLPairsToScrape.forEach(pokemon => getPokemonMoves(pokemon));
// };

// NOTE: THIS IS THE TEST ONE:
function runScraper (pokemonList) {
	pokemonList.forEach(pokemon => getPokemonMoves(pokemon));
	// getPokemonMoves(pokemon);
};

// NOTE: Keep these objects for testing
const nidokingTestArrayOfObject = [{
	name: 'Nidoking',
	url: 'https://pokemondb.net/pokedex/nidoking/moves/3',
}];
const moltresTestArrayOfObject = [{
	name: 'Moltres',
	url: 'https://pokemondb.net/pokedex/moltres/moves/3',
}];

prepareScraper();
// NOTE: THIS IS THE PRODUCTION FUNCTION
// TODO: Pass this as parameter: pokemonURLPairsToScrape
// runScraper(pokemonURLPairsToScrape);

// NOTE: Keep for testing
runScraper(nidokingTestArrayOfObject);
// runScraper(moltresTestArrayOfObject);
