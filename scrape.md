# Summary

Scrapes https://pokemondb.net/ to obtain the complete move learnset for all 386 pokemon in gens 1-3. Specifically, grabs the moveset unique to Pokemon Emerald version.

Implemented in JavaScript with Nodejs, Axios, and Cheerio.

## How it works

0. Manually input the names of each pokemon.

1. Generate URLs to scrape. (Note: There are edge cases where proper name != URL name. E.g., Nidoran♂ -> nidoran-m; Nidoran♀ -> nidoran-f; Mr. Mime -> mr-mime; Farfetch'd -> farfetchd. Since there are <5 edge cases, I wrote the name variant in directly for each edge case)

2. Create a 'pokemon' object for each name:URL pair.

3. Make an HTTP GET request to each pokemon's URL. (Console log the error if it fails)

4. For each GET request, grab each move the pokemon learns from Pokemon Emerald version's various move tables.

5. For each GET request, push each pokemon/move permutation to the master table, which contains all permutations for all 380+ pokemon.

6. As each GET request processes, write the result to a .csv containing all pokemon/move combinations

## Dependencies

- **Axios**: Promise based HTTP client for the browser and node.js. More info here: https://github.com/axios/axios.

- **Cheerio**: Fast, flexible, and lean implementation of core jQuery designed specifically for the server. More info here: https://github.com/cheeriojs/cheerio.

## Data QA

To check my work, I manually searched this dataset for outliers, to find pokemon that seemed to learn an abnormally small or large number of moves.

Prior to any QA intervention, the mean number of moves learned was 50.7. The median was 51.5. This indicated a slight negative skewness.

The standard deviation of the dataset (prior to any QA intervention) was 15.2. To manually check any outliers, I searched the dataset for pokemon with move totals outside 2 and 3 standard distributions.

There were:

- 2 pokemon that learned more than 81.2 moves (+2 StDevs)

- 0 pokemon that learned 96.4 moves (+3 StDevs)

- 15 pokemon that learned fewer than 20.3 moves (-2 StDevs)

- 13 pokemon that learned fewer than 5.0 moves (-3 StDevs)

Given the relatively small size of the dataset (386 pokemon), I decided to check each of these outliers manually, by visiting their Pokemon Emerald learnset page at https://pokemondb.net/pokedex/${name}/moves/3.

After completing my QA, I identified five (5) pokemon whose learnsets were not scraped in full:

- Metapod: Scraper retrieved 2 of its 4 moves. Its pre-evolution moves were not retrieved. (Note: There is no egg moves data table on this page)

- Kakuna: Scraper retrieved 2 of its 4 moves. Its pre-evolution moves were not retrieved. (Note: There is no egg moves data table on this page)

- Silcoon: Scraper retrieved 2 of its 5 moves. Its pre-evolution moves were not retrieved. (Note: There is no egg moves data table on this page)

- Cascoon: Scraper retrieved 2 of its 5 moves. Its pre-evolution moves were not retrieved. (Note: There is no egg moves data table on this page)

- Deoxys: Scraper retrieved 3 of its 71 moves. However, these 3 moves did not contain any data: the level up, HM, and TM categories returned one blank move, each; the egg, pr-evolution, and move tutor categories were not retrieved at all. (Note: There is no egg moves data table on this page)

The scraper would not grab all elements for a pokemon if a specific data-table returned `null`, which would return `null` for all nextElementSibling data-tables, as each subsequent data-table was defined via a reference to its immediate precedent. This has now been corrected.

**Findings**:

v0 of scrape.js selected each move type's data table by referencing its previousElementSibling (in Cheerio's syntax).

For instance, the Move Tutor data table was selected by referencing Egg moves' element, then traversing further down the DOM.

However, this created errors in instances where certain types of moves (Egg moves, most commonly) did not have a data-table present on the DOM.

**Outcome**:

The scraper now uses Cheerio's `.find()` method to select each data-table based on the text contained in its `<h3>` previousElementSibling.

## Unit Tests

Unit tests for the 1st div (all pass):

| Level up | Egg | Move Tutor | Pre-evolution | Test case |
| :------: | :-: | :--------: | :-----------: | :-------: |
|   Yes    | Yes |    Yes     |      Yes      | Nidoking  |
|   Yes    | Yes |    Yes     |      No       |   Zubat   |
|   Yes    | Yes |     No     |      Yes      |    n/a    |
|   Yes    | Yes |     No     |      No       |    n/a    |
|   Yes    | No  |    Yes     |      Yes      | Beedrill  |
|   Yes    | No  |    Yes     |      No       |  Moltres  |
|   Yes    | No  |     No     |      Yes      |  Cascoon  |
|   Yes    | No  |     No     |      No       | Magikarp  |

Unit tests for the 2nd div (all pass):

| HM  | TM  | Test case |
| :-: | :-: | :-------: |
| Yes | Yes | Nidoking  |
| Yes | No  |    n/a    |
| No  | Yes |   Zubat   |
| No  | No  | Magikarp  |

Notes:

- Test cases marked 'n/a' do not have any pokemon that match the specified case

- Every pokemon learns at least one move via level up. Thus, level up is always marked 'Yes'
