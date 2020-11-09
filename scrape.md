# Summary

Scrapes https://pokemondb.net/ to obtain the complete move learnset for all 386 pokemon in gens 1-3. Specifically, grabs the moveset unique to Pokemon Emerald version.

Implemented in JavaScript with Nodejs, Axios, and Cheerio.

## How it works

0. Manually input the names of each pokemon.

1. Generate URLs to scrape.

- Note the edge cases where the proper name does not match the URL's name (E.g., Nidoran♂ -> nidoran-m; Nidoran♀ -> nidoran-f; Mr. Mime -> mr-mime; Farfetch'd -> farfetchd).

- For each edge case, I wrote in the URL name variant directly, instead of using regex handlers to modify names to the appropriate URL form. This would not scale well for hundreds of variants, but we only have a few edge cases here.

2. Create a 'pokemon' object for each name:URL pair.

For each 'pokemon' object:

3. Make an HTTP GET request to the pokemon's URL.

If the GET request is successful:

4. For each pokemon, grab each move the pokemon learns from Pokemon Emerald version's various move tables.

5. For each pokemon, push each pokemon/move permutation to the master table, which contains all permutations for all 380+ pokemon.

If the GET request fails, console.log the error

6. TODO: Once all GET requests and their subsequent actions have been completed, console log a cli-table containing each pokemon/move permutation. This should contain ~19,500 rows.

## Dependencies

- **Axios**: Promise based HTTP client for the browser and node.js. More info here: https://github.com/axios/axios.

- **Cheerio**: Fast, flexible, and lean implementation of core jQuery designed specifically for the server. More info here: https://github.com/cheeriojs/cheerio.
