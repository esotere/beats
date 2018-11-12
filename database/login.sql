DROP DATABASE IF EXISTS profile;
CREATE DATABASE profile;

USE profile;

CREATE TABLE login(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    email VARCHAR(70)NOT NULL,
    -- beat_rating INTEGER(11),
    user_name VARCHAR(70) NOT NULL,
    -- producer_rating INTEGER(11),
    password VARCHAR(200) NOT NULL,
    mastered BOOLEAN DEFAULT true,
    PRIMARY KEY (id)
    
    );