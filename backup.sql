
Delete from lending_transactions where 1;
Delete from borrowing_requests where 1;
Delete from proposedloans where 1;
Delete from person where email != 'viragjain503@gmail.com';
Delete from system_notifications where 1; 
Delete from lenders_data where 1; 
Delete from borrowers_data where 1; 
Delete from account_stats where 1; 


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