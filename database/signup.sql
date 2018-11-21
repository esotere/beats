USE music;

CREATE TABLE signup (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(170) NOT NULL,
    email VARCHAR(170)NOT NULL,
    -- beat_rating INTEGER(11),
    user_name VARCHAR(170) NOT NULL,
    -- producer_rating INTEGER(11),
    password VARCHAR(200) NOT NULL,
    mastered BOOLEAN DEFAULT true,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES logins(id)

    
    );