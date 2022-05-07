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
