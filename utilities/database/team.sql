CREATE TABLE "Team" (
	id BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
	user_id BIGSERIAL NOT NULL UNIQUE REFERENCES "User"(id),
	pokemon_id_one INTEGER NOT NULL REFERENCES "Pokemon"(id),
	pokemon_id_two INTEGER REFERENCES "Pokemon"(id),
	pokemon_id_three INTEGER REFERENCES "Pokemon"(id),
	pokemon_id_four INTEGER REFERENCES "Pokemon"(id),
	pokemon_id_five INTEGER REFERENCES "Pokemon"(id),
	pokemon_id_six INTEGER REFERENCES "Pokemon"(id)
);

-- Reference pokemon_id so user can pick specific forms (e.g. Deoxys Defense; Castform Snow) if desired
-- Then, to display team, lookup each pokemon_id and pull in info from "Pokemon" table
