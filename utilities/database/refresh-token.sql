CREATE TABLE "RefreshToken" (
	token_id BIGSERIAL PRIMARY KEY UNIQUE,
	email VARCHAR(255) NOT NULL,
	refresh_token VARCHAR (255) UNIQUE NOT NULL
);

-- TODO: Add token_id that automatically increments; update existing field from token_id to token
-- TODO: email needs to be UNIQUE? (user can't be signed in more than once). But what if they're on multiple machines...? E.g. signed into gmail on work and home computers. I think what we want to prevent can occur server-side. E.g. Send the user's token with request; if server sees a token, redirect away from the log-in screen. So, if you're trying to log in multiple times on the same machine it won't work. But if you're logging in on multiple machines it's fine
