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

Alter table person add column last_not_opened datetime;
update account_stats set balance = 6000 where email = 'dhuniraj.j@somaiya.edu';
ALTER TABLE installments ALTER COLUMN late_fees SET DEFAULT 0;
