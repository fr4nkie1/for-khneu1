CREATE DATABASE IF NOT EXISTS cleaner;

USE cleaner;

DROP FUNCTION IF EXISTS autoInc;

DELIMITER $$
CREATE FUNCTION autoInc ()
    RETURNS INT
    READS SQL DATA
    BEGIN
        DECLARE getCount INT;

        SELECT COUNT(*) + 1 INTO getCount
        FROM orders;

        RETURN getCount;
    END$$
DELIMITER ;


DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS serviceType;
DROP TABLE IF EXISTS filials;

CREATE TABLE `cleaner`.`customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(60) NOT NULL,
  `lastName` varchar(60) NOT NULL,
  `surName` varchar(60) NOT NULL,
  `phoneNumber` varchar(60) NOT NULL,
  `isRepeatCustomer` tinyint(1) DEFAULT '0',
  `orderCount` int DEFAULT '0',
  PRIMARY KEY (`id`)
);

CREATE TABLE `cleaner`.`serviceType` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `cleaner`.`services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `typeId` int NOT NULL,
  `cost` float NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`typeId`) REFERENCES `serviceType`(`id`)
);

CREATE TABLE `cleaner`.`filials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `cleaner`.`orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `serviceId` int NOT NULL,
  `filialId` int NOT NULL,
  `sum` float NOT NULL,
  `sbd` float NOT NULL,
  `urgency` int NOT NULL,
  `ordNum` int NOT NULL,
  `difficulty` int NOT NULL,
  `ordStatus` int NOT NULL,
  `receiveDate` varchar(60) NOT NULL,
  `returnDate` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`),
  FOREIGN KEY (`serviceId`) REFERENCES `services`(`id`),
  FOREIGN KEY (`filialId`) REFERENCES `filials`(`id`)
);