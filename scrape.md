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

**Conclusion**:

I am not currently capturing the Move Tutor moves for pokemon that do not learn any Egg moves.

Why? Each data table is grabbed via Cheerio's DOM traversal, not class-specific selectors (since all data tables, regardless of content, are of the same mono-class)

- Each pokemon has a level up moves table, even if it only contains one item

- Many pokemon (genderless; e.g., legendaries) cannot breed in this game. Thus, these pokemon will not learn any egg moves.

My selectors in Cheerio assume the presence of an egg data table, even if it is empty. This is not the case.

Thus, in cases where a pokemon does not have an egg table, I am overshooting the Move Tutor data table element and am selecting nothing.

- Recall that the HM and TM moves are stored in a separate div - one div makes up the left side of the page, the other (HM/TM) the right side.

Upon closer inspection, all of Deoxys' moves are listed under a tab for its Speed Forme. They could not have been selected by my scraper, as the DOM on Deoxys' page is unique from that of all other 387 pokemon. (Interestingly, this is not the case for Castform, the only other pokemon that can take multiple forms.)

TODO: Create hasEggMoveDataTable and add a conditional statement that reassigns the moveTutorDataTable value if there is not an egg table

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

Unit tests for the 2nd div:

| HM  | TM  | Test case |
| :-: | :-: | :-------: |
| Yes | Yes | Nidoking  |
| Yes | No  |    n/a    |
| No  | Yes |   Zubat   |
| No  | No  | Magikarp  |

Notes:

- Test cases marked 'n/a' have matching pokemon.

- Every pokemon learns at least one move via level up. Thus, level up will always be marked 'yes'
