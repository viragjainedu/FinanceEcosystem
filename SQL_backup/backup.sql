
    DROP table lending_transactions ;
    DROP table borrowing_transactions ;
    DROP table borrowing_requests ;
    DROP table proposedloans ;
    DROP table person ;
    DROP table system_notifications ; 
    DROP table lenders_data ; 
    DROP table borrowers_data ; 
    DROP table account_stats ;
    DROP table blogs ;
    DROP table news ;
    DROP table interest_rates ;
    DROP table personal_notifications ;
    DROP table installments;
    DROP table returns;


Alter table lenders_data add column v1 int;
Alter table lenders_data add column v2 int;

DELETE FROM lending_transactions ;  
DELETE FROM borrowing_transactions ;
DELETE FROM borrowing_requests ;
DELETE FROM proposedloans ;
DELETE FROM person where email not in ('viragjain503@gmail.com') ;
DELETE FROM system_notifications ; 
DELETE FROM lenders_data ; 
DELETE FROM borrowers_data ; 
DELETE FROM account_stats ;
DELETE FROM blogs ;
DELETE FROM news ;
-- DELETE FROM interest_rates ;
DELETE FROM personal_notifications ;
DELETE FROM installments;


update account_stats set balance = 0,total_money_lent=0,total_money_borrowed=0 where 1; 
source SQL_Backup/Only_5_users (2).sql


Create table installments (
    installment_id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    amount_borrowed int,
    date_of_loan_transaction date NOT NULL DEFAULT CURRENT_DATE,
    no_of_months int,
    interest_rate float,
    installment_amount int,
    installment_no int,
    date_of_payment date,
    time_of_payment timestamp NULL ON UPDATE current_timestamp() ,
    status varchar(20),
    PRIMARY KEY(installment_id)
);

Create table Returns (
    returns_id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    borrower_email varchar(255),
    return_amount float,
    principal float,
    interest float,
    date_of_payment timestamp,
    PRIMARY KEY(returns_id)
);

Create table lenders_data (
    lenders_id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    amount_lent int,
    amount_remaining int,
    fixed_lending_amount float,
    b0 varchar(255), b0_amount int, b0_grade varchar(1),
    b1 varchar(255), b1_amount int, b1_grade varchar(1),
    b2 varchar(255), b2_amount int, b2_grade varchar(1),
    b3 varchar(255), b3_amount int, b3_grade varchar(1),
    b4 varchar(255), b4_amount int, b4_grade varchar(1),
    b5 varchar(255), b5_amount int, b5_grade varchar(1),
    b6 varchar(255), b6_amount int, b6_grade varchar(1),
    b7 varchar(255), b7_amount int, b7_grade varchar(1),
    b8 varchar(255), b8_amount int, b8_grade varchar(1),
    b9 varchar(255), b9_amount int, b9_grade varchar(1),
    PRIMARY KEY(lenders_id)
);

Create table borrowers_data (
  borrowers_id int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `GRADE` char(1) DEFAULT NULL,
  `loan_cap` int(11) DEFAULT NULL,
    PRIMARY KEY(borrowers_id)
);