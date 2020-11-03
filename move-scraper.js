const pokemon = [
	"Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran-f", "Nidorina", "Nidoqueen", "Nidoran-m", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetch'd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Mr. Mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo", "Mew", "Chikorita", "Bayleef", "Meganium", "Cyndaquil", "Quilava", "Typhlosion", "Totodile", "Croconaw", "Feraligatr", "Sentret", "Furret", "Hoothoot", "Noctowl", "Ledyba", "Ledian", "Spinarak", "Ariados", "Crobat", "Chinchou", "Lanturn", "Pichu", "Cleffa", "Igglybuff", "Togepi", "Togetic", "Natu", "Xatu", "Mareep", "Flaaffy", "Ampharos", "Bellossom", "Marill", "Azumarill", "Sudowoodo", "Politoed", "Hoppip", "Skiploom", "Jumpluff", "Aipom", "Sunkern", "Sunflora", "Yanma", "Wooper", "Quagsire", "Espeon", "Umbreon", "Murkrow", "Slowking", "Misdreavus", "Unown", "Wobbuffet", "Girafarig", "Pineco", "Forretress", "Dunsparce", "Gligar", "Steelix", "Snubbull", "Granbull", "Qwilfish", "Scizor", "Shuckle", "Heracross", "Sneasel", "Teddiursa", "Ursaring", "Slugma", "Magcargo", "Swinub", "Piloswine", "Corsola", "Remoraid", "Octillery", "Delibird", "Mantine", "Skarmory", "Houndour", "Houndoom", "Kingdra", "Phanpy", "Donphan", "Porygon2", "Stantler", "Smeargle", "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Miltank", "Blissey", "Raikou", "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-oh", "Celebi", "Treecko", "Grovyle", "Sceptile", "Torchic", "Combusken", "Blaziken", "Mudkip", "Marshtomp", "Swampert", "Poochyena", "Mightyena", "Zigzagoon", "Linoone", "Wurmple", "Silcoon", "Beautifly", "Cascoon", "Dustox", "Lotad", "Lombre", "Ludicolo", "Seedot", "Nuzleaf", "Shiftry", "Taillow", "Swellow", "Wingull", "Pelipper", "Ralts", "Kirlia", "Gardevoir", "Surskit", "Masquerain", "Shroomish", "Breloom", "Slakoth", "Vigoroth", "Slaking", "Nincada", "Ninjask", "Shedinja", "Whismur", "Loudred", "Exploud", "Makuhita", "Hariyama", "Azurill", "Nosepass", "Skitty", "Delcatty", "Sableye", "Mawile", "Aron", "Lairon", "Aggron", "Meditite", "Medicham", "Electrike", "Manectric", "Plusle", "Minun", "Volbeat", "Illumise", "Roselia", "Gulpin", "Swalot", "Carvanha", "Sharpedo", "Wailmer", "Wailord", "Numel", "Camerupt", "Torkoal", "Spoink", "Grumpig", "Spinda", "Trapinch", "Vibrava", "Flygon", "Cacnea", "Cacturne", "Swablu", "Altaria", "Zangoose", "Seviper", "Lunatone", "Solrock", "Barboach", "Whiscash", "Corphish", "Crawdaunt", "Baltoy", "Claydol", "Lileep", "Cradily", "Anorith", "Armaldo", "Feebas", "Milotic", "Castform", "Kecleon", "Shuppet", "Banette", "Duskull", "Dusclops", "Tropius", "Chimecho", "Absol", "Wynaut", "Snorunt", "Glalie", "Spheal", "Sealeo", "Walrein", "Clamperl", "Huntail", "Gorebyss", "Relicanth", "Luvdisc", "Bagon", "Shelgon", "Salamence", "Beldum", "Metang", "Metagross", "Regirock", "Regice", "Registeel", "Latias", "Latios", "Kyogre", "Groudon", "Rayquaza", "Jirachi", "Deoxys",
];

// Generate the URL for each pokemon move page that must be scraped:
const URLsToScrape = [];
function generateURLs () {
	pokemon.forEach(name => {
		const newURL = `https://pokemondb.net/pokedex/${name}/moves/3`;
		URLsToScrape.push(newURL);
	});
};
generateURLs();


// TODO: (1) Save HTML for each pokemon

// TODO: (2) Read HTML for each pokemon; save list of moves for each as a 4-parameter object: pokemon/move_id/method_obtained/level_obtained

// TODO: (3) Render these objects as one massive, 4-field table. Copy the whole thing and drop into postgreSQL




// The scraper:

// The move group titles are in <h3> tags, E.g. <h3>Egg moves</h3>

// For each table of moves:

// Then querySelector for child element <table class="data-table"></table>
// then grab <tbody>
// move = child <a>.innerHTML (the move name) of <tbody>

// that's the only thing you need UNLESS it's a level-up table
// Each level-up table needs a move_name and level_learned
// All the other tables JUST need move_name

// method_learned must also be attached to the object.
// All move objects derive their method_learned from the title of the table the move is taken from.
// so, for all moves in eggMoves, methodObtained='Egg', etc.

const h3Els = document.querySelectorAll('h3');
const moveTableElements = [];
const methodsObtained = ['level up', 'egg', 'hm', 'tm'];

// Filter for the correct table elements. Note, this is just so we can select the correct table elements to pull the actual move data from. We have not processed any **move** data yet -- we have only selected the appropriate tables to examine closer.

function filterTableElements () {
	h3Els.forEach(h3Element => {
		methodsObtained.some(moveCategory => {
			const isMoveTableElement = Boolean(h3Element.innerText.toLowerCase().includes(moveCategory)).valueOf();
			
			const isEmeraldVersion = Boolean(h3Element.nextElementSibling.innerText.toLowerCase().includes('emerald')).valueOf();
			
			if (!isMoveTableElement) return;
			if (!isEmeraldVersion) return;
			
			const h3SiblingDataTable = h3Element.nextElementSibling.nextElementSibling.firstElementChild.querySelector('tbody');
			
			moveTableElements.push(h3SiblingDataTable);
		});
	});
}
filterTableElements();

console.log(moveTableElements);



// The order goes: Level Up, Egg, HM, TM..... could label based on index in the array

// TODO: Now, create arrays of objects to store all moves from these tables

function storeMoves () {
	moveTableElements.forEach(table => {
		
		// Is it a level-up table? If so, need to grab the level the move is learned at too.
				// Grab the FIRST ('td[class="cell-name"]').innerText AND ('td[class="cell-name"]').innerText
		
		// Else, just grab ('td[class="cell-name"]').innerText and slap a label (egg/hm/tm) on it
		
		const tableIndex = moveTableElements.indexOf(table);
		
		// console.log(table);
		
		
		// i think i made a copy of the tables, as opposed to maintaining a reference to them
		
		
		table.forEach(move => {
			// console.log(move.innerText);
		});
	});
};
// storeMoves();




// TODO: Eventually, will just have a single function, runScraper(), that calls our filterTableElements, our storeMoves, and our writeMoveHTML functions. This function must pass 'name' as a parameter because it must be assigned to each object for easy copy/paste into SQL.