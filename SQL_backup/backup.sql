CREATE TABLE withdrawal_transaction (
    withdrawal_id int auto_increment primary key,
    email varchar(1000) ,
    amount_withdrawn float,
    withdrawal_time datetime
);

CREATE TABLE system_notifications (
    notification_id int auto_increment primary key,
    message varchar(1000) ,
    not_time datetime
);

CREATE TABLE Last_login(
    last_login_id int auto_increment primary key,
    email varchar(255),
    last_login datetime
);

INSERT INTO Last_login(email,last_login) VALUES
('viragjain503@gmail.com',now()),
('virag.j@somaiya.edu',now()),
('Keval.dk@somaiya.edu',now()),
('nachiketmoghe2@gmail.com',now()),
('Dhundirajj00@gmail.com',now()),
('vikasdharma503@gmail.com',now()),
('anaghapjogalekar11@gmail.com',now()),
('karani.k@somaiya.edu',now()),
('dhuniraj.j@somaiya.edu',now()),
('Borrower@gmail.com',now()),
('Borrower2@gmail.com',now());

Alter table last_login add column isLoggedIn bool DEFAULT false;

Alter table person add column last_not_opened datetime;
update account_stats set balance = 6000 where email = 'dhuniraj.j@somaiya.edu';
ALTER TABLE installments ALTER COLUMN late_fees SET DEFAULT 0;

Delete from account_stats;
Delete from blogs;
Delete from borrowers_data;
Delete from borrowing_requests;
Delete from borrowing_transactions;
Delete from completedloans;
Delete from fico_score;
Delete from installments;
Delete from interest_rates;
Delete from last_login;
Delete from lenders_data;
Delete from lending_transactions;
Delete from news;
Delete from person;
Delete from personal_notifications;
Delete from proposedloans;
Delete from returns;
Delete from system_notifications;
Delete from test;
Delete from withdrawal_transaction;

DROP TABLE account_stats;
DROP TABLE blogs;
DROP TABLE borrowers_data;
DROP TABLE borrowing_requests;
DROP TABLE borrowing_transactions;
DROP TABLE completedloans;
DROP TABLE fico_score;
DROP TABLE installments;
DROP TABLE interest_rates;
DROP TABLE last_login;
DROP TABLE lenders_data;
DROP TABLE lending_transactions;
DROP TABLE news;
DROP TABLE person;
DROP TABLE personal_notifications;
DROP TABLE proposedloans;
DROP TABLE returns;
DROP TABLE system_notifications;
DROP TABLE test;
DROP TABLE withdrawal_transaction;