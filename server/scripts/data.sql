INSERT INTO `cleaner`.`filials` (name, location) VALUES
('Чиста Лінія Хімчистка', 'вул. Головна, Містечко'),
('Еко Прес Чистка', 'вул. Дубова, Містечко'),
('Швидка Пара Пральня', 'вул. Вільхова, Містечко'),
('Чиста Тканина Хімчистка', 'вул. Соснова, Містечко'),
('Кришталево Чистий Догляд за Одягом', 'вул. Кленова, Містечко');

INSERT INTO `cleaner`.`serviceType` (name) VALUES
('Чистка одягу'),
('Фарбування одягу'),
('Чищення та фарбування взуття'),
('Чищення та фарбування шкіри'),
('Хутряні вироби'),
('Чистка домашнього текстилю'),
('Premium чистка'),
('Обробка озоном');

INSERT INTO `cleaner`.`customers` (firstName, lastName, surName, phoneNumber, isRepeatCustomer, orderCount) VALUES
('Іван', 'Петров', 'Іванович', '0939493994', 1, 11),
('Аліса', 'Сміт', 'Іванівна', '0735498694', 1, 11),
('Богдан', 'Йогансон', 'Іванович', '0938393494', 1, 10),
('Емілія', 'Вільямс', 'Петрович', '0979499934', 1, 10),
('Давід', 'Джонс', 'Олегович', '0636493994', 1, 10);

-- Service Type: Чистка одягу (Dry Cleaning)
INSERT INTO `cleaner`.`services` (name, typeId, cost) VALUES
('Чистка костюма', 1, 259.90),
('Чистка сукні', 1, 309.90);

-- Service Type: Фарбування одягу (Clothing Dyeing)
INSERT INTO `cleaner`.`services` (name, typeId, cost) VALUES
('Фарбування сукні', 2, 359.90),
('Фарбування костюма', 2, 409.90);

-- Service Type: Чищення та фарбування взуття (Shoe Cleaning and Dyeing)
INSERT INTO `cleaner`.`services` (name, typeId, cost) VALUES
('Чищення та фарбування чобіт', 3, 185.00),
('Чищення та фарбування кросівок', 3, 129.90);

-- Service Type: Чищення та фарбування шкіри (Leather Cleaning and Dyeing)
INSERT INTO `cleaner`.`services` (name, typeId, cost) VALUES
('Чищення та фарбування шкіряної сумки', 4, 459.90),
('Чищення та фарбування шкіряного пальта', 4, 559.90);

-- Service Type: Хутряні вироби (Fur Services)
INSERT INTO `cleaner`.`services` (name, typeId, cost) VALUES
('Чистка хутра', 5, 609.90),
('Фарбування хутряного жакету', 5, 709.90);

-- Service Type: Чистка домашнього текстилю (Home Textile Cleaning)
INSERT INTO `cleaner`.`services` (name, typeId, cost) VALUES
('Чистка подушок', 6, 159.90),
('Прасування рушників', 6, 89.90);

-- Service Type: Premium чистка (Premium Cleaning)
INSERT INTO `cleaner`.`services` (name, typeId, cost) VALUES
('Premium чистка костюма', 7, 509.90),
('Premium чистка сукні', 7, 559.90);

-- Service Type: Обробка озоном (Ozone Treatment)
INSERT INTO `cleaner`.`services` (name, typeId, cost) VALUES
('Обробка озоном куртки', 8, 209.90),
('Обробка озоном штанів', 8, 129.90);

-- January 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(1, 1, 2, 502.00, 525.00, 3, 4, autoInc(), 4, '2022-01-02', '2022-01-20'),
(2, 3, 3, 603.00, 628.00, 2, 5, autoInc(), 3, '2022-02-16', '2022-02-18');

-- February 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(3, 2, 5, 395.00, 410.00, 1, 3, autoInc(), 2, '2022-02-17', '2022-02-22'),
(4, 4, 1, 429.90, 453.00, 4, 2, autoInc(), 2, '2022-02-18', '2022-02-21');

-- March 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(5, 5, 4, 653.00, 678.00, 2, 4, autoInc(), 3, '2022-02-19', '2022-02-24'),
(1, 1, 2, 554.00, 579.00, 3, 5, autoInc(), 4, '2022-03-05', '2022-03-10');

-- April 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(2, 3, 3, 456.00, 481.00, 1, 2, autoInc(), 1, '2022-04-12', '2022-04-18'),
(3, 2, 5, 332.50, 357.00, 4, 3, autoInc(), 1, '2022-04-15', '2022-04-20');

-- May 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(4, 4, 1, 287.50, 312.00, 2, 5, autoInc(), 4, '2022-05-08', '2022-05-15'),
(5, 5, 4, 600.00, 625.00, 3, 4, autoInc(), 4, '2022-05-12', '2022-05-20');

-- June 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(1, 1, 2, 502.00, 527.00, 1, 3, autoInc(), 4, '2022-06-02', '2022-06-20'),
(2, 3, 3, 603.00, 628.00, 4, 2, autoInc(), 4, '2022-06-16', '2022-06-18');

-- July 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(3, 2, 5, 402.00, 427.00, 2, 5, autoInc(), 3, '2022-07-05', '2022-07-10'),
(4, 4, 1, 556.00, 581.00, 3, 4, autoInc(), 2, '2022-07-12', '2022-07-18');

-- August 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(5, 5, 4, 308.00, 333.00, 1, 3, autoInc(), 2, '2022-08-08', '2022-08-15'),
(1, 1, 2, 459.00, 484.00, 4, 2, autoInc(), 3, '2022-08-16', '2022-08-22');

-- September 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(2, 3, 3, 387.50, 412.50, 2, 4, autoInc(), 4, '2022-09-05', '2022-09-10'),
(3, 2, 5, 624.00, 649.00, 3, 5, autoInc(), 1, '2022-09-12', '2022-09-18');

-- October 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(4, 4, 1, 492.00, 517.00, 1, 2, autoInc(), 4, '2022-10-08', '2022-10-15'),
(5, 5, 4, 283.00, 308.00, 4, 3, autoInc(), 2, '2022-10-16', '2022-10-22');

-- November 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(1, 1, 2, 356.00, 381.00, 2, 5, autoInc(), 3, '2022-11-05', '2022-11-10'),
(2, 3, 3, 429.00, 454.00, 3, 4, autoInc(), 2, '2022-11-12', '2022-11-18');

-- December 2022
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(3, 2, 5, 552.00, 577.00, 1, 3, autoInc(), 1, '2022-12-08', '2022-12-15'),
(4, 4, 1, 487.50, 512.50, 4, 2, autoInc(), 4, '2022-12-16', '2022-12-22');

-- January 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(5, 5, 4, 375.00, 400.00, 2, 4, autoInc(), 3, '2023-01-05', '2023-01-10'),
(1, 1, 2, 432.00, 457.00, 3, 3, autoInc(), 4, '2023-01-12', '2023-01-18');

-- February 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(2, 3, 3, 608.00, 633.00, 1, 2, autoInc(), 3, '2023-02-08', '2023-02-15'),
(3, 2, 5, 289.00, 314.00, 4, 3, autoInc(), 4, '2023-02-16', '2023-02-22');

-- March 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(4, 4, 1, 487.50, 512.50, 2, 5, autoInc(), 4, '2023-03-05', '2023-03-10'),
(5, 5, 4, 524.00, 549.00, 3, 4, autoInc(), 2, '2023-03-12', '2023-03-18');

-- April 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(1, 1, 2, 402.00, 427.00, 1, 3, autoInc(), 4, '2023-04-08', '2023-04-15'),
(2, 3, 3, 359.00, 384.00, 4, 2, autoInc(), 2, '2023-04-16', '2023-04-22');

-- May 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(3, 2, 5, 256.00, 281.00, 2, 5, autoInc(), 2, '2023-05-05', '2023-05-10'),
(4, 4, 1, 423.00, 448.00, 3, 4, autoInc(), 3, '2023-05-12', '2023-05-18');

-- June 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(5, 5, 4, 372.00, 397.00, 1, 2, autoInc(), 4, '2023-06-08', '2023-06-15'),
(1, 1, 2, 468.00, 493.00, 4, 3, autoInc(), 4, '2023-06-16', '2023-06-22');

-- July 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(2, 3, 3, 554.00, 579.00, 2, 5, autoInc(), 2, '2023-07-05', '2023-07-10'),
(3, 2, 5, 408.00, 433.00, 3, 4, autoInc(), 1, '2023-07-12', '2023-07-18');

-- August 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(4, 4, 1, 309.00, 334.00, 1, 3, autoInc(), 2, '2023-08-08', '2023-08-15'),
(5, 5, 4, 487.50, 512.50, 4, 2, autoInc(), 4, '2023-08-16', '2023-08-22');

-- September 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(1, 1, 2, 372.00, 397.00, 2, 4, autoInc(), 4, '2023-09-05', '2023-09-10'),
(2, 3, 3, 426.00, 451.00, 3, 5, autoInc(), 2, '2023-09-12', '2023-09-18');

-- October 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(3, 2, 5, 583.00, 608.00, 1, 2, autoInc(), 2, '2023-10-08', '2023-10-15'),
(4, 4, 1, 345.00, 370.00, 4, 3, autoInc(), 3, '2023-10-16', '2023-10-22');

-- November 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(5, 5, 4, 429.00, 454.00, 2, 5, autoInc(), 4, '2023-11-05', '2023-11-10'),
(1, 1, 2, 522.00, 547.00, 3, 4, autoInc(), 3, '2023-11-12', '2023-11-18');

-- December 2023
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(2, 3, 3, 456.00, 481.00, 1, 3, autoInc(), 4, '2023-12-08', '2023-12-15'),
(3, 2, 5, 387.50, 412.50, 4, 2, autoInc(), 2, '2023-12-16', '2023-12-22');

-- January 2024
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(4, 4, 1, 552.00, 577.00, 2, 4, autoInc(), 2, '2024-01-05', '2024-01-10'),
(5, 5, 4, 408.00, 433.00, 3, 5, autoInc(), 4, '2024-01-12', '2024-01-18');

-- February 2024
INSERT INTO `cleaner`.`orders` (customerId, serviceId, filialId, sum, sbd, urgency, difficulty, ordNum, ordStatus, receiveDate, returnDate) VALUES
(1, 1, 2, 339.00, 364.00, 1, 2, autoInc(), 3, '2024-02-01', '2024-02-03'),
(2, 3, 3, 487.50, 512.50, 4, 3, autoInc(), 3, '2024-02-03', '2024-02-08');
