# Pokedex

## Technologies

Front-end: React

Back-end: Node.js, Express.js, PostgreSQL



## History of design trade-offs:

2020-10-30: Originally wanted to maintain a separate table of pokemon base stats for each generation of the game. However, base stats stayed the same (for all pokemon) throughout the gen 2-3 games. Gen 1 pokemon had different base stats in the gen 1 game, but they were modified in gen 2 and remained the same in gen 3. I have decided to only use the gen 3 base stats to ensure consistency when comparing the relative merits of pokemon across generations.

2020-10-30: Similarly, I initially planned to maintain discrete primary- and secondary-type tables for each game generation. However, only three type changes occur in the entire series, all in the transition from gen 1 to 2: (1) Charizard becomes Fire/Flying (vs. Fire only, initially), (2 and 3) Magnemite/Magneton become Electric/Steel (with the introduction of the 'Steel' type in gen2). It seems imprudent to duplicate my entire table to capture these three outliers. So, I will only maintain one single table of types, based on the gen3 type classifications.
