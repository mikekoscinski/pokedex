CREATE TABLE "User" (
	user_id serial PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	PASSWORD VARCHAR (100) NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP
);

-- Sample fields to include in 'User' table: https://www.postgresqltutorial.com/postgresql-create-table/

-- https://blog.codinghorror.com/youre-probably-storing-passwords-incorrectly/ -- for password storage
-- store the hashes, not the actual passwords
-- bcrypt seems recommended
