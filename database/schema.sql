DROP DATABASE IF EXISTS test;
DROP DATABASE IF EXISTS music;
CREATE DATABASE music;

USE music;

CREATE TABLE beats(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    beat_name NVARCHAR(70),
    -- beat_rating INTEGER(11),
    producer_name NVARCHAR(70),
    price DEC(5,2),
    -- producer_rating INTEGER(11),
    source NVARCHAR(200),
    mastered BOOLEAN DEFAULT true,
    PRIMARY KEY (id)
    
    );

-- INSERT INTO beats (
--         beat_name, 
--         -- beat_rating, 
--         producer_name, 
--         -- producer_rating
--         source
--     )
-- VALUES ("Concept", "Soverign"),
--        ("Heliopause", "Soverign"),
--        ("Courage", "Trip"),
--        ("Magnetron", "Soverign");