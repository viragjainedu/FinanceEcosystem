-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2022 at 05:09 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finance`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_stats`
--

CREATE TABLE `account_stats` (
  `email` varchar(250) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `total_money_lent` int(11) DEFAULT NULL,
  `total_money_borrowed` int(11) DEFAULT NULL,
  `total_money_withdrawn` int(11) DEFAULT NULL,
  `total_interest_received` int(11) DEFAULT NULL,
  `total_interest_paid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_stats`
--

INSERT INTO `account_stats` (`email`, `balance`, `total_money_lent`, `total_money_borrowed`, `total_money_withdrawn`, `total_interest_received`, `total_interest_paid`) VALUES
('virag.j@somaiya.edu', 0, 0, 0, 0, 0, 0),
('vikasdharma503@gmail.com', 0, 0, 0, 0, 0, 0),
('viragjain.work@gmail.com', 0, 0, 0, 0, 0, 0),
('viragjain501@gmail.com', 0, 0, 0, 0, 0, 0),
('viragjain502@gmail.com', 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `heading` varchar(100) NOT NULL,
  `image_link` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `blog_link` varchar(500) NOT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `borrowers_data`
--

CREATE TABLE `borrowers_data` (
  `borrowers_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `GRADE` char(1) DEFAULT NULL,
  `loan_cap` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `borrowing_requests`
--

CREATE TABLE `borrowing_requests` (
  `email` varchar(50) DEFAULT NULL,
  `isAprroved` tinyint(1) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `borrowing_transactions`
--

CREATE TABLE `borrowing_transactions` (
  `transaction_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transaction_comment` varchar(255) DEFAULT NULL,
  `email_id` varchar(50) DEFAULT NULL,
  `amount_borrowed` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `installments`
--

CREATE TABLE `installments` (
  `installment_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `amount_borrowed` int(11) DEFAULT NULL,
  `date_of_loan_transaction` date NOT NULL DEFAULT curdate(),
  `no_of_months` int(11) DEFAULT NULL,
  `interest_rate` float DEFAULT NULL,
  `installment_amount` int(11) DEFAULT NULL,
  `installment_no` int(11) DEFAULT NULL,
  `date_of_payment` date DEFAULT NULL,
  `time_of_payment` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `status` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `interest_rates`
--

CREATE TABLE `interest_rates` (
  `grade` char(1) DEFAULT NULL,
  `months_3` float DEFAULT NULL,
  `months_6` float DEFAULT NULL,
  `months_12` float DEFAULT NULL,
  `months_18` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `interest_rates`
--

INSERT INTO `interest_rates` (`grade`, `months_3`, `months_6`, `months_12`, `months_18`) VALUES
('A', 8, 7.8, 7.5, 7.33),
('B', 11.6, 11.4, 11.2, 11),
('C', 14, 13.8, 13.6, 13.5),
('D', 16.2, 16, 15.85, 15.72),
('E', 18.2, 18, 17.85, 17.72),
('F', 20.2, 20, 19.85, 19.72),
('G', 22, 21.8, 21.6, 21.39);

-- --------------------------------------------------------

--
-- Table structure for table `lenders_data`
--

CREATE TABLE `lenders_data` (
  `lenders_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `amount_lent` int(11) DEFAULT NULL,
  `amount_remaining` int(11) DEFAULT NULL,
  `fixed_lending_amount` float DEFAULT NULL,
  `b0` varchar(255) DEFAULT NULL,
  `b0_amount` int(11) DEFAULT NULL,
  `b0_grade` varchar(1) DEFAULT NULL,
  `b1` varchar(255) DEFAULT NULL,
  `b1_amount` int(11) DEFAULT NULL,
  `b1_grade` varchar(1) DEFAULT NULL,
  `b2` varchar(255) DEFAULT NULL,
  `b2_amount` int(11) DEFAULT NULL,
  `b2_grade` varchar(1) DEFAULT NULL,
  `b3` varchar(255) DEFAULT NULL,
  `b3_amount` int(11) DEFAULT NULL,
  `b3_grade` varchar(1) DEFAULT NULL,
  `b4` varchar(255) DEFAULT NULL,
  `b4_amount` int(11) DEFAULT NULL,
  `b4_grade` varchar(1) DEFAULT NULL,
  `b5` varchar(255) DEFAULT NULL,
  `b5_amount` int(11) DEFAULT NULL,
  `b5_grade` varchar(1) DEFAULT NULL,
  `b6` varchar(255) DEFAULT NULL,
  `b6_amount` int(11) DEFAULT NULL,
  `b6_grade` varchar(1) DEFAULT NULL,
  `b7` varchar(255) DEFAULT NULL,
  `b7_amount` int(11) DEFAULT NULL,
  `b7_grade` varchar(1) DEFAULT NULL,
  `b8` varchar(255) DEFAULT NULL,
  `b8_amount` int(11) DEFAULT NULL,
  `b8_grade` varchar(1) DEFAULT NULL,
  `b9` varchar(255) DEFAULT NULL,
  `b9_amount` int(11) DEFAULT NULL,
  `b9_grade` varchar(1) DEFAULT NULL,
  `current_borrower` int(11) DEFAULT NULL,
  `lock_in_period` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lending_transactions`
--

CREATE TABLE `lending_transactions` (
  `transaction_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `email_id` varchar(50) DEFAULT NULL,
  `amount_lent` int(11) DEFAULT NULL,
  `lock_in_period` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `heading` varchar(100) NOT NULL,
  `image_link` varchar(500) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `news_link` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `balance` varchar(50) DEFAULT NULL,
  `emp_length` int(11) DEFAULT NULL,
  `home_ownership` int(11) DEFAULT NULL,
  `annual_income` int(11) DEFAULT NULL,
  `contact` varchar(10) DEFAULT NULL,
  `purpose` varchar(50) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `DOB` varchar(20) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `address1` varchar(20) DEFAULT NULL,
  `address2` varchar(20) DEFAULT NULL,
  `GRADE` char(1) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `collateral` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `collateral_value` int(11) DEFAULT NULL,
  `loan_cap` int(11) DEFAULT NULL,
  `amount_req` int(11) DEFAULT NULL,
  `month_req` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`email`, `password`, `balance`, `emp_length`, `home_ownership`, `annual_income`, `contact`, `purpose`, `first_name`, `last_name`, `gender`, `DOB`, `pincode`, `state`, `city`, `address1`, `address2`, `GRADE`, `isAdmin`, `collateral`, `username`, `age`, `collateral_value`, `loan_cap`, `amount_req`, `month_req`) VALUES
('vikasdharma503@gmail.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'vikasdharma503', NULL, NULL, NULL, NULL, NULL),
('virag.j@somaiya.edu', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'viragjainedu', NULL, NULL, NULL, NULL, NULL),
('viragjain.work@gmail.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'viragjain.work', NULL, NULL, NULL, NULL, NULL),
('viragjain501@gmail.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'viragjain501', NULL, NULL, NULL, NULL, NULL),
('viragjain502@gmail.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'viragjain502', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_notifications`
--

CREATE TABLE `personal_notifications` (
  `Not_Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Message` varchar(255) DEFAULT NULL,
  `email_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `proposedloans`
--

CREATE TABLE `proposedloans` (
  `email` varchar(250) NOT NULL,
  `amount1` int(11) DEFAULT NULL,
  `interest1` float DEFAULT NULL,
  `amount2` int(11) DEFAULT NULL,
  `interest2` float DEFAULT NULL,
  `amount3` int(11) DEFAULT NULL,
  `interest3` float DEFAULT NULL,
  `amount4` int(11) DEFAULT NULL,
  `interest4` float DEFAULT NULL,
  `selected` int(11) DEFAULT NULL,
  `MailSent` tinyint(1) DEFAULT NULL,
  `Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isCalculated` tinyint(1) DEFAULT NULL,
  `isTransacted` tinyint(1) DEFAULT NULL,
  `month_req` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `system_notifications`
--

CREATE TABLE `system_notifications` (
  `Not_Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Message` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `borrowers_data`
--
ALTER TABLE `borrowers_data`
  ADD PRIMARY KEY (`borrowers_id`);

--
-- Indexes for table `borrowing_requests`
--
ALTER TABLE `borrowing_requests`
  ADD KEY `email` (`email`);

--
-- Indexes for table `installments`
--
ALTER TABLE `installments`
  ADD PRIMARY KEY (`installment_id`);

--
-- Indexes for table `lenders_data`
--
ALTER TABLE `lenders_data`
  ADD PRIMARY KEY (`lenders_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `proposedloans`
--
ALTER TABLE `proposedloans`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `borrowers_data`
--
ALTER TABLE `borrowers_data`
  MODIFY `borrowers_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `installments`
--
ALTER TABLE `installments`
  MODIFY `installment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `lenders_data`
--
ALTER TABLE `lenders_data`
  MODIFY `lenders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `borrowing_requests`
--
ALTER TABLE `borrowing_requests`
  ADD CONSTRAINT `borrowing_requests_ibfk_1` FOREIGN KEY (`email`) REFERENCES `person` (`email`);

--
-- Constraints for table `proposedloans`
--
ALTER TABLE `proposedloans`
  ADD CONSTRAINT `proposedloans_ibfk_1` FOREIGN KEY (`email`) REFERENCES `person` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
