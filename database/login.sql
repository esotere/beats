USE music;

SET foreign_key_checks = 0;
DROP TABLE logins;
SET foreign_key_checks = 1;
-- DROP TABLE IF EXISTS logins;

DROP TABLE IF EXISTS members;



CREATE TABLE logins (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    -- name VARCHAR(170)NOT NULL,
    -- email VARCHAR(170)NOT NULL,
    -- beat_rating INTEGER(11),
    username VARCHAR(170) NOT NULL,
    -- producer_rating INTEGER(11),
    password VARCHAR(200) NOT NULL,
    mastered BOOLEAN DEFAULT true,
    PRIMARY KEY (id)
    
    );

    CREATE TABLE members (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(170) NOT NULL,
    email VARCHAR(170)NOT NULL,
    -- beat_rating INTEGER(11),
    username VARCHAR(170) NOT NULL,
    -- producer_rating INTEGER(11),
    password VARCHAR(200) NOT NULL,
    mastered BOOLEAN DEFAULT true,
    PRIMARY KEY (id)
    -- FOREIGN KEY (id) REFERENCES logins(id)    
    );