# Summary

Scrapes https://pokemondb.net/ to obtain complete move learnsets for all pokemon in Pokemon Emerald version.

Implemented in JavaScript with Nodejs, Axios, and Cheerio.

## How it Works

0. Store the name of each pokemon to be scraped in an array.

1. Generate URLs to scrape for each pokemon in the array. (Note: There are four edge cases where proper name != URL name: Nidoran♂/nidoran-m, Nidoran♀/nidoran-f, Mr. Mime/Mr-Mime, Farfetch'd/Farfetchd)

2. Create an object for each pokemon_name/URL pair.

3. Make an HTTP GET request to each pokemon's URL. (Console log the error if it fails)

4. Grab every move each pokemon learns from the webpage's data-table bodies

5. Write each pokemon/move combination to moves.csv

## Dependencies

- **Axios**: Promise based HTTP client for the browser and node.js. More info here: https://github.com/axios/axios.

- **Cheerio**: Fast, flexible, and lean implementation of core jQuery designed specifically for the server. More info here: https://github.com/cheeriojs/cheerio.

## Unit Tests

The Pokemon Emerald moveset tab contains two parent divs of concern.

- The first div contains moves learned via level_up, egg, move_tutor, and pre_evolution

- The second contains moves learned via HM and TM

Unit tests were written for each to confirm that all move types were scraped correctly in different scenarios:

| Level up | Egg | Move Tutor | Pre-evolution | Test case | Pass? |
| :------: | :-: | :--------: | :-----------: | :-------: | :---: |
|   Yes    | Yes |    Yes     |      Yes      | Nidoking  |  Yes  |
|   Yes    | Yes |    Yes     |      No       |   Zubat   |  Yes  |
|   Yes    | Yes |     No     |      Yes      |    n/a    |  Yes  |
|   Yes    | Yes |     No     |      No       |    n/a    |  Yes  |
|   Yes    | No  |    Yes     |      Yes      | Beedrill  |  Yes  |
|   Yes    | No  |    Yes     |      No       |  Moltres  |  Yes  |
|   Yes    | No  |     No     |      Yes      |  Cascoon  |  Yes  |
|   Yes    | No  |     No     |      No       | Magikarp  |  Yes  |

| HM  | TM  | Test case | Pass? |
| :-: | :-: | :-------: | :---: |
| Yes | Yes | Nidoking  |  Yes  |
| Yes | No  |    n/a    |  Yes  |
| No  | Yes |   Zubat   |  Yes  |
| No  | No  | Magikarp  |  Yes  |

Notes:

- Test cases marked 'n/a' do not have any pokemon that match the specified case

- Every pokemon learns at least one move via level up. Thus, level up is always marked 'Yes'
