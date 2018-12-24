-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: music
-- Source Schemata: music
-- Created: Sat Nov 24 14:14:48 2018
-- Workbench Version: 6.3.10
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema music
-- ----------------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `music` ;

-- ----------------------------------------------------------------------------
-- Table music.beats
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`beats` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `beat_name` VARCHAR(70) NULL DEFAULT NULL,
  `producer_name` VARCHAR(70) NULL DEFAULT NULL,
  `source` VARCHAR(200) NULL DEFAULT NULL,
  `mastered` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table music.logins
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`logins` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(170) NOT NULL,
  `user_name` VARCHAR(170) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `mastered` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table music.members
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`members` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(170) NOT NULL,
  `email` VARCHAR(170) NOT NULL,
  `user_name` VARCHAR(170) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `mastered` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  CONSTRAINT `members_ibfk_1`
    FOREIGN KEY (`id`)
    REFERENCES `music`.`logins` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

-- ----------------------------------------------------------------------------
-- Table music.signup
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `music`.`signup` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(170) NOT NULL,
  `email` VARCHAR(170) NOT NULL,
  `user_name` VARCHAR(170) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `mastered` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  CONSTRAINT `signup_ibfk_1`
    FOREIGN KEY (`id`)
    REFERENCES `music`.`logins` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;
SET FOREIGN_KEY_CHECKS = 1;
