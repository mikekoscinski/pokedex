CREATE TABLE "MoveCategory" (
	id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE 
);
INSERT INTO MoveCategory (id) VALUES ('Physical');
INSERT INTO MoveCategory (id) VALUES ('Special');
INSERT INTO MoveCategory (id) VALUES ('Status');