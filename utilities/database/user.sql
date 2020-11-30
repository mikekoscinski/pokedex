CREATE TABLE "User" (
	id BIGSERIAL NOT NULL PRIMARY KEY UNIQUE,
	name VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL
);

-- https://blog.codinghorror.com/youre-probably-storing-passwords-incorrectly/ -- for password storage
-- store the hashes, not the actual passwords
-- bcrypt seems recommended
