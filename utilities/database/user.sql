CREATE TABLE "User" (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR (50) UNIQUE NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	PASSWORD VARCHAR (100) NOT NULL,
	created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
	last_login TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Sample fields to include in 'User' table: https://www.postgresqltutorial.com/postgresql-create-table/

-- https://blog.codinghorror.com/youre-probably-storing-passwords-incorrectly/ -- for password storage
-- store the hashes, not the actual passwords
-- bcrypt seems recommended
