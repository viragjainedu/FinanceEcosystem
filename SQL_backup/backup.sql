
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



INSERT INTO `person` (`email`, `password`, `balance`, `emp_length`, `home_ownership`, `annual_income`, `contact`, `purpose`, `first_name`, `last_name`, `gender`, `DOB`, `pincode`, `state`, `city`, `address1`, `address2`, `GRADE`, `isAdmin`, `collateral`, `username`, `age`, `collateral_value`, `loan_cap`, `amount_req`)
 VALUES ('virag.j@somaiya.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0', NULL, 'viragjainedu', NULL, NULL, NULL, NULL)


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