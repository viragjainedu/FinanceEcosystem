-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2022 at 09:19 AM
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
  `balance` float DEFAULT NULL,
  `total_money_lent` float DEFAULT NULL,
  `total_money_borrowed` float DEFAULT NULL,
  `total_money_withdrawn` float DEFAULT NULL,
  `total_interest_received` float DEFAULT NULL,
  `total_interest_paid` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_stats`
--

INSERT INTO `account_stats` (`email`, `balance`, `total_money_lent`, `total_money_borrowed`, `total_money_withdrawn`, `total_interest_received`, `total_interest_paid`) VALUES
('virag.j@somaiya.edu', 10269.5, 50000, 0, 0, 269.5, 0),
('Keval.dk@somaiya.edu', 13589.7, 30000, 0, 0, 256.4, 0),
('nachiketmoghe2@gmail.com', 10107.8, 20000, 0, 0, 107.8, 0),
('Dhundirajj00@gmail.com', 3364.9, 10000, 0, 0, 31.5667, 0),
('vikasdharma503@gmail.com', 0, 50000, 0, 0, 0, 0),
('anaghapjogalekar11@gmail.com', 0, 0, 10000, 10000, 0, 1617.01),
('karani.k@somaiya.edu', 5679.73, 60000, 0, 0, 346.4, 0),
('dhuniraj.j@somaiya.edu', 1000, 0, 6000, 5000, 0, 157),
('Borrower@gmail.com', 10000, 0, 10000, 0, 0, 947.001);

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

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`heading`, `image_link`, `description`, `blog_link`, `id`) VALUES
('Why diversity is good for investments?\r\n', 'https://nonfiopprod.s3.ap-south-1.amazonaws.com/uploads/Blogs/blogs_42.png', 'Let me start by quoting the famous saying \"Don\'t put all your eggs in one basket\",\r\nSimilarly, based on your objectives you may have allocated your investment into\r\nvarious asset classes such as equity, fixed income, insurance, commodities, and\r\nP2P lending. But if you do not diversify your investment within each asset class,\r\nthe exercise, according to experts, is sub-optimal.', 'https://www.omlp2p.com/blog-details/why-diversity-is-good-for-investments', 1),
('Is Investing in P2P Lending the Right Move?\r\n', 'https://nonfiopprod.s3.ap-south-1.amazonaws.com/uploads/Blogs/blogs_41.jpg', 'Investing through P2P lending platforms allows investors to provide loans for small business and personal purposes. It has quickly become a desirable option for many investors, due to the big returns on these fixed income assets. Additionally, by cutting out the traditional intermediary, P2P lending allows investors to pocket more of the interest. Here is what to know before investing.', 'https://www.omlp2p.com/blog-details/investing-in-peer-to-peer-lending', 2),
('Saving and Investing funds during uncertain times', 'https://nonfiopprod.s3.ap-south-1.amazonaws.com/uploads/Blogs/blogs_53.jpg', 'The COVID-19 crisis has caused enormous disruptions in our lives, not just to our jobs but to our well-being as well. Businesses have been forced to temporarily shut down to support efforts in limiting the pandemic, with some even ceasing operations. For individuals living on monthly salaries, the sudden loss of income brings heavy financial strain. It is important to evaluate your expenses and see where you can compromise to save some money in the midst of this pandemic.', 'https://www.omlp2p.com/blog-details/saving-investing-funds-during-uncertain-times', 3),
('What is the Best Interest Rate for Personal Loan ?', 'https://nonfiopprod.s3.ap-south-1.amazonaws.com/uploads/Blogs/blogs_56.jpg', 'Interest rates are probably the primary thing you consider when opting for any\r\nloan. The lower, the better, right? Though, the answer is not that easy.\r\nPersonal finance interest rates depend on varying factors and are normally\r\nsubject to fluctuations. Besides, since the personal loans are unsecured in nature,\r\ninterest rates can be on the higher side when compared to home or auto loans. Let\'s\r\ntake a look at what comprises the best interest rate.', 'https://www.omlp2p.com/blog-details/what-is-considered-as-the-best-interest-rate-for-a-personal-loan', 4);

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

--
-- Dumping data for table `borrowing_requests`
--

INSERT INTO `borrowing_requests` (`email`, `isAprroved`, `status`) VALUES
('anaghapjogalekar11@gmail.com', 1, 4),
('dhuniraj.j@somaiya.edu', 1, 4),
('Borrower@gmail.com', 1, 4);

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

--
-- Dumping data for table `borrowing_transactions`
--

INSERT INTO `borrowing_transactions` (`transaction_time`, `transaction_comment`, `email_id`, `amount_borrowed`) VALUES
('2022-04-28 06:36:46', NULL, 'anaghapjogalekar11@gmail.com', 10000),
('2022-04-28 10:45:11', NULL, 'dhuniraj.j@somaiya.edu', 6000),
('2022-05-05 04:16:40', NULL, 'Borrower@gmail.com', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `completedloans`
--

CREATE TABLE `completedloans` (
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
  `status` varchar(20) DEFAULT NULL,
  `late_fees` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `completedloans`
--

INSERT INTO `completedloans` (`installment_id`, `email`, `amount_borrowed`, `date_of_loan_transaction`, `no_of_months`, `interest_rate`, `installment_amount`, `installment_no`, `date_of_payment`, `time_of_payment`, `status`, `late_fees`) VALUES
(13, 'anaghapjogalekar11@gmail.com', 10000, '2022-04-28', 3, 8, 3513, 1, '2022-05-28', '2022-05-04 09:56:57', 'Paid', 0),
(14, 'anaghapjogalekar11@gmail.com', 10000, '2022-04-28', 3, 8, 3513, 2, '2022-06-28', '2022-05-04 09:57:01', 'Paid', 0),
(15, 'anaghapjogalekar11@gmail.com', 10000, '2022-04-28', 3, 8, 3513, 3, '2022-07-28', '2022-05-04 09:57:16', 'Paid', 0);

-- --------------------------------------------------------

--
-- Table structure for table `fico_score`
--

CREATE TABLE `fico_score` (
  `FS` int(11) DEFAULT NULL,
  `a1` int(11) DEFAULT NULL,
  `a1a` int(11) DEFAULT NULL,
  `a2` int(11) DEFAULT NULL,
  `a3` int(11) DEFAULT NULL,
  `a4` int(11) DEFAULT NULL,
  `a5` int(11) DEFAULT NULL,
  `a6` int(11) DEFAULT NULL,
  `a7` int(11) DEFAULT NULL,
  `a7a` int(11) DEFAULT NULL,
  `a8` int(11) DEFAULT NULL,
  `a9` int(11) DEFAULT NULL,
  `a10a` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fico_score`
--

INSERT INTO `fico_score` (`FS`, `a1`, `a1a`, `a2`, `a3`, `a4`, `a5`, `a6`, `a7`, `a7a`, `a8`, `a9`, `a10a`, `email`) VALUES
(732, 0, 30, 25, -5, 5, -5, 12, 0, 0, NULL, 20, 0, 'anaghapjogalekar11@gmail.com'),
(580, 0, 20, 25, -5, 5, -10, 12, -120, 0, NULL, 3, 0, 'dhuniraj.j@somaiya.edu'),
(600, 0, 30, 25, -15, 0, -10, 15, -115, 0, NULL, 20, 0, 'Borrower@gmail.com');

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
  `status` varchar(20) DEFAULT NULL,
  `late_fees` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `installments`
--

INSERT INTO `installments` (`installment_id`, `email`, `amount_borrowed`, `date_of_loan_transaction`, `no_of_months`, `interest_rate`, `installment_amount`, `installment_no`, `date_of_payment`, `time_of_payment`, `status`, `late_fees`) VALUES
(13, 'anaghapjogalekar11@gmail.com', 10000, '2022-04-28', 3, 8, 3513, 1, '2022-05-28', '2022-05-04 09:56:57', 'Paid', 0),
(14, 'anaghapjogalekar11@gmail.com', 10000, '2022-04-28', 3, 8, 3513, 2, '2022-06-28', '2022-05-04 09:57:01', 'Paid', 0),
(15, 'anaghapjogalekar11@gmail.com', 10000, '2022-04-28', 3, 8, 3513, 3, '2022-07-28', '2022-05-04 09:57:16', 'Paid', 0),
(16, 'dhuniraj.j@somaiya.edu', 6000, '2022-04-28', 3, 11.6, 2157, 1, '2022-05-28', '2022-05-04 09:19:01', 'Paid', 0),
(17, 'dhuniraj.j@somaiya.edu', 6000, '2022-04-28', 3, 11.6, 2157, 2, '2021-04-28', '2022-05-04 09:12:05', 'Defaulted', 431.4),
(18, 'dhuniraj.j@somaiya.edu', 6000, '2022-04-28', 3, 11.6, 2157, 3, '2022-07-28', '2022-05-04 09:20:00', 'Defaulted', 0),
(19, 'Borrower@gmail.com', 10000, '2022-05-05', 3, 14, 3649, 1, '2022-06-05', '2022-05-05 04:17:58', 'Paid', 0),
(20, 'Borrower@gmail.com', 10000, '2022-05-05', 3, 14, 3649, 2, '2022-07-05', NULL, 'Pending', 0),
(21, 'Borrower@gmail.com', 10000, '2022-05-05', 3, 14, 3649, 3, '2022-08-05', NULL, 'Pending', 0);

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
  `lock_in_period` int(11) DEFAULT NULL,
  `v1` int(11) DEFAULT NULL,
  `v2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lenders_data`
--

INSERT INTO `lenders_data` (`lenders_id`, `email`, `amount_lent`, `amount_remaining`, `fixed_lending_amount`, `b0`, `b0_amount`, `b0_grade`, `b1`, `b1_amount`, `b1_grade`, `b2`, `b2_amount`, `b2_grade`, `b3`, `b3_amount`, `b3_grade`, `b4`, `b4_amount`, `b4_grade`, `b5`, `b5_amount`, `b5_grade`, `b6`, `b6_amount`, `b6_grade`, `b7`, `b7_amount`, `b7_grade`, `b8`, `b8_amount`, `b8_grade`, `b9`, `b9_amount`, `b9_grade`, `current_borrower`, `lock_in_period`, `v1`, `v2`) VALUES
(7, 'virag.j@somaiya.edu', 45000, 45000, 5000, 'anaghapjogalekar11@gmail.com', 10000, 'A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 3, 7, 2),
(8, 'Keval.dk@somaiya.edu', 24000, 24000, 3000, 'anaghapjogalekar11@gmail.com', 10000, 'A', 'Borrower@gmail.com', 10000, 'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 3, 3, 5),
(9, 'nachiketmoghe2@gmail.com', 18000, 18000, 2000, 'anaghapjogalekar11@gmail.com', 10000, 'A', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 3, 1, 8),
(10, 'Dhundirajj00@gmail.com', 9000, 9000, 1000, 'Borrower@gmail.com', 10000, 'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 3, 4, 5),
(11, 'vikasdharma503@gmail.com', 50000, 50000, 5000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 6, 5, 5),
(12, 'karani.k@somaiya.edu', 48000, 48000, 6000, 'dhuniraj.j@somaiya.edu', 6000, 'B', 'Borrower@gmail.com', 10000, 'C', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 3, 3, 5);

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

--
-- Dumping data for table `lending_transactions`
--

INSERT INTO `lending_transactions` (`transaction_time`, `email_id`, `amount_lent`, `lock_in_period`) VALUES
('2022-04-28 06:12:49', 'virag.j@somaiya.edu', 50000, 3),
('2022-04-28 06:14:46', 'Keval.dk@somaiya.edu', 30000, 3),
('2022-04-28 06:16:58', 'nachiketmoghe2@gmail.com', 20000, 3),
('2022-04-28 06:22:28', 'Dhundirajj00@gmail.com', 10000, 3),
('2022-04-28 06:24:31', 'vikasdharma503@gmail.com', 50000, 6),
('2022-04-28 10:32:43', 'karani.k@somaiya.edu', 60000, 3);

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

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`heading`, `image_link`, `description`, `news_link`) VALUES
('430% rise in investments by millennial women in P2P lending: Study\r\n', 'https://images.livemint.com/img/2022/03/08/600x338/women-k7YC--621x414@LiveMint_1646708408630.jpg', 'LenDenClub, the country\'s leading Peer-to-Peer (P2P) lending platform, released a report on women investors and borrowers on the P2P lending platform.According to analysis, there has been a whopping 430% rise in women investors in the P2P lending space in the financial year 2022 compared with FY21.', 'https://www.livemint.com/companies/news/430-rise-in-investments-by-millennial-women-in-p2p-lending-study-11646708288293.html'),
('Why the P2P lending segment is staging a strong comeback after a lull', 'https://bsmedia.business-standard.com/_media/bs/img/article/2017-10/05/full/1507227102-5141.jpg', 'Two fintech unicorns BharatPe and Cred entered the peer-to-peer lending segment recently. BharatPe sets an interest rate of up to 12%, Cred has set a far lower rate of 9%.', 'https://www.business-standard.com/article/companies/why-the-p2p-lending-segment-is-staging-a-strong-comeback-after-a-lull-121102601527_1.html'),
('P2P lending machine fires on all cylinders amid slackened bank loan disbursals', 'https://img.etimg.com/thumb/msid-87233039,width-250,imgsize-37720,,resizemode-4,quality-100/untitled-7.jpg', 'The bulk of the lenders filling up the rosters of prominent P2P platforms are return-hungry retail investors and traders with surplus cashf lows.', 'https://economictimes.indiatimes.com/industry/banking/finance/banking/p2p-lending-machine-firing-on-all-cylinders-amid-slackened-bank-loan-disbursals/articleshow/87232970.cms'),
('Regulating the disruption wave: RBI issues directions to govern P2P platforms', 'https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2017/10/19/Photos/Processed/resrve-kpRH--621x414@LiveMint.jpg', 'The Reserve Bank of India (RBI) recently classified peer to peer (P2P) lending platforms as non-banking financial companies (NBFC-P2P). Following this, it issued detailed master directions on 4 October governing the operation of such platforms.', 'https://www.livemint.com/Opinion/nh1pmagexv7vARXlX7RDGM/Regulating-the-disruption-wave-RBI-issues-directions-to-gov.html'),
('RBI allows lenders to finance larger amounts on P2P platforms', 'https://images.moneycontrol.com/static-mcnews/2019/10/wallet-with-money-drop-ground_9354-72.jpg?impolicy=website&width=770&height=431', 'The regulator has increased the lending cap for each individual lender from the current Rs 10 lakh to Rs 50 lakh. You can borrow money for short-term requirements as well as invest money to earn higher rate of returns on these platforms.', 'https://www.moneycontrol.com/news/business/personal-finance/rbi-allows-lenders-to-finance-larger-amounts-on-p2p-platforms-4703561.html'),
('RBI releases guidelines for P2P lenders; caps loans exposure at Rs 10 lakh per borrower', 'https://images.moneycontrol.com/static-mcnews/2017/10/P2P-Lending-435x435.jpg?impolicy=website&width=770&height=431', 'Peer to peer (P2P) lenders can cumulatively lend a maximum of Rs 10 lakh and individually have an exposure to a borrower of not more than Rs 50,000, as per the guidelines released by the Reserve Bank of India (RBI).', 'https://www.moneycontrol.com/news/business/economy/rbi-releases-guidelines-for-p2p-lenders-caps-loans-exposure-at-rs-10-lakh-per-borrower-2405195.html');

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
  `month_req` int(11) DEFAULT NULL,
  `last_not_opened` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`email`, `password`, `balance`, `emp_length`, `home_ownership`, `annual_income`, `contact`, `purpose`, `first_name`, `last_name`, `gender`, `DOB`, `pincode`, `state`, `city`, `address1`, `address2`, `GRADE`, `isAdmin`, `collateral`, `username`, `age`, `collateral_value`, `loan_cap`, `amount_req`, `month_req`, `last_not_opened`) VALUES
('viragjain503@gmail.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 'viragjain503', NULL, NULL, NULL, NULL, NULL, '2022-05-01 20:06:50'),
('virag.j@somaiya.edu', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, 'Virag', 'Jain', 'Male', '2000-10-28', '400083', 'Maharashtra', 'Mumbai', '503/Aditya Tower Kan', '503/Aditya Tower kan', NULL, 0, NULL, 'viragjainedu', NULL, NULL, NULL, NULL, NULL, '2022-05-01 20:06:50'),
('Keval.dk@somaiya.edu', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, 'Keval', 'Karani', 'Male', '2000-07-13', '400083', 'Maharashtra', 'Mumbai', '503/Aditya Tower kan', '503/Aditya Tower Kan', NULL, 0, NULL, 'Keval', NULL, NULL, NULL, NULL, NULL, '2022-05-01 20:06:50'),
('nachiketmoghe2@gmail.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, 'Nachiket', 'Moghe', 'Female', '2002-11-30', '400083', 'Maharashtra', 'Mumbai', '503/Aditya Tower kan', '503/Aditya Tower kan', NULL, 0, NULL, 'nachiket', NULL, NULL, NULL, NULL, NULL, '2022-05-01 20:06:50'),
('Dhundirajj00@gmail.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, 'Dhundiraj', 'Jogalekar', 'Male', '2000-07-06', '400083', 'Maharashtra', 'Mumbai', '503/Aditya Tower kan', '503/Aditya Tower kan', NULL, 0, NULL, 'Dhundiraj', NULL, NULL, NULL, NULL, NULL, '2022-05-01 20:06:50'),
('vikasdharma503@gmail.com', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, 'Vikas', 'Dharma', 'Male', '2000-10-27', '400083', 'Maharashtra', 'Mumbai', '503/Aditya Tower Kan', '503/Aditya Tower Kan', NULL, 0, NULL, 'vikasdharma503', NULL, NULL, NULL, NULL, NULL, '2022-05-01 20:06:50'),
('anaghapjogalekar11@gmail.com', 'Dop@12345', NULL, 1, NULL, 1, '9869101921', 'Education', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A', 0, 'Commerical', 'anagha', 20, 5, 10000, 10000, 3, '2022-05-05 11:02:44'),
('karani.k@somaiya.edu', 'Dop@12345', NULL, NULL, NULL, NULL, NULL, NULL, 'Keval', 'Karani', 'Male', '2000-12-01', '400083', 'Maharashtra', 'Mumbai', '503/Aditya Tower kan', '503/Aditya Tower kan', NULL, 0, NULL, 'Keval', NULL, NULL, NULL, NULL, NULL, '2022-05-05 10:58:52'),
('dhuniraj.j@somaiya.edu', 'Dop@12345', NULL, 10, NULL, 10, '9869101921', 'House', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'B', 0, 'House', 'Dhundiraj', 20, 1, 6000, 6000, 3, '2022-05-04 11:59:16'),
('Borrower@gmail.com', 'Dop@12345', NULL, 1, NULL, 5, '9869101921', 'Education', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'C', 0, 'House', 'Borrower', 19, 1, 10000, 10000, 3, '2022-05-05 09:48:14');

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
  `selected` int(11) DEFAULT NULL,
  `MailSent` tinyint(1) DEFAULT NULL,
  `Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isCalculated` tinyint(1) DEFAULT NULL,
  `isTransacted` tinyint(1) DEFAULT NULL,
  `month_req` int(11) DEFAULT NULL,
  `interest1` float DEFAULT NULL,
  `rejected` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `proposedloans`
--

INSERT INTO `proposedloans` (`email`, `amount1`, `selected`, `MailSent`, `Time`, `isCalculated`, `isTransacted`, `month_req`, `interest1`, `rejected`) VALUES
('anaghapjogalekar11@gmail.com', 10000, 1, 0, '2022-04-28 06:36:46', 1, 1, 3, 8, NULL),
('dhuniraj.j@somaiya.edu', 6000, 1, 0, '2022-04-28 10:45:11', 1, 1, 3, 11.6, NULL),
('Borrower@gmail.com', 10000, 1, 0, '2022-05-05 04:16:40', 1, 1, 3, 14, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `returns`
--

CREATE TABLE `returns` (
  `returns_id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `borrower_email` varchar(255) DEFAULT NULL,
  `return_amount` float DEFAULT NULL,
  `principal` float DEFAULT NULL,
  `interest` float DEFAULT NULL,
  `date_of_payment` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `returns`
--

INSERT INTO `returns` (`returns_id`, `email`, `borrower_email`, `return_amount`, `principal`, `interest`, `date_of_payment`) VALUES
(9, 'karani.k@somaiya.edu', 'dhuniraj.j@somaiya.edu', 2157, 2000, 157, '2022-04-28 10:46:25'),
(10, 'virag.j@somaiya.edu', 'anaghapjogalekar11@gmail.com', 1756.5, 1666.67, 89.8333, '2022-05-04 09:56:57'),
(11, 'Keval.dk@somaiya.edu', 'anaghapjogalekar11@gmail.com', 1053.9, 1000, 53.9, '2022-05-04 09:56:57'),
(12, 'nachiketmoghe2@gmail.com', 'anaghapjogalekar11@gmail.com', 702.6, 666.667, 35.9333, '2022-05-04 09:56:57'),
(13, 'virag.j@somaiya.edu', 'anaghapjogalekar11@gmail.com', 1756.5, 1666.67, 89.8333, '2022-05-04 09:57:01'),
(14, 'Keval.dk@somaiya.edu', 'anaghapjogalekar11@gmail.com', 1053.9, 1000, 53.9, '2022-05-04 09:57:01'),
(15, 'nachiketmoghe2@gmail.com', 'anaghapjogalekar11@gmail.com', 702.6, 666.667, 35.9333, '2022-05-04 09:57:01'),
(16, 'virag.j@somaiya.edu', 'anaghapjogalekar11@gmail.com', 1756.5, 1666.67, 89.8333, '2022-05-04 09:57:16'),
(17, 'Keval.dk@somaiya.edu', 'anaghapjogalekar11@gmail.com', 1053.9, 1000, 53.9, '2022-05-04 09:57:16'),
(18, 'nachiketmoghe2@gmail.com', 'anaghapjogalekar11@gmail.com', 702.6, 666.667, 35.9333, '2022-05-04 09:57:16'),
(19, 'Keval.dk@somaiya.edu', 'Borrower@gmail.com', 1094.7, 1000, 94.7, '2022-05-05 04:17:58'),
(20, 'Dhundirajj00@gmail.com', 'Borrower@gmail.com', 364.9, 333.333, 31.5667, '2022-05-05 04:17:58'),
(21, 'karani.k@somaiya.edu', 'Borrower@gmail.com', 2189.4, 2000, 189.4, '2022-05-05 04:17:58');

-- --------------------------------------------------------

--
-- Table structure for table `system_notifications`
--

CREATE TABLE `system_notifications` (
  `notification_id` int(11) NOT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `not_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `system_notifications`
--

INSERT INTO `system_notifications` (`notification_id`, `message`, `not_time`) VALUES
(1, 'Hey there This is your first notification ', '2022-05-01 12:47:00'),
(2, 'Service on 1 May', '2022-05-01 14:00:26'),
(3, 'Hi this is your third notification.', '2022-05-04 11:02:34');

-- --------------------------------------------------------

--
-- Table structure for table `withdrawal_transaction`
--

CREATE TABLE `withdrawal_transaction` (
  `withdrawal_id` int(11) NOT NULL,
  `email` varchar(1000) DEFAULT NULL,
  `amount_withdrawn` float DEFAULT NULL,
  `withdrawal_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `withdrawal_transaction`
--

INSERT INTO `withdrawal_transaction` (`withdrawal_id`, `email`, `amount_withdrawn`, `withdrawal_time`) VALUES
(5, 'dhuniraj.j@somaiya.edu', 5000, '2022-05-01 21:30:20'),
(6, 'anaghapjogalekar11@gmail.com', 10000, '2022-05-04 19:03:22');

--
-- Indexes for dumped tables
--

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
-- Indexes for table `returns`
--
ALTER TABLE `returns`
  ADD PRIMARY KEY (`returns_id`);

--
-- Indexes for table `system_notifications`
--
ALTER TABLE `system_notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `withdrawal_transaction`
--
ALTER TABLE `withdrawal_transaction`
  ADD PRIMARY KEY (`withdrawal_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `installments`
--
ALTER TABLE `installments`
  MODIFY `installment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `lenders_data`
--
ALTER TABLE `lenders_data`
  MODIFY `lenders_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `returns`
--
ALTER TABLE `returns`
  MODIFY `returns_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `system_notifications`
--
ALTER TABLE `system_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `withdrawal_transaction`
--
ALTER TABLE `withdrawal_transaction`
  MODIFY `withdrawal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
