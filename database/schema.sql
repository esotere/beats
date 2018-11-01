DROP DATABASE IF EXISTS music;
CREATE DATABASE music;

USE music;

CREATE TABLE Beats(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    beat_name VARCHAR(70),
    beat_rating INTEGER(11),
    producer_name VARCHAR(70),
    producer_rating INTEGER(11),
    mastered BOOLEAN DEFAULT true,
    PRIMARY KEY (id)
    
    );

INSERT INTO Beats (
        beat_name, 
        beat_rating, 
        producer_name, 
        producer_rating
    )
VALUES ("Concept",5, "Soverign", 5),
       ("Heliopause",5, "Soverign", 5),
       ("Courage",4, "Trip", 5),
       ("Magnetron",5, "Soverign", 5);