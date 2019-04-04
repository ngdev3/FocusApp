-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2019 at 03:38 PM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `focus`
--

-- --------------------------------------------------------

--
-- Table structure for table `f_notification`
--

CREATE TABLE `f_notification` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` enum('pending','done') DEFAULT 'pending',
  `notification_status` enum('1','2','3') NOT NULL,
  `user_id` int(11) NOT NULL,
  `typeofcontent` varchar(255) NOT NULL COMMENT 'morningfocus, vision, goals etc',
  `contentid` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `notification_datetime` date NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `f_notification`
--

INSERT INTO `f_notification` (`id`, `title`, `status`, `notification_status`, `user_id`, `typeofcontent`, `contentid`, `description`, `notification_datetime`, `created_date`, `updated_date`) VALUES
(1, 'Apple Content', 'pending', '1', 1, 'morning', 25, 'This is where you will see your personalized offers', '2019-03-09', NULL, '2019-04-01 10:58:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `f_notification`
--
ALTER TABLE `f_notification`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `f_notification`
--
ALTER TABLE `f_notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
