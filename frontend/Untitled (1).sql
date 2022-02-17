CREATE TABLE `users` (
  `id` int AUTO_INCREMENT,
  `phone` varchar(255),
  `email` varchar(255),
  `account_no` int,
  `full_name` varchar(255),
  `created_at` timestamp,
  `password` varchar(255),
  `security_question_id` int,
  `security_answer` varchar(255),
  PRIMARY KEY (`id`, `phone`, `email`, `account_no`)
);

CREATE TABLE `transactions` (
  `transaction_id` int PRIMARY KEY,
  `from` int,
  `to` int,
  `transaction_amount` int,
  `transaction_timestamp` timestamp,
  `transaction_status` boolean
);

CREATE TABLE `documents` (
  `document_id` int,
  `user_id` int,
  `document_type` varchar(255),
  `verification_status` boolean,
  `date_of_verification` timestamp,
  PRIMARY KEY (`document_id`, `user_id`)
);

CREATE TABLE `accounts` (
  `account_no` int PRIMARY KEY,
  `balance` int,
  `last_transacted_on` timestamp,
  `loan_taken` boolean,
  `loan_lended` boolean,
  `loan_taken_amount` int,
  `loan_lended_amount` int
);

ALTER TABLE `documents` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `accounts` ADD FOREIGN KEY (`account_no`) REFERENCES `users` (`account_no`);

ALTER TABLE `accounts` ADD FOREIGN KEY (`loan_lended`) REFERENCES `accounts` (`loan_taken`);

ALTER TABLE `accounts` ADD FOREIGN KEY (`loan_lended_amount`) REFERENCES `accounts` (`loan_taken_amount`);

