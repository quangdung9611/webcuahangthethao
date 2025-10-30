-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2025 at 04:36 AM
-- Server version: 10.6.22-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dungcushop`
--
CREATE DATABASE IF NOT EXISTS `dungcushop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dungcushop`;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address_line` varchar(255) NOT NULL,
  `is_default` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `user_id`, `recipient_name`, `phone`, `address_line`, `is_default`, `created_at`) VALUES
(6, 2, 'Nguyen Van Nhàn', '0123456789', '123 Đường ABC', 0, '2025-10-04 14:34:34'),
(7, 6, 'Nguyễn Phạm Quang Dũng', '0909489611', 'TPHCM', 0, '2025-10-05 03:04:45'),
(8, 6, 'Phạm Tấn Khang', '0395353534', 'Vũng Tàu', 0, '2025-10-05 03:07:41'),
(9, 6, 'Trần Quang Thuận ', '035353522', 'Đà Lạt', 0, '2025-10-05 03:11:02'),
(10, 6, 'bfhhf', '036356352', 'nfhr4', 0, '2025-10-05 03:13:55'),
(11, 6, 'nfhrty4', '0353535311', 'fhrr35', 0, '2025-10-05 03:15:44'),
(12, 6, 'Trần Xuân Vinh', '035350022', 'Phan Thiết', 0, '2025-10-05 03:46:05'),
(13, 6, 'Phạm Tấn Hoàng', '039535353', 'Phan Rang', 0, '2025-10-05 03:51:53'),
(14, 6, 'Nguyễn Ngọc Sang', '03535224', 'Tây Ninh', 0, '2025-10-05 03:58:44'),
(15, 6, 'ngh55', '0464633', 'bfhfh', 0, '2025-10-05 10:08:23'),
(16, 6, 'bhfhh', '04646464', 'fghg', 0, '2025-10-05 10:16:54'),
(17, 6, 'fhfhf', '07575443', 'gjgj46', 0, '2025-10-05 10:18:49'),
(18, 6, 'fhfhh', '04646224', 'nghgjh', 0, '2025-10-05 10:20:42'),
(19, 6, 'vnfry', '93536', 'fhfh', 0, '2025-10-05 10:24:02'),
(20, 6, 'ngutget', '93537', 'sfsfsf', 0, '2025-10-06 13:30:38'),
(21, 6, '035353', '09353533', 'sfsfsf', 0, '2025-10-06 14:15:54'),
(22, 2, 'Tran Thi B', '0987654321', '456 Hai Bà Trưng, Hà Nội', 0, '2025-10-26 11:12:51'),
(23, 2, 'Tran Thi B', '0987654321', '456 Hai Bà Trưng, Hà Nội', 0, '2025-10-26 14:52:08');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE IF NOT EXISTS `brands` (
  `brand_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`brand_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `name`, `slug`) VALUES
(1, 'Yonex', 'yonex'),
(2, 'Lining', 'lining'),
(3, 'Victor', 'victor'),
(4, 'Nike', 'nike'),
(5, 'Head', 'head'),
(6, 'Joola', 'joola'),
(7, 'Wilson', 'wilson'),
(8, 'Babolat', 'babolat'),
(9, 'Kamito', 'kamito');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `slug`) VALUES
(1, 'Vợt Cầu Lông', 'vot-cau-long'),
(2, 'Vợt PickleBall', 'vot-pickle-ball'),
(10, 'Giày Cầu Lông', 'giay-cau-long'),
(11, 'Vợt Tennis', 'vot-tennis'),
(12, 'Áo Cầu Lông', 'ao-cau-long');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`feedback_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `user_id`, `name`, `email`, `phone`, `message`, `created_at`) VALUES
(1, 6, 'Nguyễn Văn A', 'nguyenvana@example.com', '0905123456', 'Trang web rất dễ sử dụng, tôi rất hài lòng.', '2025-10-19 03:26:31');

-- --------------------------------------------------------

--
-- Table structure for table `flash_sales`
--

DROP TABLE IF EXISTS `flash_sales`;
CREATE TABLE IF NOT EXISTS `flash_sales` (
  `flash_sale_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(180) NOT NULL,
  `description` text DEFAULT NULL,
  `discount_type` enum('percent','fixed') NOT NULL,
  `discount_value` decimal(10,0) NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  `status` enum('scheduled','active','ended','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`flash_sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `flash_sales`
--

INSERT INTO `flash_sales` (`flash_sale_id`, `name`, `description`, `discount_type`, `discount_value`, `start_at`, `end_at`, `status`, `created_at`) VALUES
(2, 'Đại Hội Săn Sale', 'Giảm 20% cho tất cả sản phẩm', 'percent', 20, '2025-09-21 10:35:00', '2025-09-22 10:35:00', 'active', '2025-09-20 20:35:54'),
(3, 'Chương Trình Giảm Giá Tháng 11', 'Săn sale ngập tràn ưu đãi', 'percent', 25, '2025-09-23 10:51:00', '2025-09-30 10:51:00', 'active', '2025-09-20 20:51:22');

-- --------------------------------------------------------

--
-- Table structure for table `flash_sale_products`
--

DROP TABLE IF EXISTS `flash_sale_products`;
CREATE TABLE IF NOT EXISTS `flash_sale_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flash_sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `stock_limit` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `flash_sale_id` (`flash_sale_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `flash_sale_products`
--

INSERT INTO `flash_sale_products` (`id`, `flash_sale_id`, `product_id`, `stock_limit`, `created_at`) VALUES
(4, 2, 9, 6, '2025-09-20 21:34:15'),
(6, 3, 3, 60, '2025-09-23 10:23:06');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
CREATE TABLE IF NOT EXISTS `materials` (
  `material_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`material_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=363 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`material_id`, `product_id`, `color`, `size`, `sku`, `stock`, `image`, `created_at`) VALUES
(10, 3, NULL, '4U', 'Vợt-Axforce-100-Vàng-Golden-SIZE-4U', 48, NULL, '2025-09-18 06:01:46'),
(16, 33, NULL, '4U', 'Vợt-Canno-Pro-SIZE-4U', 60, NULL, '2025-09-18 07:20:13'),
(22, 14, 'Đỏ', '3U', 'PROD-14-Đỏ-3U', 50, NULL, '2025-10-28 03:30:41'),
(23, 14, 'Đỏ', '4U', 'PROD-14-Đỏ-4U', 80, NULL, '2025-10-28 03:30:41'),
(24, 1, 'Đỏ', '3U', 'PROD-1-Đỏ-3U', 60, NULL, '2025-10-28 03:31:29'),
(25, 1, 'Đỏ', '4U', 'PROD-1-Đỏ-4U', 70, NULL, '2025-10-28 03:31:29'),
(26, 2, 'Xanh', '3U', 'PROD-2-Xanh-3U', 60, NULL, '2025-10-28 03:31:47'),
(27, 2, 'Xanh', '4U', 'PROD-2-Xanh-4U', 80, NULL, '2025-10-28 03:31:47'),
(28, 3, 'Đen', '4U', 'PROD-3-Đen-4U', 60, NULL, '2025-10-28 03:32:10'),
(29, 3, 'Đen', '3U', 'PROD-3-Đen-3U', 70, NULL, '2025-10-28 03:32:10'),
(30, 9, 'Trắng', '3U', 'PROD-9-Trắng-3U', 70, NULL, '2025-10-28 03:32:35'),
(31, 9, 'Trắng', '4U', 'PROD-9-Trắng-4U', 90, NULL, '2025-10-28 03:32:35'),
(34, 12, 'Xanh', '3U', 'PROD-12-Xanh-3U', 60, NULL, '2025-10-28 03:34:23'),
(35, 12, 'Xanh', '4U', 'PROD-12-Xanh-4U', 80, NULL, '2025-10-28 03:34:23'),
(36, 15, 'Vàng', '3U', 'PROD-15-Vàng-3U', 80, NULL, '2025-10-28 03:34:47'),
(37, 15, 'Vàng', '4U', 'PROD-15-Vàng-4U', 100, NULL, '2025-10-28 03:34:47'),
(38, 33, 'Trắng', '4U', 'PROD-33-Trắng-4U', 70, NULL, '2025-10-28 03:38:38'),
(39, 33, 'Trắng', '3U', 'PROD-33-Trắng-3U', 85, NULL, '2025-10-28 03:38:38'),
(40, 37, 'Xanh', '3U', 'PROD-37-Xanh-3U', 70, NULL, '2025-10-28 03:39:49'),
(41, 37, 'Xanh', '4U', 'PROD-37-Xanh-4U', 80, NULL, '2025-10-28 03:39:49'),
(42, 38, 'Đen', '3U', 'PROD-38-Đen-3U', 70, NULL, '2025-10-28 03:40:17'),
(43, 38, 'Đen', '4U', 'PROD-38-Đen-4U', 80, NULL, '2025-10-28 03:40:17'),
(44, 39, 'Xanh', '3U', 'PROD-39-Xanh-3U', 70, NULL, '2025-10-28 03:40:40'),
(45, 39, 'Xanh', '4U', 'PROD-39-Xanh-4U', 40, NULL, '2025-10-28 03:40:40'),
(46, 40, 'Trắng', '3U', 'PROD-40-Trắng-3U', 85, NULL, '2025-10-28 03:41:14'),
(47, 40, 'Trắng', '4U', 'PROD-40-Trắng-4U', 65, NULL, '2025-10-28 03:41:14'),
(50, 42, 'Xanh Navy', '3U', 'PROD-42-Xanh Navy-3U', 70, NULL, '2025-10-28 03:42:00'),
(51, 42, 'Xanh Navy', '4U', 'PROD-42-Xanh Navy-4U', 80, NULL, '2025-10-28 03:42:00'),
(52, 43, 'Đỏ', '3U', 'PROD-43-Đỏ-3U', 70, NULL, '2025-10-28 03:45:16'),
(53, 43, 'Đỏ', '4U', 'PROD-43-Đỏ-4U', 80, NULL, '2025-10-28 03:45:16'),
(56, 49, 'Vàng', '3U', 'PROD-49-Vàng-3U', 60, NULL, '2025-10-28 04:11:02'),
(57, 49, 'Vàng', '4U', 'PROD-49-Vàng-4U', 70, NULL, '2025-10-28 04:11:02'),
(58, 56, 'Xanh', '3U', 'PROD-56-Xanh-3U', 60, NULL, '2025-10-28 04:15:51'),
(59, 56, 'Xanh', '4U', 'PROD-56-Xanh-4U', 70, NULL, '2025-10-28 04:15:51'),
(60, 58, 'Trắng', '3U', 'PROD-58-Trắng-3U', 30, NULL, '2025-10-28 04:18:07'),
(61, 58, 'Trắng', '4U', 'PROD-58-Trắng-4U', 20, NULL, '2025-10-28 04:18:07'),
(62, 59, 'Nâu', '3U', 'PROD-59-Nâu-3U', 70, NULL, '2025-10-28 04:20:26'),
(63, 59, 'Nâu', '4U', 'PROD-59-Nâu-4U', 80, NULL, '2025-10-28 04:20:26'),
(64, 60, 'Nâu', '3U', 'PROD-60-Nâu-3U', 50, NULL, '2025-10-28 04:50:55'),
(65, 60, 'Nâu', '4U', 'PROD-60-Nâu-4U', 40, NULL, '2025-10-28 04:50:56'),
(66, 68, 'Hồng', '3U', 'PROD-68-Hồng-3U', 50, NULL, '2025-10-28 04:54:48'),
(67, 68, 'Hồng', '4U', 'PROD-68-Hồng-4U', 35, NULL, '2025-10-28 04:54:48'),
(68, 67, 'Xanh Navy', '3U', 'PROD-67-Xanh Navy-3U', 60, NULL, '2025-10-28 04:57:04'),
(69, 67, 'Xanh Navy', '4U', 'PROD-67-Xanh Navy-4U', 70, NULL, '2025-10-28 04:57:04'),
(70, 64, 'Xanh', '3U', 'PROD-64-Xanh-3U', 60, NULL, '2025-10-28 05:00:02'),
(71, 64, 'Xanh', '4U', 'PROD-64-Xanh-4U', 30, NULL, '2025-10-28 05:00:02'),
(72, 63, 'Hồng', '3U', 'PROD-63-Hồng-3U', 60, NULL, '2025-10-28 13:07:32'),
(73, 63, 'Hồng', '4U', 'PROD-63-Hồng-4U', 40, NULL, '2025-10-28 13:07:32'),
(74, 114, 'Nâu', '3U', 'Vợt-PickleBall-Head-Gravity-Tour-Lite-Nâu-SIZE-3U', 60, NULL, '2025-10-28 13:23:41'),
(75, 114, 'Nâu', '4U', 'Vợt-PickleBall-Head-Gravity-Tour-Lite-Nâu-SIZE-4U', 50, NULL, '2025-10-28 13:23:41'),
(76, 115, 'Đen', '3U', 'Vợt-PickleBall-Head-Extreme-Tour-Lite-2023-Đen-SIZE-3U', 75, NULL, '2025-10-28 13:31:58'),
(77, 115, 'Đen', '4U', 'Vợt-PickleBall-Head-Extreme-Tour-Lite-2023-Đen-SIZE-4U', 35, NULL, '2025-10-28 13:31:58'),
(78, 116, 'Trắng', '3U', 'Vợt-PickleBall-Head-SPARK-ELITE-(V1)-Trắng-SIZE-3U', 45, NULL, '2025-10-28 13:34:45'),
(79, 116, 'Trắng', '4U', 'Vợt-PickleBall-Head-SPARK-ELITE-(V1)-Trắng-SIZE-4U', 25, NULL, '2025-10-28 13:34:45'),
(80, 86, 'Xanh', '3U', 'PROD-86-Xanh-3U', 54, NULL, '2025-10-28 13:35:48'),
(81, 86, 'Xanh', '4U', 'PROD-86-Xanh-4U', 32, NULL, '2025-10-28 13:35:48'),
(82, 87, 'Hồng', '3U', 'PROD-87-Hồng-3U', 67, NULL, '2025-10-28 13:36:07'),
(83, 87, 'Hồng', '4U', 'PROD-87-Hồng-4U', 45, NULL, '2025-10-28 13:36:07'),
(84, 88, 'Cam', '3U', 'PROD-88-Cam-3U', 62, NULL, '2025-10-28 13:36:36'),
(85, 88, 'Cam', '4U', 'PROD-88-Cam-4U', 55, NULL, '2025-10-28 13:36:36'),
(86, 89, 'Xanh', '3U', 'PROD-89-Xanh-3U', 70, NULL, '2025-10-28 13:36:57'),
(87, 89, 'Xanh', '4U', 'PROD-89-Xanh-4U', 60, NULL, '2025-10-28 13:36:57'),
(90, 91, 'Đen', '3U', 'PROD-91-Đen-3U', 73, NULL, '2025-10-28 13:37:33'),
(91, 91, 'Đen', '4U', 'PROD-91-Đen-4U', 65, NULL, '2025-10-28 13:37:33'),
(92, 92, 'Đen', '3U', 'PROD-92-Đen-3U', 89, NULL, '2025-10-28 13:37:54'),
(93, 92, 'Đen', '4U', 'PROD-92-Đen-4U', 78, NULL, '2025-10-28 13:37:54'),
(94, 93, 'Hồng', '3U', 'PROD-93-Hồng-3U', 76, NULL, '2025-10-28 13:38:14'),
(95, 93, 'Hồng', '4U', 'PROD-93-Hồng-4U', 63, NULL, '2025-10-28 13:38:14'),
(96, 94, 'Hồng', '3U', 'PROD-94-Hồng-3U', 54, NULL, '2025-10-28 13:38:36'),
(97, 94, 'Hồng', '4U', 'PROD-94-Hồng-4U', 42, NULL, '2025-10-28 13:38:36'),
(98, 95, 'Xanh', '3U', 'PROD-95-Xanh-3U', 55, NULL, '2025-10-28 13:38:59'),
(99, 95, 'Xanh', '4U', 'PROD-95-Xanh-4U', 43, NULL, '2025-10-28 13:38:59'),
(100, 96, 'Trắng', '38', 'PROD-96-Trắng-38', 40, NULL, '2025-10-28 13:40:30'),
(101, 96, 'Trắng', '39', 'PROD-96-Trắng-39', 35, NULL, '2025-10-28 13:40:30'),
(102, 96, 'Trắng', '40', 'PROD-96-Trắng-40', 42, NULL, '2025-10-28 13:40:30'),
(103, 96, 'Trắng', '41', 'PROD-96-Trắng-41', 60, NULL, '2025-10-28 13:40:30'),
(104, 96, 'Trắng', '42', 'PROD-96-Trắng-42', 35, NULL, '2025-10-28 13:40:30'),
(105, 96, 'Trắng', '43', 'PROD-96-Trắng-43', 32, NULL, '2025-10-28 13:40:30'),
(106, 96, 'Trắng', '44', 'PROD-96-Trắng-44', 23, NULL, '2025-10-28 13:40:30'),
(107, 97, 'Cam', '38', 'PROD-97-Cam-38', 40, NULL, '2025-10-28 14:09:17'),
(108, 97, 'Cam', '39', 'PROD-97-Cam-39', 43, NULL, '2025-10-28 14:09:17'),
(109, 97, 'Cam', '40', 'PROD-97-Cam-40', 60, NULL, '2025-10-28 14:09:17'),
(110, 97, 'Cam', '41', 'PROD-97-Cam-41', 50, NULL, '2025-10-28 14:09:17'),
(111, 97, 'Cam', '42', 'PROD-97-Cam-42', 53, NULL, '2025-10-28 14:09:17'),
(112, 97, 'Cam', '43', 'PROD-97-Cam-43', 42, NULL, '2025-10-28 14:09:17'),
(113, 97, 'Cam', '44', 'PROD-97-Cam-44', 34, NULL, '2025-10-28 14:09:17'),
(114, 98, 'Xanh Navy', '38', 'PROD-98-Xanh Navy-38', 60, NULL, '2025-10-28 14:09:48'),
(115, 98, 'Xanh Navy', '39', 'PROD-98-Xanh Navy-39', 40, NULL, '2025-10-28 14:09:48'),
(116, 98, 'Xanh Navy', '40', 'PROD-98-Xanh Navy-40', 32, NULL, '2025-10-28 14:09:48'),
(117, 98, 'Xanh Navy', '41', 'PROD-98-Xanh Navy-41', 56, NULL, '2025-10-28 14:09:48'),
(118, 98, 'Xanh Navy', '42', 'PROD-98-Xanh Navy-42', 78, NULL, '2025-10-28 14:09:48'),
(119, 98, 'Xanh Navy', '43', 'PROD-98-Xanh Navy-43', 75, NULL, '2025-10-28 14:09:48'),
(120, 98, 'Xanh Navy', '44', 'PROD-98-Xanh Navy-44', 80, NULL, '2025-10-28 14:09:48'),
(121, 99, 'Hồng', '38', 'PROD-99-Hồng-38', 60, NULL, '2025-10-28 14:10:27'),
(122, 99, 'Hồng', '39', 'PROD-99-Hồng-39', 32, NULL, '2025-10-28 14:10:27'),
(123, 99, 'Hồng', '40', 'PROD-99-Hồng-40', 40, NULL, '2025-10-28 14:10:27'),
(124, 99, 'Hồng', '41', 'PROD-99-Hồng-41', 32, NULL, '2025-10-28 14:10:27'),
(125, 99, 'Hồng', '42', 'PROD-99-Hồng-42', 30, NULL, '2025-10-28 14:10:27'),
(126, 99, 'Hồng', '43', 'PROD-99-Hồng-43', 20, NULL, '2025-10-28 14:10:28'),
(127, 99, 'Hồng', '44', 'PROD-99-Hồng-44', 15, NULL, '2025-10-28 14:10:28'),
(128, 100, 'Xanh', '38', 'PROD-100-Xanh-38', 60, NULL, '2025-10-28 14:11:10'),
(129, 100, 'Xanh', '39', 'PROD-100-Xanh-39', 40, NULL, '2025-10-28 14:11:10'),
(130, 100, 'Xanh', '40', 'PROD-100-Xanh-40', 30, NULL, '2025-10-28 14:11:10'),
(131, 100, 'Xanh', '41', 'PROD-100-Xanh-41', 45, NULL, '2025-10-28 14:11:10'),
(132, 100, 'Xanh', '42', 'PROD-100-Xanh-42', 21, NULL, '2025-10-28 14:11:10'),
(133, 100, 'Xanh', '43', 'PROD-100-Xanh-43', 24, NULL, '2025-10-28 14:11:10'),
(134, 100, 'Xanh', '44', 'PROD-100-Xanh-44', 90, NULL, '2025-10-28 14:11:10'),
(135, 101, 'Trắng', '38', 'PROD-101-Trắng-38', 30, NULL, '2025-10-28 14:11:43'),
(136, 101, 'Trắng', '39', 'PROD-101-Trắng-39', 32, NULL, '2025-10-28 14:11:43'),
(137, 101, 'Trắng', '40', 'PROD-101-Trắng-40', 20, NULL, '2025-10-28 14:11:43'),
(138, 101, 'Trắng', '41', 'PROD-101-Trắng-41', 24, NULL, '2025-10-28 14:11:43'),
(139, 101, 'Trắng', '42', 'PROD-101-Trắng-42', 60, NULL, '2025-10-28 14:11:43'),
(140, 101, 'Trắng', '43', 'PROD-101-Trắng-43', 59, NULL, '2025-10-28 14:11:43'),
(141, 101, 'Trắng', '44', 'PROD-101-Trắng-44', 53, NULL, '2025-10-28 14:11:44'),
(142, 102, 'Xám', '38', 'PROD-102-Xám-38', 30, NULL, '2025-10-28 14:12:09'),
(143, 102, 'Xám', '39', 'PROD-102-Xám-39', 33, NULL, '2025-10-28 14:12:09'),
(144, 102, 'Xám', '40', 'PROD-102-Xám-40', 32, NULL, '2025-10-28 14:12:09'),
(145, 102, 'Xám', '41', 'PROD-102-Xám-41', 50, NULL, '2025-10-28 14:12:09'),
(146, 102, 'Xám', '42', 'PROD-102-Xám-42', 55, NULL, '2025-10-28 14:12:09'),
(147, 102, 'Xám', '43', 'PROD-102-Xám-43', 60, NULL, '2025-10-28 14:12:09'),
(148, 102, 'Xám', '44', 'PROD-102-Xám-44', 32, NULL, '2025-10-28 14:12:09'),
(149, 103, 'Xanh Navy', '38', 'PROD-103-Xanh Navy-38', 53, NULL, '2025-10-28 14:12:35'),
(150, 103, 'Xanh Navy', '39', 'PROD-103-Xanh Navy-39', 32, NULL, '2025-10-28 14:12:35'),
(151, 103, 'Xanh Navy', '40', 'PROD-103-Xanh Navy-40', 49, NULL, '2025-10-28 14:12:35'),
(152, 103, 'Xanh Navy', '41', 'PROD-103-Xanh Navy-41', 40, NULL, '2025-10-28 14:12:35'),
(153, 103, 'Xanh Navy', '42', 'PROD-103-Xanh Navy-42', 40, NULL, '2025-10-28 14:12:35'),
(154, 103, 'Xanh Navy', '43', 'PROD-103-Xanh Navy-43', 32, NULL, '2025-10-28 14:12:35'),
(155, 103, 'Xanh Navy', '44', 'PROD-103-Xanh Navy-44', 56, NULL, '2025-10-28 14:12:35'),
(156, 104, 'Trắng', '38', 'PROD-104-Trắng-38', 40, NULL, '2025-10-28 14:13:03'),
(157, 104, 'Trắng', '39', 'PROD-104-Trắng-39', 32, NULL, '2025-10-28 14:13:03'),
(158, 104, 'Trắng', '40', 'PROD-104-Trắng-40', 53, NULL, '2025-10-28 14:13:03'),
(159, 104, 'Trắng', '41', 'PROD-104-Trắng-41', 40, NULL, '2025-10-28 14:13:03'),
(160, 104, 'Trắng', '42', 'PROD-104-Trắng-42', 32, NULL, '2025-10-28 14:13:03'),
(161, 104, 'Trắng', '43', 'PROD-104-Trắng-43', 46, NULL, '2025-10-28 14:13:03'),
(162, 104, 'Trắng', '44', 'PROD-104-Trắng-44', 31, NULL, '2025-10-28 14:13:03'),
(163, 105, 'Trắng', '38', 'PROD-105-Trắng-38', 31, NULL, '2025-10-28 14:13:26'),
(164, 105, 'Trắng', '39', 'PROD-105-Trắng-39', 30, NULL, '2025-10-28 14:13:26'),
(165, 105, 'Trắng', '40', 'PROD-105-Trắng-40', 32, NULL, '2025-10-28 14:13:26'),
(166, 105, 'Trắng', '41', 'PROD-105-Trắng-41', 40, NULL, '2025-10-28 14:13:26'),
(167, 105, 'Trắng', '42', 'PROD-105-Trắng-42', 65, NULL, '2025-10-28 14:13:26'),
(168, 105, 'Trắng', '43', 'PROD-105-Trắng-43', 67, NULL, '2025-10-28 14:13:26'),
(169, 105, 'Trắng', '44', 'PROD-105-Trắng-44', 70, NULL, '2025-10-28 14:13:26'),
(170, 106, 'Trắng', '38', 'PROD-106-Trắng-38', 35, NULL, '2025-10-28 14:13:50'),
(171, 106, 'Trắng', '39', 'PROD-106-Trắng-39', 43, NULL, '2025-10-28 14:13:50'),
(172, 106, 'Trắng', '40', 'PROD-106-Trắng-40', 33, NULL, '2025-10-28 14:13:50'),
(173, 106, 'Trắng', '41', 'PROD-106-Trắng-41', 40, NULL, '2025-10-28 14:13:50'),
(174, 106, 'Trắng', '42', 'PROD-106-Trắng-42', 31, NULL, '2025-10-28 14:13:50'),
(175, 106, 'Trắng', '43', 'PROD-106-Trắng-43', 34, NULL, '2025-10-28 14:13:50'),
(176, 106, 'Trắng', '44', 'PROD-106-Trắng-44', 68, NULL, '2025-10-28 14:13:50'),
(177, 107, 'Trắng', '38', 'PROD-107-Trắng-38', 50, NULL, '2025-10-28 14:14:33'),
(178, 107, 'Trắng', '39', 'PROD-107-Trắng-39', 32, NULL, '2025-10-28 14:14:33'),
(179, 107, 'Trắng', '40', 'PROD-107-Trắng-40', 67, NULL, '2025-10-28 14:14:33'),
(180, 107, 'Trắng', '41', 'PROD-107-Trắng-41', 53, NULL, '2025-10-28 14:14:33'),
(181, 107, 'Trắng', '42', 'PROD-107-Trắng-42', 34, NULL, '2025-10-28 14:14:33'),
(182, 107, 'Trắng', '43', 'PROD-107-Trắng-43', 23, NULL, '2025-10-28 14:14:33'),
(183, 107, 'Trắng', '44', 'PROD-107-Trắng-44', 38, NULL, '2025-10-28 14:14:33'),
(184, 109, 'Trắng', '38', 'PROD-109-Trắng-38', 40, NULL, '2025-10-28 14:15:03'),
(185, 109, 'Trắng', '39', 'PROD-109-Trắng-39', 54, NULL, '2025-10-28 14:15:03'),
(186, 109, 'Trắng', '40', 'PROD-109-Trắng-40', 30, NULL, '2025-10-28 14:15:03'),
(187, 109, 'Trắng', '41', 'PROD-109-Trắng-41', 42, NULL, '2025-10-28 14:15:03'),
(188, 109, 'Trắng', '42', 'PROD-109-Trắng-42', 20, NULL, '2025-10-28 14:15:03'),
(189, 109, 'Trắng', '43', 'PROD-109-Trắng-43', 25, NULL, '2025-10-28 14:15:03'),
(190, 109, 'Trắng', '44', 'PROD-109-Trắng-44', 67, NULL, '2025-10-28 14:15:03'),
(191, 110, 'Đỏ', '38', 'PROD-110-Đỏ-38', 30, NULL, '2025-10-28 14:15:30'),
(192, 110, 'Đỏ', '39', 'PROD-110-Đỏ-39', 40, NULL, '2025-10-28 14:15:30'),
(193, 110, 'Đỏ', '40', 'PROD-110-Đỏ-40', 21, NULL, '2025-10-28 14:15:30'),
(194, 110, 'Đỏ', '41', 'PROD-110-Đỏ-41', 40, NULL, '2025-10-28 14:15:30'),
(195, 110, 'Đỏ', '42', 'PROD-110-Đỏ-42', 65, NULL, '2025-10-28 14:15:30'),
(196, 110, 'Đỏ', '43', 'PROD-110-Đỏ-43', 70, NULL, '2025-10-28 14:15:30'),
(197, 110, 'Đỏ', '44', 'PROD-110-Đỏ-44', 67, NULL, '2025-10-28 14:15:30'),
(198, 111, 'Trắng', '38', 'PROD-111-Trắng-38', 52, NULL, '2025-10-28 14:15:57'),
(199, 111, 'Trắng', '39', 'PROD-111-Trắng-39', 35, NULL, '2025-10-28 14:15:57'),
(200, 111, 'Trắng', '40', 'PROD-111-Trắng-40', 100, NULL, '2025-10-28 14:15:57'),
(201, 111, 'Trắng', '41', 'PROD-111-Trắng-41', 102, NULL, '2025-10-28 14:15:57'),
(202, 111, 'Trắng', '42', 'PROD-111-Trắng-42', 110, NULL, '2025-10-28 14:15:57'),
(203, 111, 'Trắng', '43', 'PROD-111-Trắng-43', 120, NULL, '2025-10-28 14:15:57'),
(204, 111, 'Trắng', '44', 'PROD-111-Trắng-44', 123, NULL, '2025-10-28 14:15:57'),
(205, 112, 'Trắng', '38', 'PROD-112-Trắng-38', 123, NULL, '2025-10-28 14:16:37'),
(206, 112, 'Trắng', '39', 'PROD-112-Trắng-39', 143, NULL, '2025-10-28 14:16:37'),
(207, 112, 'Trắng', '40', 'PROD-112-Trắng-40', 134, NULL, '2025-10-28 14:16:37'),
(208, 112, 'Trắng', '41', 'PROD-112-Trắng-41', 20, NULL, '2025-10-28 14:16:37'),
(209, 112, 'Trắng', '42', 'PROD-112-Trắng-42', 25, NULL, '2025-10-28 14:16:37'),
(210, 112, 'Trắng', '43', 'PROD-112-Trắng-43', 40, NULL, '2025-10-28 14:16:37'),
(211, 112, 'Trắng', '44', 'PROD-112-Trắng-44', 35, NULL, '2025-10-28 14:16:37'),
(212, 113, 'Đỏ', '38', 'PROD-113-Đỏ-38', 45, NULL, '2025-10-28 14:17:15'),
(213, 113, 'Đỏ', '39', 'PROD-113-Đỏ-39', 33, NULL, '2025-10-28 14:17:15'),
(214, 113, 'Đỏ', '40', 'PROD-113-Đỏ-40', 132, NULL, '2025-10-28 14:17:15'),
(215, 113, 'Đỏ', '41', 'PROD-113-Đỏ-41', 120, NULL, '2025-10-28 14:17:15'),
(216, 113, 'Đỏ', '42', 'PROD-113-Đỏ-42', 150, NULL, '2025-10-28 14:17:15'),
(217, 113, 'Đỏ', '43', 'PROD-113-Đỏ-43', 50, NULL, '2025-10-28 14:17:15'),
(218, 113, 'Đỏ', '44', 'PROD-113-Đỏ-44', 65, NULL, '2025-10-28 14:17:15'),
(219, 117, 'Đỏ', '3U', 'Vợt-PickleBall-Head-Pack-Flash-chính-hãng-Đỏ-SIZE-3U', 55, NULL, '2025-10-28 14:24:14'),
(220, 117, 'Đỏ', '4U', 'Vợt-PickleBall-Head-Pack-Flash-chính-hãng-Đỏ-SIZE-4U', 63, NULL, '2025-10-28 14:24:14'),
(221, 118, 'Đỏ', '3U', 'Vợt-PickleBall-Head-RADICAL-TOUR-EX-RAW-Đỏ-SIZE-3U', 67, NULL, '2025-10-28 14:26:46'),
(222, 118, 'Đỏ', '4U', 'Vợt-PickleBall-Head-RADICAL-TOUR-EX-RAW-Đỏ-SIZE-4U', 73, NULL, '2025-10-28 14:26:46'),
(223, 119, 'Xanh Navy', '3U', 'Vợt-tennis-Wilson-Traid-Three-FRM-2-Xanh-Navy-SIZE-3U', 53, NULL, '2025-10-29 02:04:14'),
(224, 119, 'Xanh Navy', '4U', 'Vợt-tennis-Wilson-Traid-Three-FRM-2-Xanh-Navy-SIZE-4U', 36, NULL, '2025-10-29 02:04:14'),
(225, 120, 'Vàng', '3U', 'Vợt-Tennis-Wilson-Hyper-Hammer-5.3-Vàng-SIZE-3U', 45, NULL, '2025-10-29 02:07:01'),
(226, 120, 'Vàng', '4U', 'Vợt-Tennis-Wilson-Hyper-Hammer-5.3-Vàng-SIZE-4U', 43, NULL, '2025-10-29 02:07:01'),
(227, 121, 'Xanh Navy', '3U', 'Vợt-tennis-Wilson-Ultra-Team-V4.0-RKT-2-Xanh-Navy-SIZE-3U', 53, NULL, '2025-10-29 02:09:41'),
(228, 121, 'Xanh Navy', '4U', 'Vợt-tennis-Wilson-Ultra-Team-V4.0-RKT-2-Xanh-Navy-SIZE-4U', 34, NULL, '2025-10-29 02:09:41'),
(229, 122, 'Nâu', '3U', 'Vợt-tennis-Wilson-Pro-Staff-97L-V14-FRM2-Nâu-SIZE-3U', 34, NULL, '2025-10-29 02:11:54'),
(230, 122, 'Nâu', '4U', 'Vợt-tennis-Wilson-Pro-Staff-97L-V14-FRM2-Nâu-SIZE-4U', 43, NULL, '2025-10-29 02:11:54'),
(231, 123, 'Xanh', '3U', 'Vợt-tennis-trẻ-em-Wilson-Blade-V7.0-RKT-26-Xanh-SIZE-3U', 32, NULL, '2025-10-29 02:15:00'),
(232, 123, 'Xanh', '4U', 'Vợt-tennis-trẻ-em-Wilson-Blade-V7.0-RKT-26-Xanh-SIZE-4U', 23, NULL, '2025-10-29 02:15:00'),
(233, 124, 'Trắng', '3U', 'Vợt-tennis-Wilson-Shift-99L-V1-(285gr)-Trắng-SIZE-3U', 53, NULL, '2025-10-29 02:16:59'),
(234, 124, 'Trắng', '4U', 'Vợt-tennis-Wilson-Shift-99L-V1-(285gr)-Trắng-SIZE-4U', 45, NULL, '2025-10-29 02:16:59'),
(235, 125, 'Đỏ', '3U', 'Vợt-tennis-Wilson-Traid-Five-FRM-2-(267gr)-Đỏ-SIZE-3U', 34, NULL, '2025-10-29 02:19:19'),
(236, 125, 'Đỏ', '4U', 'Vợt-tennis-Wilson-Traid-Five-FRM-2-(267gr)-Đỏ-SIZE-4U', 64, NULL, '2025-10-29 02:19:19'),
(237, 126, 'Đen', '3U', 'Vợt-tennis-Wilson-Clash-100L-V2.0-Noir-limited-Đen-SIZE-3U', 65, NULL, '2025-10-29 02:23:14'),
(238, 126, 'Đen', '4U', 'Vợt-tennis-Wilson-Clash-100L-V2.0-Noir-limited-Đen-SIZE-4U', 54, NULL, '2025-10-29 02:23:14'),
(239, 127, 'Trắng', '3U', 'Vợt-Tennis-Pure-Drive-Wimbledom-300gr-Trắng-SIZE-3U', 54, NULL, '2025-10-29 08:42:06'),
(240, 127, 'Trắng', '4U', 'Vợt-Tennis-Pure-Drive-Wimbledom-300gr-Trắng-SIZE-4U', 23, NULL, '2025-10-29 08:42:06'),
(245, 130, 'Trắng', '3U', 'Vợt-Tennis-Babolat-Strike-Evo-290gr-Trắng-SIZE-3U', 60, NULL, '2025-10-29 14:20:31'),
(246, 130, 'Trắng', '4U', 'Vợt-Tennis-Babolat-Strike-Evo-290gr-Trắng-SIZE-4U', 43, NULL, '2025-10-29 14:20:31'),
(247, 131, 'Xanh Navy', '3U', 'Vợt-Tennis-Babolat-Pure-Drive-Junior-25-Xanh-Navy-SIZE-3U', 34, NULL, '2025-10-29 14:22:32'),
(248, 131, 'Xanh Navy', '4U', 'Vợt-Tennis-Babolat-Pure-Drive-Junior-25-Xanh-Navy-SIZE-4U', 23, NULL, '2025-10-29 14:22:32'),
(249, 132, 'Tím', '3U', 'Vợt-Tennis-Babolat-Pure-Drive-Junior-26-Girl-Tím-SIZE-3U', 56, NULL, '2025-10-29 14:26:54'),
(250, 132, 'Tím', '4U', 'Vợt-Tennis-Babolat-Pure-Drive-Junior-26-Girl-Tím-SIZE-4U', 55, NULL, '2025-10-29 14:26:54'),
(251, 133, 'Cam', '3U', 'Vợt-tennis-Babolat-Pure-Strike-18/20-305gr-Cam-SIZE-3U', 46, NULL, '2025-10-29 14:28:57'),
(252, 133, 'Cam', '4U', 'Vợt-tennis-Babolat-Pure-Strike-18/20-305gr-Cam-SIZE-4U', 65, NULL, '2025-10-29 14:28:57'),
(253, 134, 'Tím', '3U', 'Vợt-Tennis-Babolat-Evo-Aero-Pink-275gr-Tím-SIZE-3U', 67, NULL, '2025-10-29 14:33:19'),
(254, 134, 'Tím', '4U', 'Vợt-Tennis-Babolat-Evo-Aero-Pink-275gr-Tím-SIZE-4U', 74, NULL, '2025-10-29 14:33:19'),
(255, 135, 'Nâu', '3U', 'Vợt-Tennis-Babolat-Pure-Drive-Team-Wimbledon-285gr-Nâu-SIZE-3U', 43, NULL, '2025-10-29 14:35:21'),
(256, 135, 'Nâu', '4U', 'Vợt-Tennis-Babolat-Pure-Drive-Team-Wimbledon-285gr-Nâu-SIZE-4U', 21, NULL, '2025-10-29 14:35:21'),
(257, 136, 'Vàng', '3U', 'Vợt-Tennis-Babolat-Evo-Aero-Lite-Unstrung-260gr--Vàng-SIZE-3U', 50, NULL, '2025-10-29 14:37:07'),
(258, 136, 'Vàng', '4U', 'Vợt-Tennis-Babolat-Evo-Aero-Lite-Unstrung-260gr--Vàng-SIZE-4U', 32, NULL, '2025-10-29 14:37:07'),
(259, 137, 'Xanh', '3U', 'Vợt-Tennis-Babolat-Boost-Drive-260gr-Xanh-SIZE-3U', 49, NULL, '2025-10-29 14:39:18'),
(260, 137, 'Xanh', '4U', 'Vợt-Tennis-Babolat-Boost-Drive-260gr-Xanh-SIZE-4U', 38, NULL, '2025-10-29 14:39:18'),
(261, 138, 'Hồng', '3U', 'Vợt-Tennis-Babolat-Boost-Aero-Rafa-260gr-Hồng-SIZE-3U', 86, NULL, '2025-10-29 14:41:03'),
(262, 138, 'Hồng', '4U', 'Vợt-Tennis-Babolat-Boost-Aero-Rafa-260gr-Hồng-SIZE-4U', 103, NULL, '2025-10-29 14:41:03'),
(263, 139, 'Cam', 'S', 'Áo-cầu-lông-Kamito-V1-KMAH250752---Trắng-cam-Cam-SIZE-S', 103, NULL, '2025-10-30 01:54:15'),
(264, 139, 'Cam', 'M', 'Áo-cầu-lông-Kamito-V1-KMAH250752---Trắng-cam-Cam-SIZE-M', 140, NULL, '2025-10-30 01:54:15'),
(265, 139, 'Cam', 'L', 'Áo-cầu-lông-Kamito-V1-KMAH250752---Trắng-cam-Cam-SIZE-L', 120, NULL, '2025-10-30 01:54:15'),
(266, 139, 'Cam', 'XL', 'Áo-cầu-lông-Kamito-V1-KMAH250752---Trắng-cam-Cam-SIZE-XL', 124, NULL, '2025-10-30 01:54:15'),
(267, 139, 'Cam', 'XXL', 'Áo-cầu-lông-Kamito-V1-KMAH250752---Trắng-cam-Cam-SIZE-XXL', 110, NULL, '2025-10-30 01:54:15'),
(268, 140, 'Xanh Navy', 'S', 'Áo-cầu-lông-Kamito-V1-KMAH250755---Trắng-xanh-Xanh-Navy-SIZE-S', 40, NULL, '2025-10-30 02:08:06'),
(269, 140, 'Xanh Navy', 'M', 'Áo-cầu-lông-Kamito-V1-KMAH250755---Trắng-xanh-Xanh-Navy-SIZE-M', 31, NULL, '2025-10-30 02:08:06'),
(270, 140, 'Xanh Navy', 'L', 'Áo-cầu-lông-Kamito-V1-KMAH250755---Trắng-xanh-Xanh-Navy-SIZE-L', 103, NULL, '2025-10-30 02:08:06'),
(271, 140, 'Xanh Navy', 'XL', 'Áo-cầu-lông-Kamito-V1-KMAH250755---Trắng-xanh-Xanh-Navy-SIZE-XL', 55, NULL, '2025-10-30 02:08:06'),
(272, 140, 'Xanh Navy', 'XXL', 'Áo-cầu-lông-Kamito-V1-KMAH250755---Trắng-xanh-Xanh-Navy-SIZE-XXL', 200, NULL, '2025-10-30 02:08:06'),
(273, 141, 'Xanh Navy', 'S', 'Áo-Cầu-Lông-Kamito-Galaxy-3-KMAP245328-Nam---Xanh-Xanh-Navy-SIZE-S', 60, NULL, '2025-10-30 02:23:27'),
(274, 141, 'Xanh Navy', 'M', 'Áo-Cầu-Lông-Kamito-Galaxy-3-KMAP245328-Nam---Xanh-Xanh-Navy-SIZE-M', 32, NULL, '2025-10-30 02:23:27'),
(275, 141, 'Xanh Navy', 'L', 'Áo-Cầu-Lông-Kamito-Galaxy-3-KMAP245328-Nam---Xanh-Xanh-Navy-SIZE-L', 102, NULL, '2025-10-30 02:23:27'),
(276, 141, 'Xanh Navy', 'XL', 'Áo-Cầu-Lông-Kamito-Galaxy-3-KMAP245328-Nam---Xanh-Xanh-Navy-SIZE-XL', 142, NULL, '2025-10-30 02:23:27'),
(277, 141, 'Xanh Navy', 'XXL', 'Áo-Cầu-Lông-Kamito-Galaxy-3-KMAP245328-Nam---Xanh-Xanh-Navy-SIZE-XXL', 156, NULL, '2025-10-30 02:23:27'),
(278, 142, 'Trắng', 'S', 'Áo-cầu-lông-Kamito-Galaxy-1-KMAP245150-nam-Trắng-SIZE-S', 35, NULL, '2025-10-30 02:28:17'),
(279, 142, 'Trắng', 'M', 'Áo-cầu-lông-Kamito-Galaxy-1-KMAP245150-nam-Trắng-SIZE-M', 54, NULL, '2025-10-30 02:28:17'),
(280, 142, 'Trắng', 'L', 'Áo-cầu-lông-Kamito-Galaxy-1-KMAP245150-nam-Trắng-SIZE-L', 46, NULL, '2025-10-30 02:28:17'),
(281, 142, 'Trắng', 'XL', 'Áo-cầu-lông-Kamito-Galaxy-1-KMAP245150-nam-Trắng-SIZE-XL', 62, NULL, '2025-10-30 02:28:17'),
(282, 142, 'Trắng', 'XXL', 'Áo-cầu-lông-Kamito-Galaxy-1-KMAP245150-nam-Trắng-SIZE-XXL', 70, NULL, '2025-10-30 02:28:17'),
(283, 143, 'Trắng', 'S', 'Áo-Cầu-Lông-Kamito-Galaxy-2-KMAP245250F-Nữ--Trắng-SIZE-S', 50, NULL, '2025-10-30 02:30:41'),
(284, 143, 'Trắng', 'M', 'Áo-Cầu-Lông-Kamito-Galaxy-2-KMAP245250F-Nữ--Trắng-SIZE-M', 32, NULL, '2025-10-30 02:30:41'),
(285, 143, 'Trắng', 'L', 'Áo-Cầu-Lông-Kamito-Galaxy-2-KMAP245250F-Nữ--Trắng-SIZE-L', 26, NULL, '2025-10-30 02:30:41'),
(286, 143, 'Trắng', 'XL', 'Áo-Cầu-Lông-Kamito-Galaxy-2-KMAP245250F-Nữ--Trắng-SIZE-XL', 102, NULL, '2025-10-30 02:30:41'),
(287, 143, 'Trắng', 'XXL', 'Áo-Cầu-Lông-Kamito-Galaxy-2-KMAP245250F-Nữ--Trắng-SIZE-XXL', 54, NULL, '2025-10-30 02:30:41'),
(288, 144, 'Đỏ', 'S', 'Áo-cầu-lông-Kamito-Galaxy-2-KMAH243480-nam-Đỏ-SIZE-S', 40, NULL, '2025-10-30 02:32:32'),
(289, 144, 'Đỏ', 'M', 'Áo-cầu-lông-Kamito-Galaxy-2-KMAH243480-nam-Đỏ-SIZE-M', 35, NULL, '2025-10-30 02:32:32'),
(290, 144, 'Đỏ', 'L', 'Áo-cầu-lông-Kamito-Galaxy-2-KMAH243480-nam-Đỏ-SIZE-L', 124, NULL, '2025-10-30 02:32:32'),
(291, 144, 'Đỏ', 'XL', 'Áo-cầu-lông-Kamito-Galaxy-2-KMAH243480-nam-Đỏ-SIZE-XL', 65, NULL, '2025-10-30 02:32:32'),
(292, 144, 'Đỏ', 'XXL', 'Áo-cầu-lông-Kamito-Galaxy-2-KMAH243480-nam-Đỏ-SIZE-XXL', 54, NULL, '2025-10-30 02:32:32'),
(293, 145, 'Vàng', 'S', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243330-nam-Vàng-SIZE-S', 46, NULL, '2025-10-30 02:35:21'),
(294, 145, 'Vàng', 'M', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243330-nam-Vàng-SIZE-M', 54, NULL, '2025-10-30 02:35:21'),
(295, 145, 'Vàng', 'L', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243330-nam-Vàng-SIZE-L', 37, NULL, '2025-10-30 02:35:21'),
(296, 145, 'Vàng', 'XL', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243330-nam-Vàng-SIZE-XL', 73, NULL, '2025-10-30 02:35:21'),
(297, 145, 'Vàng', 'XXL', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243330-nam-Vàng-SIZE-XXL', 56, NULL, '2025-10-30 02:35:21'),
(298, 146, 'Trắng', 'S', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243351F-nữ---Trắng-Trắng-SIZE-S', 64, NULL, '2025-10-30 02:37:41'),
(299, 146, 'Trắng', 'M', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243351F-nữ---Trắng-Trắng-SIZE-M', 34, NULL, '2025-10-30 02:37:41'),
(300, 146, 'Trắng', 'L', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243351F-nữ---Trắng-Trắng-SIZE-L', 54, NULL, '2025-10-30 02:37:41'),
(301, 146, 'Trắng', 'XL', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243351F-nữ---Trắng-Trắng-SIZE-XL', 32, NULL, '2025-10-30 02:37:41'),
(302, 146, 'Trắng', 'XXL', 'Áo-cầu-lông-Kamito-Galaxy-3-KMAH243351F-nữ---Trắng-Trắng-SIZE-XXL', 26, NULL, '2025-10-30 02:37:41'),
(303, 147, 'Tím', 'S', 'Áo-cầu-lông-Kamito-Youth-V1-KMAT241782---Tím-nhạt-Tím-SIZE-S', 40, NULL, '2025-10-30 02:43:33'),
(304, 147, 'Tím', 'M', 'Áo-cầu-lông-Kamito-Youth-V1-KMAT241782---Tím-nhạt-Tím-SIZE-M', 54, NULL, '2025-10-30 02:43:33'),
(305, 147, 'Tím', 'L', 'Áo-cầu-lông-Kamito-Youth-V1-KMAT241782---Tím-nhạt-Tím-SIZE-L', 62, NULL, '2025-10-30 02:43:33'),
(306, 147, 'Tím', 'XL', 'Áo-cầu-lông-Kamito-Youth-V1-KMAT241782---Tím-nhạt-Tím-SIZE-XL', 132, NULL, '2025-10-30 02:43:33'),
(307, 147, 'Tím', 'XXL', 'Áo-cầu-lông-Kamito-Youth-V1-KMAT241782---Tím-nhạt-Tím-SIZE-XXL', 25, NULL, '2025-10-30 02:43:33'),
(308, 148, 'Xanh', 'S', 'Áo-cầu-lông-Kamio-Youth-V1-KMAT241725---Xanh-chuối-Xanh-SIZE-S', 43, NULL, '2025-10-30 02:47:03'),
(309, 148, 'Xanh', 'M', 'Áo-cầu-lông-Kamio-Youth-V1-KMAT241725---Xanh-chuối-Xanh-SIZE-M', 45, NULL, '2025-10-30 02:47:03'),
(310, 148, 'Xanh', 'L', 'Áo-cầu-lông-Kamio-Youth-V1-KMAT241725---Xanh-chuối-Xanh-SIZE-L', 60, NULL, '2025-10-30 02:47:03'),
(311, 148, 'Xanh', 'XL', 'Áo-cầu-lông-Kamio-Youth-V1-KMAT241725---Xanh-chuối-Xanh-SIZE-XL', 23, NULL, '2025-10-30 02:47:03'),
(312, 148, 'Xanh', 'XXL', 'Áo-cầu-lông-Kamio-Youth-V1-KMAT241725---Xanh-chuối-Xanh-SIZE-XXL', 102, NULL, '2025-10-30 02:47:03'),
(313, 149, 'Đỏ', 'S', 'Áo-cầu-lông-Victor-846-Nam---Tím-đỏ-Đỏ-SIZE-S', 50, NULL, '2025-10-30 02:55:41'),
(314, 149, 'Đỏ', 'M', 'Áo-cầu-lông-Victor-846-Nam---Tím-đỏ-Đỏ-SIZE-M', 32, NULL, '2025-10-30 02:55:41'),
(315, 149, 'Đỏ', 'L', 'Áo-cầu-lông-Victor-846-Nam---Tím-đỏ-Đỏ-SIZE-L', 26, NULL, '2025-10-30 02:55:41'),
(316, 149, 'Đỏ', 'XL', 'Áo-cầu-lông-Victor-846-Nam---Tím-đỏ-Đỏ-SIZE-XL', 60, NULL, '2025-10-30 02:55:41'),
(317, 149, 'Đỏ', 'XXL', 'Áo-cầu-lông-Victor-846-Nam---Tím-đỏ-Đỏ-SIZE-XXL', 53, NULL, '2025-10-30 02:55:41'),
(318, 150, 'Trắng', 'S', 'Áo-cầu-lông-Victor-2115-Nam---Trắng-xanh-Trắng-SIZE-S', 56, NULL, '2025-10-30 02:58:02'),
(319, 150, 'Trắng', 'M', 'Áo-cầu-lông-Victor-2115-Nam---Trắng-xanh-Trắng-SIZE-M', 121, NULL, '2025-10-30 02:58:02'),
(320, 150, 'Trắng', 'L', 'Áo-cầu-lông-Victor-2115-Nam---Trắng-xanh-Trắng-SIZE-L', 135, NULL, '2025-10-30 02:58:02'),
(321, 150, 'Trắng', 'XL', 'Áo-cầu-lông-Victor-2115-Nam---Trắng-xanh-Trắng-SIZE-XL', 142, NULL, '2025-10-30 02:58:02'),
(322, 150, 'Trắng', 'XXL', 'Áo-cầu-lông-Victor-2115-Nam---Trắng-xanh-Trắng-SIZE-XXL', 67, NULL, '2025-10-30 02:58:02'),
(323, 151, 'Xanh Navy', 'S', 'Áo-cầu-lông-Victor-AT-7500M---Xanh-chính-hãng-Xanh-Navy-SIZE-S', 57, NULL, '2025-10-30 03:00:40'),
(324, 151, 'Xanh Navy', 'M', 'Áo-cầu-lông-Victor-AT-7500M---Xanh-chính-hãng-Xanh-Navy-SIZE-M', 75, NULL, '2025-10-30 03:00:40'),
(325, 151, 'Xanh Navy', 'L', 'Áo-cầu-lông-Victor-AT-7500M---Xanh-chính-hãng-Xanh-Navy-SIZE-L', 66, NULL, '2025-10-30 03:00:40'),
(326, 151, 'Xanh Navy', 'XL', 'Áo-cầu-lông-Victor-AT-7500M---Xanh-chính-hãng-Xanh-Navy-SIZE-XL', 74, NULL, '2025-10-30 03:00:40'),
(327, 151, 'Xanh Navy', 'XXL', 'Áo-cầu-lông-Victor-AT-7500M---Xanh-chính-hãng-Xanh-Navy-SIZE-XXL', 102, NULL, '2025-10-30 03:00:40'),
(328, 152, 'Trắng', 'S', 'Áo-cầu-lông-Victor-846-Nam---Trắng-đen-Trắng-SIZE-S', 56, NULL, '2025-10-30 03:02:57'),
(329, 152, 'Trắng', 'M', 'Áo-cầu-lông-Victor-846-Nam---Trắng-đen-Trắng-SIZE-M', 102, NULL, '2025-10-30 03:02:57'),
(330, 152, 'Trắng', 'L', 'Áo-cầu-lông-Victor-846-Nam---Trắng-đen-Trắng-SIZE-L', 203, NULL, '2025-10-30 03:02:57'),
(331, 152, 'Trắng', 'XL', 'Áo-cầu-lông-Victor-846-Nam---Trắng-đen-Trắng-SIZE-XL', 230, NULL, '2025-10-30 03:02:57'),
(332, 152, 'Trắng', 'XXL', 'Áo-cầu-lông-Victor-846-Nam---Trắng-đen-Trắng-SIZE-XXL', 78, NULL, '2025-10-30 03:02:57'),
(333, 153, 'Hồng', 'S', 'Áo-cầu-lông-Victor-846-Nam---Hồng-xanh-Hồng-SIZE-S', 46, NULL, '2025-10-30 03:05:46'),
(334, 153, 'Hồng', 'M', 'Áo-cầu-lông-Victor-846-Nam---Hồng-xanh-Hồng-SIZE-M', 67, NULL, '2025-10-30 03:05:46'),
(335, 153, 'Hồng', 'L', 'Áo-cầu-lông-Victor-846-Nam---Hồng-xanh-Hồng-SIZE-L', 75, NULL, '2025-10-30 03:05:46'),
(336, 153, 'Hồng', 'XL', 'Áo-cầu-lông-Victor-846-Nam---Hồng-xanh-Hồng-SIZE-XL', 60, NULL, '2025-10-30 03:05:46'),
(337, 153, 'Hồng', 'XXL', 'Áo-cầu-lông-Victor-846-Nam---Hồng-xanh-Hồng-SIZE-XXL', 68, NULL, '2025-10-30 03:05:46'),
(338, 154, 'Xanh', 'S', 'Áo-cầu-lông-Victor-2117-Nam---Trắng-xanh-Xanh-SIZE-S', 50, NULL, '2025-10-30 03:07:52'),
(339, 154, 'Xanh', 'M', 'Áo-cầu-lông-Victor-2117-Nam---Trắng-xanh-Xanh-SIZE-M', 140, NULL, '2025-10-30 03:07:52'),
(340, 154, 'Xanh', 'L', 'Áo-cầu-lông-Victor-2117-Nam---Trắng-xanh-Xanh-SIZE-L', 243, NULL, '2025-10-30 03:07:52'),
(341, 154, 'Xanh', 'XL', 'Áo-cầu-lông-Victor-2117-Nam---Trắng-xanh-Xanh-SIZE-XL', 243, NULL, '2025-10-30 03:07:52'),
(342, 154, 'Xanh', 'XXL', 'Áo-cầu-lông-Victor-2117-Nam---Trắng-xanh-Xanh-SIZE-XXL', 60, NULL, '2025-10-30 03:07:52'),
(343, 155, 'Trắng', 'S', 'Áo-cầu-lông-Victor-2121-Nam---Trắng-xanh-Trắng-SIZE-S', 67, NULL, '2025-10-30 03:10:30'),
(344, 155, 'Trắng', 'M', 'Áo-cầu-lông-Victor-2121-Nam---Trắng-xanh-Trắng-SIZE-M', 76, NULL, '2025-10-30 03:10:30'),
(345, 155, 'Trắng', 'L', 'Áo-cầu-lông-Victor-2121-Nam---Trắng-xanh-Trắng-SIZE-L', 85, NULL, '2025-10-30 03:10:30'),
(346, 155, 'Trắng', 'XL', 'Áo-cầu-lông-Victor-2121-Nam---Trắng-xanh-Trắng-SIZE-XL', 94, NULL, '2025-10-30 03:10:30'),
(347, 155, 'Trắng', 'XXL', 'Áo-cầu-lông-Victor-2121-Nam---Trắng-xanh-Trắng-SIZE-XXL', 130, NULL, '2025-10-30 03:10:30'),
(348, 156, 'Tím', 'S', 'Áo-cầu-lông-Victor-2121-Nam---Tím-Tím-SIZE-S', 76, NULL, '2025-10-30 03:12:30'),
(349, 156, 'Tím', 'M', 'Áo-cầu-lông-Victor-2121-Nam---Tím-Tím-SIZE-M', 120, NULL, '2025-10-30 03:12:30'),
(350, 156, 'Tím', 'L', 'Áo-cầu-lông-Victor-2121-Nam---Tím-Tím-SIZE-L', 134, NULL, '2025-10-30 03:12:30'),
(351, 156, 'Tím', 'XL', 'Áo-cầu-lông-Victor-2121-Nam---Tím-Tím-SIZE-XL', 145, NULL, '2025-10-30 03:12:30'),
(352, 156, 'Tím', 'XXL', 'Áo-cầu-lông-Victor-2121-Nam---Tím-Tím-SIZE-XXL', 150, NULL, '2025-10-30 03:12:30'),
(353, 157, 'Đỏ', 'S', 'Áo-cầu-lông-Victor-T-40009D---Đỏ-chính-hãng-Đỏ-SIZE-S', 102, NULL, '2025-10-30 03:15:32'),
(354, 157, 'Đỏ', 'M', 'Áo-cầu-lông-Victor-T-40009D---Đỏ-chính-hãng-Đỏ-SIZE-M', 202, NULL, '2025-10-30 03:15:32'),
(355, 157, 'Đỏ', 'L', 'Áo-cầu-lông-Victor-T-40009D---Đỏ-chính-hãng-Đỏ-SIZE-L', 56, NULL, '2025-10-30 03:15:32'),
(356, 157, 'Đỏ', 'XL', 'Áo-cầu-lông-Victor-T-40009D---Đỏ-chính-hãng-Đỏ-SIZE-XL', 76, NULL, '2025-10-30 03:15:32'),
(357, 157, 'Đỏ', 'XXL', 'Áo-cầu-lông-Victor-T-40009D---Đỏ-chính-hãng-Đỏ-SIZE-XXL', 86, NULL, '2025-10-30 03:15:32'),
(358, 158, 'Trắng', 'S', 'Áo-cầu-lông-Victor-2118-Nam---Trắng-đen-Trắng-SIZE-S', 67, NULL, '2025-10-30 03:18:40'),
(359, 158, 'Trắng', 'M', 'Áo-cầu-lông-Victor-2118-Nam---Trắng-đen-Trắng-SIZE-M', 76, NULL, '2025-10-30 03:18:40'),
(360, 158, 'Trắng', 'L', 'Áo-cầu-lông-Victor-2118-Nam---Trắng-đen-Trắng-SIZE-L', 85, NULL, '2025-10-30 03:18:40'),
(361, 158, 'Trắng', 'XL', 'Áo-cầu-lông-Victor-2118-Nam---Trắng-đen-Trắng-SIZE-XL', 93, NULL, '2025-10-30 03:18:40'),
(362, 158, 'Trắng', 'XXL', 'Áo-cầu-lông-Victor-2118-Nam---Trắng-đen-Trắng-SIZE-XXL', 120, NULL, '2025-10-30 03:18:40');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `news_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `published_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`news_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`news_id`, `title`, `slug`, `content`, `image`, `status`, `published_at`, `created_at`) VALUES
(1, 'Khuyến mãi lớn cuối năm', 'khuyen-mai-lon-cuoi-nam', 'Giảm giá 50% tất cả sản phẩm...', 'sale.jpg', 'published', '2025-09-25 10:00:00', '2025-10-04 14:34:35'),
(2, 'Giải cầu lông mở rộng 2025', 'giai-cau-long-mo-rong-2025', 'Thông tin về giải cầu lông toàn quốc...', 'caulong.jpg', 'published', '2025-09-20 09:00:00', '2025-10-04 14:34:35'),
(3, 'Tips chọn giày cầu lông', 'tips-chon-giay-cau-long', 'Chia sẻ kinh nghiệm chọn giày...', 'giay.jpg', 'published', '2025-09-18 14:30:00', '2025-10-04 14:34:35'),
(4, 'Cập nhật sản phẩm mới', 'cap-nhat-san-pham-moi', 'Các sản phẩm mới vừa nhập kho...', 'new.jpg', 'published', '2025-09-22 12:00:00', '2025-10-04 14:34:35');

-- --------------------------------------------------------

--
-- Table structure for table `news_categories`
--



-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `voucher_id` int(11) DEFAULT NULL,
  `address_id` int(11) NOT NULL,
  `total_amount` decimal(10,0) NOT NULL,
  `final_amount` decimal(10,0) NOT NULL,
  `status` enum('pending','paid','shipping','completed','canceled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`order_id`),
  KEY `voucher_id` (`voucher_id`),
  KEY `address_id` (`address_id`),
  KEY `idx_orders_user` (`user_id`),
  KEY `idx_orders_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `voucher_id`, `address_id`, `total_amount`, `final_amount`, `status`, `created_at`) VALUES
(2, 2, NULL, 6, 500000, 450000, 'paid', '2025-10-04 14:34:35'),
(3, 6, NULL, 7, 750000, 750000, 'pending', '2025-10-05 03:04:45'),
(4, 6, NULL, 8, 3750000, 3750000, 'pending', '2025-10-05 03:07:41'),
(5, 6, NULL, 9, 2250000, 2250000, 'pending', '2025-10-05 03:11:02'),
(6, 6, NULL, 10, 750000, 750000, 'pending', '2025-10-05 03:13:55'),
(7, 6, NULL, 11, 750000, 750000, 'pending', '2025-10-05 03:15:44'),
(10, 6, NULL, 12, 3750000, 3750000, 'pending', '2025-10-05 03:46:05'),
(11, 6, NULL, 13, 3750000, 3750000, 'pending', '2025-10-05 03:51:53'),
(12, 6, NULL, 14, 3750000, 3750000, 'pending', '2025-10-05 03:58:44'),
(13, 6, NULL, 15, 3750000, 3750000, 'pending', '2025-10-05 10:08:23'),
(14, 6, NULL, 16, 3750000, 3750000, 'pending', '2025-10-05 10:16:54'),
(15, 6, NULL, 17, 3750000, 3750000, 'pending', '2025-10-05 10:18:49'),
(16, 6, NULL, 18, 750000, 750000, 'pending', '2025-10-05 10:20:42'),
(17, 6, NULL, 19, 750000, 750000, 'pending', '2025-10-05 10:24:02'),
(18, 6, NULL, 20, 2250000, 2250000, 'pending', '2025-10-06 13:30:38'),
(19, 6, NULL, 21, 1500000, 1500000, 'pending', '2025-10-06 14:15:54'),
(20, 2, NULL, 22, 1200000, 1200000, 'pending', '2025-10-26 11:12:51'),
(21, 2, NULL, 23, 1200000, 1200000, 'pending', '2025-10-26 14:52:08');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE IF NOT EXISTS `order_details` (
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `material_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `discount_amount` decimal(10,0) DEFAULT 0,
  `price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  KEY `order_details_ibfk_3` (`material_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_item_id`, `order_id`, `product_id`, `material_id`, `quantity`, `discount_amount`, `price`) VALUES
(2, 2, 2, NULL, 2, 0, 200000),
(6, 6, 2, NULL, 1, 0, 750000),
(7, 7, 2, NULL, 1, 0, 750000),
(18, 20, 3, 10, 1, 0, 1200000),
(19, 21, 3, 10, 1, 0, 1200000);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
CREATE TABLE IF NOT EXISTS `pages` (
  `page_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`page_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`page_id`, `title`, `slug`, `content`, `image`, `status`, `created_at`) VALUES
(1, 'Giới Thiệu', 'gioi-thieu', 'Đây là trang giới thiệu về công ty / cửa hàng...', 'hinhgioithieu.jpg', 'published', '2025-10-04 14:34:35'),
(2, 'Hướng Dẫn Mua Hàng', 'huong-dan-mua-hang', 'Các bước chi tiết để mua hàng tại website...', 'mua-hang.jpg', 'published', '2025-10-04 14:34:35'),
(3, 'Hướng Dẫn Thanh Toán', 'huong-dan-thanh-toan', 'Hướng dẫn các phương thức thanh toán...', 'thanh-toan.jpg', 'published', '2025-10-04 14:34:35'),
(4, 'Chính Sách Bảo Hành', 'chinh-sach-bao-hanh', 'Chi tiết chính sách bảo hành sản phẩm...', 'bao-hanh.jpg', 'published', '2025-10-04 14:34:35');

-- --------------------------------------------------------

--
-- Table structure for table `preorders`
--

DROP TABLE IF EXISTS `preorders`;
CREATE TABLE IF NOT EXISTS `preorders` (
  `preorder_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('pending','confirmed','canceled') DEFAULT 'pending',
  `quantity` int(11) NOT NULL DEFAULT 1,
  `total_amount` decimal(12,2) GENERATED ALWAYS AS (`price` * `quantity`) STORED,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`preorder_id`),
  KEY `idx_preorders_product` (`product_id`),
  KEY `idx_preorders_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `preorders`
--

INSERT INTO `preorders` (`preorder_id`, `product_id`, `user_id`, `product_name`, `customer_name`, `phone`, `address`, `note`, `price`, `status`, `quantity`, `created_at`) VALUES
(1, 2, NULL, 'Vợt Yonex Astrox 88d pro', 'Dũng', '09464224', 'dgdgd', 'dgdg', 750000.00, 'canceled', 1, '2025-10-26 09:24:19'),
(2, 1, NULL, 'Vợt Yonex Astrox 77 Pro Đỏ', 'fdgf', '0768655', 'fhfh', 'dgdg', 550000.00, 'pending', 1, '2025-10-26 10:09:03'),
(3, 1, NULL, 'Vợt Yonex Astrox 77 Pro Đỏ', 'sfs', 'sf', 'sf', 'sfs', 550000.00, 'pending', 1, '2025-10-26 10:21:45');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `description` text NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`product_id`),
  KEY `idx_products_category` (`category_id`),
  KEY `fk_products_brand` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `brand_id`, `name`, `slug`, `description`, `price`, `image`, `created_at`) VALUES
(1, 1, 1, 'Vợt Yonex Astrox 77 Pro Đỏ', 'axtrox-77', '<p style=\"text-align: justify;\"><span style=\"color: rgb(51, 62, 68); font-family: arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;\">Sau khi nhà Yonex cho ra mắt 3 phiên bản gồm&nbsp;Astrox 77 Xanh Dương - Astrox 77 Xanh Chuối và Astrox 77 Đỏ được hầu hết cả vận động viên cùng người chơi phong trào rất ưa chuộng, sử dụng thi đấu siêu thành công thì&nbsp;thương hiệu cầu lông top đầu Nhật Bản đã cho trình làng trên toàn thế giới một siêu phẩm mới với tên gọi đầy đủ là&nbsp;vợt cầu lông&nbsp;Yonex Astrox 77 Pro - Tối ưu hơn trong những pha cầu tốc độ nhanh.</span>', 4200000, 'astrox-77-pro.jpg', '2025-09-13 07:50:32'),
(2, 1, 1, 'Vợt cầu lông Yonex Astrox 88D Pro Limited', 'vot-cau-long-yonex-astrox-88d-pro-limited', '<p style=\"text-align: justify;\"><span style=\"color: rgb(51, 62, 68); font-family: arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;\">Đây là hãng thể thao mạnh hàng đầu đặc biệt trong thị trường cầu lông. Mỗi sản phẩm mới ra của Yonex đều tạo tiếng vang lớn và có sức bán siêu khủng. Yonex hiện nay đang ngày càng phát triển lớn mạnh, nghiên cứu và cải tiến liên tục, áp dụng những công nghệ mới và hiện đại nhất vào trong từng sản phẩm. Vợt cầu lông là nơi khởi đầu cho hành trình gắn bó với thể thao của Yonex.</span>', 5500000, 'astrox-88d-pro-ch.jpg', '2025-09-13 07:50:32'),
(3, 1, 2, 'Vợt Cầu Lông Lining Axforce 100 Vàng Golden', 'vot-cau-long-lining-axforce-100-vang-golden', '<p style=\"text-align: justify;\"><span style=\"color: rgb(51, 62, 68); font-family: arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important;\">Siêu phẩm Lining Axforce 100 được&nbsp;tích hợp nhiều công nghệ hiện đại \" BOX WING FRAME \" &nbsp;khung vợt được thiết kế với dạng hộp giúp cấu trúc khung ổn định cải thiện được &nbsp;tối đa độ chính xác cho các pha các xoay tuyệt vời, tấn công dữ dội, thích hợp cho người chơi có sức mạnh và sức mạnh bùng nổ mạnh mẽ, cũng như người chơi chuyên nghiệp và cấp cao kết hợp nhiều công nghệ bậc cao như nano siêu dẫn, hệ thống hấp thụ sốc mật độ composite cao.</span>', 5200000, 'axforce-100-vang-golden.jpg', '2025-09-13 07:50:32'),
(9, 1, 1, 'Vợt cầu lông Yonex Nanoflare 700 Pro 2024', 'nanaflare-700-pro', '<p><a href=\"https://shopvnb.com/vot-cau-long-yonex-nanoflare-700-pro-2024.html\">Vợt cầu lông Yonex Nanoflare 700 Pro 2024</a>&nbsp;là phiên bản nâng cấp của dòng&nbsp;Nanoflare 700, thiên về lối chơi linh hoạt, thiên về phản tạt,&nbsp;điều cầu tốc độ nhanh với độ chính xác cao.Thiết kế khung được tích hợp công nghệ&nbsp;AERO FRAME&nbsp;được vát tròn để tạo ra&nbsp;cấu trúc&nbsp;khung hình&nbsp;oval&nbsp;để&nbsp;giảm lực cản của không khí để&nbsp;tăng khả năng cơ động để thực hiện những pha phản tạt nhanh. Đũa vợt được làm&nbsp;siêu mỏng với công nghệ Super Slim Shaft, tối đa khả năng cắt gió để tăng tốc độ vung vợt trong không khí, kết hợp với công nghệ mũ chụp&nbsp;ENERGY BOOST CAP PLUS làm tăng cường tính đàn hồi, hạn chế khả năng rung lắc.</p>', 4500000, 'nanoflare800.jpg', '2025-09-13 21:12:07'),
(12, 2, 5, 'Vợt Pickle Ball Head Extreme Lite', 'Extreme-Lite', '<p>Vợt PickleBall Head Extreme Elite 2023 chính hãng&nbsp;được sản xuất&nbsp;dựa trên nền tảng công nghệ của dòng Head Extreme cùng mức giá thành hợp lý, cây vợt này mang đến những trải nghiệm&nbsp;tuyệt vời, giúp người chơi cải thiện kỹ năng và nâng cao hiệu suất vượt trội. Với&nbsp;độ dày 11mm và trọng lượng&nbsp;220 gr / 7.8 Oz (trọng lượng nhẹ), vợt thiên về lối chơi tấn công mạnh mẽ với những cú đánh đầy uy lực, trọng lượng không cao giúp người chơi có thể dễ dàng làm quen và kiểm soát, đặc biệt là những người mới chơi.</p><p>Công nghệ Auxetic cải tiến cung cấp&nbsp;sức mạnh vượt trội,&nbsp;tăng&nbsp;cảm giác bóng hiệu quả. Bên cạnh đó, vợt còn áp dụng công nghệ&nbsp;GRAPHENE INSIDE, đây&nbsp;là loại vật liệu cao cấp giúp&nbsp;tăng cường độ ổn định cho khung và tối ưu hóa việc truyền năng lượng từ vợt sang bóng. Điểm ngọt được tối ưu hóa nhằm&nbsp;tăng phạm vi đánh chính xác, cải thiện cảm giác bóng&nbsp;cho người chơi.</p>', 4000000, 'HeadExtremeElite.jpg', '2025-09-13 23:35:52'),
(14, 2, 5, 'Vợt Pickle Ball Head Radical Lite', 'Radical-lite', '<p>&nbsp; &nbsp; Vợt Pickle Ball Head Radical Lite 2024 được thiết kế theo&nbsp;khuôn hình giọt nước độc đáo,&nbsp;mang lối chơi&nbsp;cân bằng giữa sức mạnh và kiểm soát với độ dày 15mm và&nbsp;trọng lượng 230&nbsp;gr /&nbsp;8.1 Oz. Bề mặt vợt&nbsp;được làm bằng sợi&nbsp;thủy tinh, mang lại cảm giác êm ái, thoải mái và có độ kiểm soát lực tốt hơn khi đánh.<br>&nbsp; &nbsp;Công nghệ Auxetic cải tiến cung cấp&nbsp;sức mạnh vượt trội,&nbsp;tăng&nbsp;cảm giác bóng hiệu quả. Bên cạnh đó, vợt còn áp dụng công nghệ&nbsp;GRAPHENE INSIDE, đây&nbsp;là loại vật liệu cao cấp giúp&nbsp;tăng cường độ ổn định cho khung và tối ưu hóa việc truyền năng lượng từ vợt sang bóng. Điểm ngọt được tối ưu hóa nhằm&nbsp;tăng phạm vi đánh chính xác, cải thiện cảm giác bóng&nbsp;cho người chơi.</p><p><br></p>', 1690000, 'vot-pickleball-head-radical-elite.jpg', '2025-09-13 23:43:51'),
(15, 2, 5, 'Vợt PickelBall Head Spark Elite V5', 'vot-pickelball-head-spark-elite-v5', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-head-spark-elite-v5.html\">Vợt PickleBall Head SPARK ELITE (V5)</a>&nbsp;là một trong những cây vợt Pickleball chất lượng ở phân khúc tầm trung đến từ&nbsp;thương hiệu Head, mang thiết kế vô cùng mạnh mẽ, nổi bật và bắt mắt.</p><p>- Với&nbsp;độ dày 13mm và trọng lượng&nbsp;230 g /&nbsp;8.1 oz,&nbsp;vợt thiên về lối chơi&nbsp;tấn công cơ động, tốc độ&nbsp;và giàu sức mạnh.&nbsp;Cây vợt này phù&nbsp;hợp với những người&nbsp;chơi có trình độ trung bình trở lên, lực&nbsp;cổ tay tốt có thể sử dụng được.</p>', 1290000, 'HeadSparkElite.jpg', '2025-09-14 00:01:09'),
(33, 1, 2, 'Vợt cầu lông Lining Axforce Cannon', 'cannon-pro', '<p>- Vợt cầu lông Lining Axforce Cannon&nbsp;được thiết kế cho lối chơi công thủ toàn diện, hơi thiên công với điểm cân bằng hơi nặng đầu, cùng với đũa vợt cứng ở mức trung bình giúp hỗ trợ lực&nbsp;tốt hơn, không quá gây áp lực lên cổ tay cho người chơi</p><p><br></p><p>- Manh 4 phiên bản màu sắc&nbsp;cùng các chi tiết được làm tỉ mỉ tạo nên độ nổi bật, hiện đại và năng động. Được trang bị các&nbsp;công nghệ tiên tiến, ngoài Thunder Technology có thể kể đến như High Carbon xử lý vật liệu tạo cây vợt với độ bền và cứng cáp vượt trội, công nghệ Power Flexible Shaft cho thân vợt linh hoạt, dễ dàng chuyển đổi trạng thái từ phòng thủ sang tấn công.</p>', 950000, 'vot-cau-long-lining-axforce-cannon.jpg', '2025-09-18 07:20:13'),
(37, 1, 1, 'Vợt cầu lông Yonex Astrox 100 Tour VA', 'vot-cau-long-yonex-astrox-100-tour-va', '<p>-&nbsp; Vợt cầu lông Yonex Astrox 100 Tour VA là một trong những siêu phẩm mới nhất mà Yonex vừa giới thiệu, kế thừa trọn vẹn tinh hoa công nghệ của dòng Astrox – biểu tượng của lối chơi tấn công mạnh mẽ với những cú đập cầu uy lực và góc đánh hiểm hóc. Đây là phiên bản giới hạn với bộ nhận diện riêng về màu sắc và thương hiệu, được áp dụng cho toàn bộ dòng Astrox 100 VA. So với bản gốc, Astrox 100 Tour VA vẫn giữ trọn tinh thần của nhà vô địch nhưng ở mức giá dễ tiếp cận hơn, phù hợp cho người chơi muốn trải nghiệm hiệu suất thi đấu ở đẳng cấp cao.</p>', 4469000, 'vot-cau-long-yonex-astrox-100-tour-va.jpg', '2025-10-04 08:02:10'),
(38, 1, 1, 'Vợt cầu lông Yonex Astrox 99 Play 2025', 'vot-cau-long-yonex-astrox-99-play-2025', '- Vợt cầu lông Yonex Astrox 99 Play 2025 dù là phiên bản tầm thấp nhất trong dòng vợt 99 2025 này, nhưng vợt vẫn được trang bị công nghệ sở hữu Rotational Generator System cải tiến, phân bổ trọng lượng trên đầu cán vợt, đỉnh khung vợt và khớp nối, mang lại những pha chuyển tiếp liền mạch và những pha tấn công liên tục.', 1769000, 'vot-cau-long-yonex-astrox-99-play-2025.jpg', '2025-10-04 09:35:34'),
(39, 1, 1, 'Vợt cầu lông Yonex Astrox 99 Tour 2025', 'vot-cau-long-yonex-astrox-99-tour-2025', '- Vợt cầu lông Yonex Astrox 99 Tour 2025 hay còn được gọi là 99 Tour Gen 3 với thiết kế lấy cảm hứng từ những thiên thạch va chạm với các hành tinh, tượng trưng cho sức mạnh áp đảo. Phần đế màu đen và xanh lá cây được điểm xuyết bằng họa tiết vân đá cẩm thạch gợi lên sức nặng và sức mạnh, trong khi những vệt màu cam kéo dài từ khung vợt đến tay cầm tượng trưng cho việc truyền tải thông tin cú đánh từ khung vợt đến tay cầm. ', 4359000, 'vot-cau-long-yonex-astrox-99-tour-2025.jpg', '2025-10-04 09:37:49'),
(40, 1, 1, 'Vợt cầu lông Yonex Astrox 100ZZ VA', 'vot-cau-long-yonex-astrox-100zz-va', '<p>- Vợt cầu lông Yonex Astrox 100ZZ VA là phiên bản đặc biệt “VA Signature” của dòng Astrox 100ZZ từ Yonex - cây vợt chuyên nghiệp này được thiết kế riêng theo phong cách cá nhân của vận động viên Viktor Axelsen. Nó thể hiện rõ phương châm \"Chúng ta cùng nhau phấn đấu\" của nhà vô địch Olympic. Vợt với màu sắc trắng xanh này là phiên bản giới hạn của mẫu vợt chủ lực thuộc dòng Astrox, với độ cân bằng cao ở đầu vợt và cán vợt cực kỳ cứng cáp, lý tưởng cho những người chơi tìm kiếm sức mạnh và độ chính xác tối đa.</p>', 5329000, 'vot-cau-long-yonex-astrox-100zz-va.jpg', '2025-10-04 09:39:21'),
(42, 1, 1, 'Vợt cầu lông Yonex Nanoflare Junior', 'vot-cau-long-yonex-nanoflare-junior', '<p>- Vợt cầu lông Yonex Nanoflare Junior được thiết kế cho lối chơi tốc độ, linh hoạt giữa công và thủ với điểm cân bằng ở mức cân bằng. Đũa vợt siêu dẻo mang lại khả năng trợ lực một cách tối ưu, trọng lượng 4U không quá nặng, thích hợp cho những người mới bắt đầu tập làm quen với bộ môn này hoặc các lông thủ nhí.</p>', 1639000, 'vot-nanoflare-junior.jpg', '2025-10-04 09:42:20'),
(43, 1, 1, 'Vợt cầu lông Yonex Astrox 100ZZ Kurenai', 'vot-cau-long-yonex-astrox-100zz-kurenai', 'Vợt cầu lông Yonex Astrox 100ZZ Kurenai nổi trội không chỉ là cây vợt cầu lông cao cấp nhất của nhà Yonex mà em nó còn là một trong những siêu phẩm vợt được sử dụng thành công nhất trên thế giới. Đồng hành cùng Victor Axelsen đăng quang rất nhiều ngôi vô địch trong đó có cả chiếc Huy chương Vàng _Olympic Tokyo 2020. Bên cạnh đó, các tay vợt hàng đầu hiện nay như Akane Yamaguchi, Takuro Hoki, Lakshya Sen cũng đang sử dụng cây vợt này.', 5169000, 'vot-cau-long-yonex-astrox-100zz-kurenai-do.jpg', '2025-10-07 08:01:28'),
(49, 1, 1, 'Vợt Cầu Lông Yonex Nanoflare 1000 Tour', 'vot-cau-long-yonex-nanoflare-100-tour', '<p>Với việc ra mắt&nbsp;<a href=\"https://shopvnb.com/vot-cau-long-yonex-nanoflare-1000-tour-chinh-hang.html\">vợt cầu lông Yonex Nanoflare 1000 Tour</a>, Yonex đã mang đến một sản phẩm vợt cận cao cấp tiếp nối thành công của dòng Nanoflare 1000z. Vợt này tự hào sở hữu chất liệu khung đỉnh cao, kết hợp gồm HM Graphite, Nanocell NEO và EX-HYPER MG, tạo nên sự cân bằng hoàn hảo giữa sức mạnh, linh hoạt và độ bền.</p>', 4469000, 'vot-cau-long-yonex-nanoflare-1000-tour.jpg', '2025-10-07 08:07:30'),
(56, 1, 2, 'Set Vợt Cầu Lông Lining Bladex 900 Master', 'vot-lining-bladex-900-master', 'Vợt Cầu Lông Lining Bladex 900 Master– thích hợp cho người chơi muốn điều cầu linh hoạt, phối hợp phản tạt và smash nhanh.', 7100000, 'set-vot-cau-long-lining-bladex-900-new-2024.jpg', '2025-10-07 08:15:40'),
(58, 1, 2, 'Vợt cầu lông Lining Halbertec 9000 Limited - Olympic Paris', 'vot-lining-9000-limited', 'Set vợt cầu lông Lining Halbertec 9000 Limited - Olympic Paris 2024 là phiên bản giới hạn được thiết kế đặc biệt dành riêng cho chủ đề thế vận hội Olympic Paris 2024, set vợt bao gồm 1 cây vợt cầu lông Halbertec 9000 Limited, 1 ống cầu Lining và 1 bộ quấn cán đầy đủ cho các lông thủ.', 8000000, 'set-vot-cau-long-lining-halbertec-9000-limited-olympic-paris-2024.jpg', '2025-10-07 08:18:00'),
(59, 1, 2, 'Vợt cầu lông Lining Calibar 900', 'vot-cau-long-lining-calibar-900', 'Vợt cầu lông Lining Calibar 900 là một cây vợt cầu lông cao cấp bậc nhất của thương hiệu Lining được tích hợp rất nhiều công nghệ hiện đại, từng được vận động viên Chen Long sử dụng thi đấu gặt hái được rất nhiều thành công.Với độ nặng đầu 308, đũa vợt cứng, dành cho những người chơi thích tấn công áp đảo đối phương bằng những pha đập cầu mạnh mẽ.', 4000000, 'vot-cau-long-lining-calibar-900b.jpg', '2025-10-07 08:19:10'),
(60, 1, 2, 'Vợt cầu lông Lining Calibar 900B', 'vot-calibar-900B', 'Vợt cầu lông Yonex Astrox 100ZZ White – phiên bản màu trắng, giữ nguyên các công nghệ tối ưu cho lối chơi tấn công và smash mạnh mẽ.', 4700000, 'vot-cau-long-lining-calibar-900.jpg', '2025-10-07 08:20:20'),
(63, 1, 2, 'Vợt cầu lông Lining Halbertec Motor Pro', 'vot-halbertec-motor-pro', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-cau-long-lining-halbertec-motor-pro-chinh-hang.html\">Vợt cầu lông Lining Halbertec Motor Pro</a>&nbsp;là phiên bản cải tiến của Halbertec Motor, được thiết kế dành cho những người đòi hỏi độ chính xác tuyệt đối và cảm giác tinh tế trong từng pha cầu.&nbsp;Phiên bản Halbertec Motor Pro&nbsp;được nâng cấp với vật liệu cao cấp hơn. Trong đó, khung và thân vợt là sự kết hợp giữa “High-modulus graphite” và “MED High-elastic Carbon Fiber”. Những vật liệu này có đặc tính cứng, nhẹ và phục hồi nhanh, tạo ra một bộ khung cứng cáp, ổn định, có khả năng chịu được lực đánh mạnh cùng tốc độ nhanh của các trận đấu đỉnh cao.</p>', 2100000, 'vot-cau-long-lining-halbertec-motor-pro.jpg', '2025-10-07 08:23:50'),
(64, 1, 2, 'Vợt Cầu Lông Lining Halbertec 9000', 'vot-halbertec-9000', '<p><a href=\"https://banhang.shopvnb.com/vot-cau-long-lining-halbertec-9000.html\">Vợt cầu lông Lining Halbertec 9000</a>&nbsp;được thiết kế dành cho lối chơi công thủ toàn diện, linh hoạt, giúp bạn có thể chuyển đổi giữa tấn công và phòng thủ một cách nhanh chóng.</p><p>Lining Halbertec 9000&nbsp;khoác lên mình&nbsp;nước sơn bóng hiện đại, kết hợp giữa hai màu tím và xanh lá.&nbsp;Bộ đôi màu sắc tạo cho cây vợt vẻ ngoài nổi bật, sự nguy hiểm pha lẫn chút huyền bí khiến bạn phải chú ý&nbsp;ngay từ cái nhìn đầu tiên.</p>', 5300000, 'vot-cau-long-lining-halbertec-9000.jpg', '2025-10-07 08:25:00'),
(67, 1, 2, 'Vợt Cầu Lông Lining Axforce 90 Xanh Dragon Max', 'vot-axforce-90-xanhdragon', '<p>Thiết kế của&nbsp;cây vợt thể hiện được sự&nbsp;cá tính với gam màu đen huyền bí và&nbsp;các họa tiết rồng xanh&nbsp;chạy dọc theo khung vợt. Vợt Lining Axforce 90 Xanh Dragon Max&nbsp;dành cho những ai yêu thích lối chơi tấn công mạnh mẽ, thường xuyên tung ra những quả đập cháy sân khiến các đối thủ khiếp sợ.&nbsp;Công nghệ hiện đại của Lining làm nâng cao tính toàn diện cho cây vợt, giúp những ai sở hữu nó có thêm sự tự tin đáng kể mỗi cú vung&nbsp;vợt.</p>', 5200000, 'vot-cau-long-lining-axforce-90-xanh-dragon-max.jpg', '2025-10-07 08:28:30'),
(68, 1, 2, 'Vợt cầu lông Lining Axforce 90 Đỏ Tiger Max', 'vot-axforce-90-TigerMax', '<a href=\"https://shopvnb.com/vot-cau-long-lining-axforce-90-do-tiger-max.html\" style=\"box-sizing: border-box; color: rgb(233, 82, 33); text-decoration: none; background: rgb(255, 255, 255); font-family: arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal;\">Vợt cầu lông Lining Axforce 90 Đỏ Tiger Max</a><span style=\"color: rgb(51, 62, 68); font-family: arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">&nbsp;-&nbsp;Chúa Sơn Lâm Thị Uy Sức Mạnh.&nbsp;Đi cùng với&nbsp;Axforce 90 Đỏ Tiger Max thì Lining cũng cho ra thị trường phiên bản&nbsp;Axforce 90 Xanh Dragon Max, cho người chơi thêm lựa chọn nếu muốn sở hữu cho mình một cây vợt chuyên công chất lượng.</span>', 5000000, 'vot-cau-long-lining-axforce-90-do-tiger-max.jpg', '2025-10-07 08:29:40'),
(86, 2, 6, 'Vợt Pickleball Joola Perseus 3S Dual 16mm chính hãng', 'vot-pickleball-joola-perseus-3s-dual-16mm-chinh-hang', '- Vợt Pickleball Joola Perseus 3S Dual 16mm được thiết kế dựa trên nền tảng của dòng sản phẩm 3S của JOOLA, Perseus 3S Dual 16mm có cùng hình dáng Perseus được yêu thích với quy trình đảm bảo chất lượng toàn diện để đáp ứng các tiêu chuẩn UPA-A và USAP hiện hành...', 5290000, 'vot-pickleball-joola-perseus-3s-dual-16mm.jpg', '2025-10-14 07:01:46'),
(87, 2, 6, 'Vợt Pickleball Joola Perseus 3S Dual 14mm chính hãng', 'vot-pickleball-joola-perseus-3s-dual-14mm-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-joola-perseus-3s-dual-14mm-chinh-hang.html\">Vợt Pickleball Joola Perseus 3S Dual 14mm</a>&nbsp;được thiết kế dựa trên nền tảng của dòng sản phẩm 3S của JOOLA, Perseus 3S Dual 14mm có cùng hình dáng Perseus được yêu thích với quy trình đảm bảo chất lượng toàn diện để đáp ứng các tiêu chuẩn UPA-A và USAP hiện hành.</p><p>-&nbsp;Lõi vợt 14mm mang đến sự kết hợp hoàn hảo giữa khả năng kiểm soát và độ ổn định, biến nó thành lựa chọn tuyệt vời cho những người chơi thiên về cảm giác và cảm giác chạm bóng mà không ảnh hưởng đến độ ổn định. Vợt mang lại khả năng tiếp xúc bóng sạch sẽ, nhất quán và phản hồi có thể dự đoán trước, lý tưởng cho các cú đánh mạnh, chắn bóng và trao đổi tốc độ cao trên lưới.</p>', 5290000, 'vot-pickleball-joola-perseus-3s-dual-14mm.jpg', '2025-10-14 07:02:31'),
(88, 2, 6, 'Vợt Pickleball Joola Scorpeus 3S Dual 14mm chính hãng', 'vot-pickleball-joola-scorpeus-3s-dual-14mm-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-joola-scorpeus-3s-dual-14mm-chinh-hang.html\">Vợt Pickleball Joola Scorpeus 3S Dual 14mm</a>&nbsp;là một cây vợt tuyệt vời cho người chơi theo phong cách phòng thủ hoặc người chơi ưa thích phản ứng nhanh trong những trận chiến nhà bếp cường độ cao.&nbsp;Về cơ bản, nếu bạn đã từng yêu thích tốc độ, khả năng kiểm soát và những cú vung vợt nhanh như chớp của Scorpeus 3S, phiên bản Dual sẽ mang đến một trải nghiệm quen thuộc nhưng được nâng lên một tầm cao mới.</p><p>-&nbsp;Phần viền bảo vệ cạnh vợt Scorpeus 3S Dual 14mm được tô điểm bằng dải màu cam và vàng chuyển sắc, gợi lên hình ảnh mặt trời lặn. Sự khác biệt không chỉ nằm ở những phối màu mới đầy ấn tượng mà còn ở những cải tiến tinh vi bên trong cấu trúc, giúp cây vợt trở thành một vũ khí đáng gờm hơn trên sân đấu</p>', 5290000, 'vot-pickleball-joola-scorpeus-3s-dual-14mm.jpg', '2025-10-14 07:03:12'),
(89, 2, 6, 'Vợt Pickleball Joola Hyperion 3S Dual 16mm chính hãng', 'vot-pickleball-joola-hyperion-3s-dual-16mm-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-joola-hyperion-3s-dual-16mm-chinh-hang.html\">Vợt Pickleball Joola Hyperion 3S Dual 16mm</a>&nbsp;đã được thử nghiệm, tinh chỉnh và hoàn thiện, Hyperion 3S Dual 16mm đã sẵn sàng cho mọi sự kiện được chứng nhận UPA-A pro và USAP PBCoR.43 phê duyệt.&nbsp;Cây vợt này kế thừa những tinh hoa của dòng Hyperion nhưng được cải tiến để có cảm giác đầm tay hơn, mang lại sự ổn định vượt trội khi đối phó với những pha bóng tốc độ cao.</p><p>-&nbsp;Chiếc vợt này mang lại cảm giác như một phần mở rộng của bàn tay bạn uyển chuyển, kiểm soát tốt và phản ứng nhanh nhạy. Hyperion 3S Dual sở hữu lõi mới và cải tiến kết hợp với công nghệ Propulsion Core đã được chứng minh của JOOLA, mang lại sự cân bằng giữa lực đẩy mạnh mẽ và khả năng kiểm soát sắc bén.&nbsp;</p>', 5290000, 'vot-pickleball-joola-hyperion-3s-dual-16mm.jpg', '2025-10-14 07:03:56'),
(91, 2, 6, 'Vợt Pickleball Joola Ben Johns Hyperion Pro IV 16mm chính hãng', 'vot-pickleball-joola-ben-johns-hyperion-pro-iv-16mm-chinh-hang', '<p>-&nbsp;Hình dạng khí động học của&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-joola-ben-johns-hyperion-pro-iv-16mm-chinh-hang.html\">Vợt Pickleball Joola Ben Johns Hyperion Pro IV 16mm</a>&nbsp;cắt qua không khí nhanh hơn để giảm thời gian kéo và tăng tốc độ vung vợt. Giờ đây, với công nghệ Tech Flex Power (TFP), trọng lượng đã được tối ưu hóa trên toàn bộ vợt, giảm mệt mỏi và mang đến sự tự tin mà bạn cần để hiểu phong cách chơi độc đáo của mình.</p><p>-&nbsp;Bằng cách kết hợp TFP với Propulsion Core cải tiến, Pro IV mang đến cho bạn sức mạnh với khả năng tha thứ vô song để giúp bạn đưa mọi cú đánh vào cuộc chơi. Chiếc vợt bắt đầu tất cả có tay cầm dài nhất trong dòng sản phẩm của chúng tôi, cung cấp cho người chơi đòn bẩy được tăng cường để đạt được sự cân bằng hoàn hảo giữa độ xoáy và khả năng kiểm soát.</p>', 5283000, 'vot-pickleball-joola-ben-johns-hyperion-pro-iv-16mm.jpg', '2025-10-14 07:05:45'),
(92, 2, 6, 'Vợt Pickleball Joola Collin Johns Scorpeus Pro IV 16mm chính hãng', 'vot-pickleball-joola-collin-johns-scorpeus-pro-iv-16mm-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-joola-collin-johns-scorpeus-pro-iv-16mm.html\">Vợt Pickleball Joola Collin Johns Scorpeus Pro IV 16mm</a>&nbsp;là sự lựa chọn ưu tú cho người chơi theo phong cách phòng thủ. Bề mặt sợi carbon có kết cấu và lõi Propulsion của vợt giúp tăng cường sức mạnh và độ chính xác, giúp chuyển đổi giữa các cú đánh lái, tăng tốc và đánh bóng nhẹ nhàng.</p><p>- Nằm trong phân khúc vợt pickleball cao cấp, Joola Collin Johns Scorpeus Pro IV được ưu ái với hàng loạt công nghệ hiện đại, nổi bật như Tech Flex Power giúp tăng cường cảm giác bóng, cung cấp sự ổn định và cân bằng trong từng pha chạm bóng. Bên cạnh đó còn có các công nghệ khác như: HyperFoam Edge Wall, Textured Carbon Fiber Surface, NFC Enabled, Propulsion core.</p>', 5283000, 'vot-pickleball-joola-collin-johns-scorpeus-pro-iv-16mm.jpg', '2025-10-14 07:06:25'),
(93, 2, 6, 'Vợt Pickleball Joola Perseus Pro IV 14mm - Asia Colorway chính hãng', 'vot-pickleball-joola-perseus-pro-iv-14mm-asia-colorway-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-joola-perseus-pro-iv-14mm-asia-colorway-chinh-hang.html\">Vợt Pickleball Joola Perseus Pro IV 14mm - Asia Colorway</a>&nbsp;đã nhanh chóng trở thành lựa chọn hàng đầu của các vận động viên chuyên nghiệp và người chơi nghiêm túc trên toàn thế giới. Nổi tiếng với sự kết hợp hoàn hảo giữa sức mạnh, khả năng tạo xoáy (spin) và cảm giác bóng tinh tế, các thế hệ Perseus trước đã góp phần làm nên vô số chiến thắng và định hình lối chơi hiện đại.</p><p>-&nbsp;Với phối màu độc quyền, cây vợt này không chỉ nổi bật trên sân đấu mà còn thể hiện cá tính riêng của người chơi. Được thiết kế để đáp ứng những yêu cầu khắt khe nhất của các vận động viên chuyên nghiệp, Joola Perseus Pro IV 14mm - Asia Colorway mang lại sự cân bằng hoàn hảo giữa sức mạnh và khả năng kiểm soát, giúp bạn làm chủ mọi cú đánh.</p>', 7900000, 'vot-pickleball-joola-perseus-pro-iv-14mm-asia-colorway.jpg', '2025-10-14 07:07:15'),
(94, 2, 6, 'Vợt Pickleball Joola Perseus Pro IV 16mm - Asia Colorway chính hãng', 'vot-pickleball-joola-perseus-pro-iv-16mm-asia-colorway-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-joola-perseus-pro-iv-16mm-asia-colorway-chinh-hang.html\">Vợt Pickleball Joola Perseus Pro IV 16mm - Asia Colorway</a>&nbsp;đã nhanh chóng trở thành lựa chọn hàng đầu của các vận động viên chuyên nghiệp và người chơi nghiêm túc trên toàn thế giới. Nổi tiếng với sự kết hợp hoàn hảo giữa sức mạnh, khả năng tạo xoáy (spin) và cảm giác bóng tinh tế, các thế hệ Perseus trước đã góp phần làm nên vô số chiến thắng và định hình lối chơi hiện đại.</p><p>-&nbsp;Với phối màu độc quyền, cây vợt này không chỉ nổi bật trên sân đấu mà còn thể hiện cá tính riêng của người chơi. Được thiết kế để đáp ứng những yêu cầu khắt khe nhất của các vận động viên chuyên nghiệp, Joola Perseus Pro IV 16mm - Asia Colorway mang lại sự cân bằng hoàn hảo giữa sức mạnh và khả năng kiểm soát, giúp bạn làm chủ mọi cú đánh.</p>', 7990000, 'vot-pickleball-joola-perseus-pro-iv-14mm-asia-colorway.jpg', '2025-10-14 07:08:17'),
(95, 2, 6, 'Vợt Pickleball Joola Hyperion Pro IV 16mm - Asia Colorway chính hãng', 'vot-pickleball-joola-hyperion-pro-iv-16mm-asia-colorway-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-joola-hyperion-pro-iv-16mm-asia-colorway-chinh-hang.html\">Vợt Pickleball Joola Hyperion Pro IV 16mm - Asia Colorway</a>&nbsp;đây là một thiết kế ấn tượng thị giác mạnh mẽ. Không còn là những tông màu cơ bản, sự hòa quyện tinh tế giữa sắc đỏ son và vàng kim loại trên nền đen tuyền huyền bí, gợi liên tưởng đến nghệ thuật sơn mài truyền thống và sự năng động của các đô thị hiện đại châu Á.</p><p>- Các họa tiết được sắp xếp một cách có chủ ý, tạo cảm giác chuyển động và tốc độ ngay cả khi cây vợt đang đứng yên.&nbsp;Chất lượng hoàn thiện ở mức tuyệt vời, đúng như những gì người ta mong đợi từ Joola.&nbsp;Bề mặt Joola Hyperion Pro IV 16mm - Asia Colorway có độ nhám đặc trưng, cảm giác cầm nắm ban đầu rất chắc chắn và cân bằng. Cây vợt cho cảm giác nhanh nhẹn trong không khí, hứa hẹn một tốc độ vung vượt trội.</p>', 7990000, 'vot-pickleball-joola-hyperion-pro-iv-16mm-asia-colorway.jpg', '2025-10-14 07:08:57'),
(96, 10, 1, 'Giày cầu lông Yonex SHB 65X VA - Grayish Beige chính hãng', 'giay-cau-long-yonex-shb-65x-va-grayish-beige-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-yonex-shb-65x-va-grayish-beige-chinh-hang.html\">Giày cầu lông Yonex SHB 65X VA - Grayish Beige</a>&nbsp;mang đậm dấu ấn của Viktor Axelsen với phối màu trắng xanh&nbsp;nổi bật, thể hiện phong cách thi đấu bùng nổ, mạnh mẽ nhưng đòi hỏi độ ổn định tối đa. Thân giày sử dụng da tổng hợp, mang đến độ bền và khả năng cố định bàn chân chắc chắn. Đế giữa làm từ nhựa tổng hợp, đóng vai trò như lớp lõi chính cho hệ thống đệm và ổn định, đồng thời là nơi tích hợp công nghệ Power Cushion+ nổi tiếng giúp hấp thụ và hoàn trả lực hiệu quả.</p>', 1809000, 'giay-cau-long-yonex-shb-65x-va-grayish-beige.jpg', '2025-10-14 07:25:08'),
(97, 10, 1, 'Giày cầu lông Yonex Hexis', 'giay-cau-long-yonex-hexis', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-yonex-hexis.html\">Giày cầu lông Yonex Hexis</a>&nbsp;là mẫu giày mới được Yonex ra mắt trong năm 2025, mang đến sự kết hợp hoàn hảo giữa thiết kế hiện đại, trọng lượng nhẹ và công nghệ hỗ trợ tối ưu cho người chơi. Với màu sắc tinh tế, đôi giày không chỉ tạo ấn tượng về mặt thẩm mỹ mà còn giúp nâng tầm phong cách trên sân đấu.</p><p>-&nbsp;Giày được đánh giá cao bởi công nghệ Power Cushion độc quyền của Yonex giúp hấp thụ sốc và phục hồi nhanh trong trên từng bước di chuyển. Đế giày nhẹ hơn và bám tốt hơn so với đế giày thông thường. Điều này giúp di chuyển nhanh hơn và dễ dàng hơn trên sân.&nbsp;</p>', 699000, 'giay-cau-long-yonex-hexis-white-crown-blue.jpg', '2025-10-14 07:27:50'),
(98, 10, 1, 'Giày cầu lông Yonex Voltrex', 'giay-cau-long-yonex-voltrex', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-yonex-voltrex.html\">Giày cầu lông Yonex Voltrex</a>&nbsp;ghi điểm thực sự lại nằm ở trọng lượng nhẹ, độ bám cực tốt, và khả năng hấp thụ lực hiệu quả, hỗ trợ tối đa khi thi đấu cường độ cao. Dù bạn là người mới tập chơi, sinh viên năng động hay người chơi bán chuyên cần sự ổn định trong từng bước di chuyển -&nbsp;Yonex Voltrex chắc chắn sẽ khiến bạn an tâm khi xỏ chân vào.</p><p>-&nbsp;Giày được đánh giá cao bởi công nghệ Power Cushion độc quyền của Yonex giúp hấp thụ sốc và phục hồi nhanh trong trên từng bước di chuyển. Đế giày được nâng cấp để bám sân tốt hơn mang đến sự tự tin trong những pha di chuyển nhanh.</p>', 699000, 'giay-cau-long-yonex-voltrex-sky-blue-red.jpg', '2025-10-14 07:28:33'),
(99, 10, 1, 'Giày cầu lông Yonex SHB 470CR', 'giay-cau-long-yonex-shb-470cr', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-yonex-voltrex.html\">Giày cầu lông Yonex Voltrex</a>&nbsp;ghi điểm thực sự lại nằm ở trọng lượng nhẹ, độ bám cực tốt, và khả năng hấp thụ lực hiệu quả, hỗ trợ tối đa khi thi đấu cường độ cao. Dù bạn là người mới tập chơi, sinh viên năng động hay người chơi bán chuyên cần sự ổn định trong từng bước di chuyển -&nbsp;Yonex Voltrex chắc chắn sẽ khiến bạn an tâm khi xỏ chân vào.</p><p>-&nbsp;Giày được đánh giá cao bởi công nghệ Power Cushion độc quyền của Yonex giúp hấp thụ sốc và phục hồi nhanh trong trên từng bước di chuyển. Đế giày được nâng cấp để bám sân tốt hơn mang đến sự tự tin trong những pha di chuyển nhanh.</p>', 1699000, 'giay-cau-long-yonex-shb-470cr-hong-noi-dia-trung.jpg', '2025-10-14 07:29:16'),
(100, 10, 1, 'Giày cầu lông Yonex 88 Dial 3 2025', 'giay-cau-long-yonex-88-dial-3-2025', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-yonex-88-dial-3-2025.html\">Giày cầu lông Yonex 88 Dial 3&nbsp;2025</a>&nbsp;với công nghệ khóa BOA Fit độc quyền, chỉnh nhanh trong một cú xoay, ôm gọn từng chuyển động. Kết hợp cùng đế Power Cushion hỗ trợ tiếp đất êm ái, Power Cushion 88 Dial tiếp tục là lựa chọn hàng đầu để làm chủ những pha cầu tốc độ và linh hoạt.</p>', 2790000, 'giay-cau-long-yonex-88-dial-3-2025-deep-green.jpg', '2025-10-14 07:30:12'),
(101, 10, 1, 'Giày cầu lông Yonex 88 Dial 3 Wide 2025', 'giay-cau-long-yonex-88-dial-3-wide-2025', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-yonex-88-dial-3-wide-2025.html\">Giày cầu lông Yonex 88 Dial 3 Wide 2025</a>&nbsp;với công nghệ khóa BOA Fit độc quyền, chỉnh nhanh trong một cú xoay, ôm gọn từng chuyển động. Kết hợp cùng đế Power Cushion hỗ trợ tiếp đất êm ái, Power Cushion 88 Dial tiếp tục là lựa chọn hàng đầu để làm chủ những pha cầu tốc độ và linh hoạt.</p><p>- Yonex 88 Dial 3 Wide 2025 là mẫu giày cao cấp mới nhất được Yonex ra mắt trong năm 2025, mang đến sự kết hợp hoàn hảo giữa thiết kế thời trang hiện đại và chất lượng đỉnh cao. Với phom rộng (Wide), sản phẩm đặc biệt phù hợp với người chơi có bàn chân bè, mang lại cảm giác thoải mái tối đa trong từng bước di chuyển.</p><p><br></p>', 2790000, 'giay-cau-long-yonex-88-dial-3-2025-light-begie.jpg', '2025-10-14 07:30:55'),
(102, 10, 1, 'Giày cầu lông Yonex Pyro', 'giay-cau-long-yonex-pyro', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-yonex-pyro.html\">Giày cầu lông Yonex Pyro</a>&nbsp;là lựa chọn mới mẻ và đầy đột phá dành cho các vận động viên và người chơi phong trào đang tìm kiếm sự kết hợp giữa hiệu năng thi đấu và phong cách thiết kế hiện đại.&nbsp;Yonex Pyro gây ấn tượng mạnh mẽ với phối màu&nbsp;thời thượng, kết hợp cùng các chi tiết&nbsp;tinh tế, mang lại cảm giác năng động nhưng vẫn giữ nét thanh lịch.</p><p>-&nbsp;Giày được&nbsp;chế tác với các chất liệu siêu bền như da tổng hợp phủ PU và cao su chống mài mòn, Yonex Pyro có khả năng chống trầy xước, chịu lực tốt, duy trì form dáng bền bỉ dù phải sử dụng trong thời gian dài.</p>', 686920, 'giay-cau-long-yonex-pyro-black-gold.jpg', '2025-10-14 07:31:42'),
(103, 10, 1, 'Giày cầu lông Yonex Atlas 4', 'giay-cau-long-yonex-atlas-4', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-yonex-atlas-4.html\">Giày cầu lông Yonex Atlas 4</a>&nbsp;là dòng giày cầu lông của Yonex, được thiết kế để mang lại hiệu suất vượt trội và khả năng kiểm soát tuyệt đối trên sân. Atlas&nbsp;4 tích hợp các công nghệ hiện đại của Yonex để tối ưu hóa hiệu suất di chuyển và hỗ trợ người chơi.&nbsp;</p><p>-&nbsp;Giày được thiết kế để giúp người chơi di chuyển linh hoạt và kiểm soát tốt các pha cầu, tạo lợi thế trong trận đấu.&nbsp;ATLAS 4 có nhiều tùy chọn màu sắc ấn tượng, giúp người chơi thể hiện phong cách riêng trên sân.&nbsp;Giày chú trọng đến sự thoải mái cho người mang, đặc biệt là phần ngón chân, giúp giảm áp lực và tăng cường sự linh hoạt.&nbsp;</p>', 690000, 'giay-cau-long-yonex-atlas-4-b-blue-aqua-marine.jpg', '2025-10-14 07:32:50'),
(104, 10, 2, 'Giày cầu lông Lining AYTV029-1 chính hãng', 'giay-cau-long-lining-aytv029-1-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-aytv029-1-chinh-hang.html\">Giày cầu lông Lining AYTV029-1</a>&nbsp;được thiết kế theo phong cách thể thao đậm chất nam tính. Phom dáng chắc chắn, ôm gọn bàn chân giúp gia tăng khả năng kiểm soát trong từng pha di chuyển. Màu sắc phối hợp tinh tế giữa các tông trung tính và nổi bật, phù hợp với nhiều trang phục thể thao khác nhau. Các đường may và họa tiết được xử lý gọn gàng, tỉ mỉ, tạo nên vẻ ngoài chuyên nghiệp và hiện đại.</p><p>- Phần trên giày Lining AYTV029-1&nbsp;sử dụng chất liệu tổng hợp cao cấp kết hợp lưới thoáng khí, giúp tăng khả năng lưu thông không khí, giữ cho bàn chân luôn khô ráo, dễ chịu dù vận động với cường độ cao. Lớp đệm êm ái bên trong bảo vệ bàn chân khỏi va đập, hạn chế tình trạng mỏi hoặc đau sau các buổi tập kéo dài.</p>', 1130000, 'giay-cau-long-lining-aytv029-1.jpg', '2025-10-14 07:34:23'),
(105, 10, 2, 'Giày cầu lông Lining AYTU001-7 chính hãng', 'giay-cau-long-lining-aytu001-7-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-aytu001-7-chinh-hang.html\">Giày cầu lông Lining AYTU001-7</a>&nbsp;là sản phẩm trung cấp của thương hiệu Lining nổi tiếng về sản xuất phụ kiện thể thao và cầu lông trên toàn thể giới, với thiết kế và được làm bằng chất liệu cao cấp. Đây là một sự lựa chọn không thể bỏ qua đối với các lông thủ từ phong trào đến chuyên nghiệp.</p><p>- Giày có ngoại hình thiết kế hiện đại với tông màu trắng chủ đạo phối thêm các chi tiết đen xám tạo điểm nhấn nổi bật đảm bảo khi lên chân các lông thủ sẽ vô cùng nổi bật sang trọng và đặc biệt đây là phối màu khiến cho anh em lông thủ thích thú.</p>', 1200000, 'giay-cau-long-lining-aytu001-7.jpg', '2025-10-14 07:35:05'),
(106, 10, 2, 'Giày cầu lông Lining AYTU025-1 chính hãng', 'giay-cau-long-lining-aytu025-1-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-aytu025-1-chinh-hang.html\">Giày cầu lông Lining AYTU025-1</a>&nbsp;sử dụng màu sắc đơn giản và giản dị. Phần trên được làm từ chất liệu thoải mái, dễ chịu và mềm mại, mang lại cảm giác chân tốt. Thiết kế logo thương hiệu Li Ning, tay nghề tỉ mỉ, làm nổi bật sự quyến rũ của thương hiệu. Thiết kế chống va chạm của mũi giày giúp giảm trầy xước hoặc va chạm trên ngón chân và nâng niu từng bước chân.</p><p>- Logo Li-Ning trên thân giày được thể hiện thông qua sự tỉ mỉ trong gia công, tạo nên điểm nhấn thú vị cho thiết kế tổng thể. Đây không chỉ là một biểu tượng thương hiệu, mà còn là một minh chứng cho sự chất lượng và tinh tế trong từng chi tiết của sản phẩm.</p>', 1200000, 'giay-cau-long-lining-aytu025-1.jpg', '2025-10-14 07:35:48'),
(107, 10, 2, 'Giày cầu lông Lining AYTV003-1', 'giay-cau-long-lining-aytv003-1', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-aytv003-1.html\">Giày cầu lông Lining AYTV003-1</a>&nbsp;là một trong những mẫu giày tầm trung nổi bật nhất của&nbsp;thương hiệu Lining, được&nbsp;tạo nên từ sự kết hợp tinh tế với&nbsp;cách phối màu đơn giản,&nbsp;thiết kế giản dị&nbsp;mang đến sự ấn tượng mạnh mẽ cho người mang ngay từ cái nhìn đầu tiên.</p><p>- Phần trên giày Lining AYTV003-1&nbsp;được chế tạo từ chất liệu độc đáo, tạo nên lớp vải mềm mại và thoải mái, ôm trọn bàn chân một cách êm ái, mang lại cảm giác thú vị và chân tốt từ mỗi bước di chuyển.</p>', 1500000, 'giay-cau-long-lining-aytv003-1.jpg', '2025-10-14 07:36:35'),
(109, 10, 2, 'Giày cầu lông Lining AYZV001-2 chính hãng', 'giay-cau-long-lining-ayzv001-2-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-ayzv001-2-chinh-hang.html\">Giày cầu lông Lining AYZV001-2</a>&nbsp;là dòng giày cầu lông cao cấp được phát triển dành riêng cho các tay vợt nữ. Sở hữu gam màu trắng - xanh pastel - hồng nhẹ, đôi giày mang đến cảm giác trẻ trung, hiện đại nhưng vẫn giữ nét tinh tế. Thiết kế tối giản nhưng đầy sức hút, phù hợp cho cả những buổi tập luyện thường ngày lẫn các trận thi đấu căng thẳng.</p><p>- Điểm mạnh của Lining AYZV001-2 chính là trọng lượng siêu nhẹ, giúp người chơi di chuyển linh hoạt, phản xạ nhanh chóng và duy trì tốc độ trong suốt trận đấu. Phần mũi giày được thiết kế chống va đập, giảm thiểu nguy cơ trầy xước và bảo vệ bàn chân khi tiếp xúc mạnh với mặt sân. Đế ngoài Non-Marking mang đến khả năng bám sân ổn định, hạn chế trượt ngã đồng thời không để lại dấu vết trên sàn thi đấu.</p>', 2119000, 'giay-cau-long-lining-ayzv001.jpg', '2025-10-14 07:38:21'),
(110, 10, 2, 'Giày cầu lông Lining AYTV015-3 chính hãng', 'giay-cau-long-lining-aytv015-3-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-aytv015-3-chinh-hang.html\">Giày cầu lông Lining AYTV015-3</a>&nbsp;là một đôi giày tập luyện cầu lông đa năng, được thiết kế để mang lại sự thoải mái và ổn định cho người chơi. Thiết kế chống va chạm ở ngón chân giúp giảm trầy xước hoặc va chạm ở ngón chân và bảo vệ từng bước đi.</p><p>-&nbsp;Lining AYTV015-3 sở hữu ngoại hình thể thao mạnh mẽ, lấy cảm hứng từ phong cách hiện đại và tối giản. Đường nét tinh tế kết hợp phối màu độc đáo tạo nên diện mạo ấn tượng và cá tính. Logo Li-Ning được đặt nổi bật, tôn lên thương hiệu, đồng thời mang đến vẻ sang trọng và đẳng cấp cho người sử dụng.&nbsp;Thiết kế cổ giày ôm vừa vặn, kết hợp hệ thống dây buộc chắc chắn, giúp cố định bàn chân và tăng sự ổn định trong những pha di chuyển nhanh.</p>', 1690000, 'giay-cau-long-lining-aytv015-3.jpg', '2025-10-14 07:39:08'),
(111, 10, 2, 'Giày cầu lông Lining AYTU001-9 chính hãng', 'giay-cau-long-lining-aytu001-9-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-aytu001-9-chinh-hang.html\">Giày cầu lông Lining AYTU001-9</a>&nbsp;được thiết kế với tông màu đơn giản, mang phong cách tối giản và casual. Upper làm từ Synthetic leather mềm mại, tạo cảm giác thoải mái cho bàn chân. Logo thương hiệu Li-Ning trên thân giày cùng đường may tinh xảo, thể hiện sự chỉn chu trong từng chi tiết. Thiết kế mũi giày chống va đập, giúp giảm trầy xước hoặc chấn thương ngón chân, bảo vệ mỗi bước di chuyển.</p><p>-&nbsp;Thiết kế cổ giày ôm vừa vặn, kết hợp hệ thống dây buộc chắc chắn, giúp cố định bàn chân và tăng sự ổn định trong những pha di chuyển nhanh.</p><br>', 1200000, 'giay-cau-long-lining-aytu001-9.jpg', '2025-10-14 07:40:28'),
(112, 10, 2, 'Giày cầu lông Lining AYTU001-8 chính hãng', 'giay-cau-long-lining-aytu001-8-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-aytu001-8-chinh-hang.html\">Giày cầu lông Lining AYTU001-8</a>&nbsp;là phiên bản nâng cấp vượt trội thuộc dòng ALMIGHTY, được thiết kế dành riêng cho những vận động viên và người chơi yêu cầu sự ổn định, tốc độ và độ bền cao. Với những cải tiến nổi bật về công nghệ đệm, thiết kế mặt đế và khả năng hỗ trợ chuyển động linh hoạt.</p><p>- Lining AYTU001-8 sở hữu ngoại hình thể thao mạnh mẽ, lấy cảm hứng từ phong cách hiện đại và tối giản. Đường nét tinh tế kết hợp phối màu độc đáo tạo nên diện mạo ấn tượng và cá tính. Logo Li-Ning được đặt nổi bật, tôn lên thương hiệu, đồng thời mang đến vẻ sang trọng và đẳng cấp cho người sử dụng.</p>', 1200000, 'giay-cau-long-lining-aytu001-8.jpg', '2025-10-14 07:41:16'),
(113, 10, 2, 'Giày cầu lông Lining AYTV027-1 chính hãng', 'giay-cau-long-lining-aytv027-1-chinh-hang', '<p>-&nbsp;<a href=\"https://shopvnb.com/giay-cau-long-lining-aytv027-1-chinh-hang.html\">Giày cầu lông Lining AYTV027-1</a>&nbsp;sử dụng màu sắc đơn giản và giản dị. Phần trên được làm từ chất liệu thoải mái, dễ chịu và mềm mại, mang lại cảm giác chân tốt.&nbsp;Thiết kế chống va chạm của mũi giày giúp giảm trầy xước hoặc va chạm trên ngón chân và nâng niu từng bước chân.</p><p>- Ngay từ cái nhìn đầu tiên, Lining AYTV027-1 tạo ấn tượng mạnh mẽ với kiểu dáng khỏe khoắn và các chi tiết sắc nét, năng động. Tông màu phối hợp hài hòa, nổi bật phong cách thể thao nam tính và cá tính. Phần upper được làm từ chất liệu tổng hợp cao cấp, kết hợp với lưới thoáng khí giúp tăng khả năng lưu thông không khí, hạn chế đọng mồ hôi khi chơi lâu trên sân.</p>', 1200000, 'giay-cau-long-lining-aytv027-1.jpg', '2025-10-14 07:42:02'),
(114, 2, 5, 'Vợt PickleBall Head Gravity Tour Lite', 'vt-pickleball-head-gravity-tour-lite', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-head-gravity-tour-lite-2023-chinh-hang.html\">Vợt PickleBall Head Gravity Tour Lite 2023 Chính Hãng</a>&nbsp;là cây vợt Pickleball tầm trung chất lượng đến từ thương hiệu Head, tích&nbsp;hợp các công nghệ mới nhất của hãng&nbsp;trong một cây vợt có trọng lượng nhẹ hơn và cốt có bọt, có xoáy đem lại sự kiểm soát tốt hơn.</p><p>- Với&nbsp;độ dày 14mm cùng&nbsp;trọng lượng&nbsp;215&nbsp;g / 7.6&nbsp;Oz, vợt thiên về lối chơi công thủ toàn diện, hơi thiên&nbsp;công&nbsp;và kiểm soát trận đấu.&nbsp;Cây vợt này phù&nbsp;hợp với những người&nbsp;chơi có&nbsp;lực&nbsp;cổ tay chưa tốt, đặc biệt là những người mới chơi cũng&nbsp;có thể sử dụng được.</p>', 2690000, 'vot-pickleball-head-gravity-tour-lite.jpg', '2025-10-28 13:23:41'),
(115, 2, 5, 'Vợt PickleBall Head Extreme Tour Lite 2023', 'vt-pickleball-head-extreme-tour-lite-2023', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-head-extreme-tour-lite-2023-chinh-hang.html\">Vợt PickleBall Head Extreme Tour Lite 2023 Chính Hãng</a>&nbsp;được sản xuất&nbsp;dựa trên nền tảng công nghệ của dòng Head Extreme cùng mức giá thành hợp lý, cây vợt này mang đến những trải nghiệm&nbsp;tuyệt vời, giúp người chơi cải thiện kỹ năng và nâng cao hiệu suất vượt trội.</p><p>- Với&nbsp;độ dày 11mm và trọng lượng&nbsp;205 g / 7.2 Oz, vợt thiên về lối chơi tấn công mạnh mẽ, uy lực và kiểm soát trận đấu.&nbsp;Cây vợt này phù&nbsp;hợp với những người&nbsp;chơi có&nbsp;lực&nbsp;cổ tay chưa tốt, đặc biệt là những người mới chơi cũng&nbsp;có thể sử dụng được.</p>', 2290000, 'vot-pickleball-head-extreme-tour-lite.jpg', '2025-10-28 13:31:58'),
(116, 2, 5, 'Vợt PickleBall Head SPARK ELITE (V1)', 'vt-pickleball-head-spark-elite-v1', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-head-spark-elite-v1.html\">Vợt PickleBall Head SPARK ELITE (V1)</a>&nbsp;là một trong những cây vợt Pickleball chất lượng ở phân khúc tầm trung đến từ&nbsp;thương hiệu Head, mang thiết kế vô cùng mạnh mẽ, nổi bật và bắt mắt.</p><p>- Với&nbsp;độ dày 13mm và trọng lượng&nbsp;230 g /&nbsp;8.1 oz,&nbsp;vợt thiên về lối chơi&nbsp;tấn công cơ động, tốc độ&nbsp;và giàu sức mạnh.&nbsp;Cây vợt này phù&nbsp;hợp với những người&nbsp;chơi có trình độ trung bình trở lên, lực&nbsp;cổ tay tốt có thể sử dụng được.</p>', 1500000, 'vot-pickleball-head-spark-elite-v1.jpg', '2025-10-28 13:34:45'),
(117, 2, 5, 'Vợt PickleBall Head Pack Flash chính hãng', 'vt-pickleball-head-pack-flash-chnh-hng', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-head-pack-flash.html\">Vợt PickleBall Head Pack Flash</a>&nbsp;bao gồm 2 cây vợt PickleBall Head Pack Flash và 2 quả bóng Pickleball,&nbsp;vô cùng tiện lợi cho những ai muốn tìm cho mình 1 set vợt đầy đủ phụ kiện mà tiết kiệm chi phí.</p><p>-&nbsp;Vợt&nbsp;có trọng lượng tiêu chuẩn là 230&nbsp;gr /&nbsp;8.1 Oz phù hợp&nbsp;với đại đa số người chơi, độ dày 13mm theo thiên hướng lối đánh tấn công với các đường bóng nhanh và độ cơ động vượt trội.</p>', 2600000, 'vot-pickleball-head-pack-flash.jpg', '2025-10-28 14:24:14'),
(118, 2, 5, 'Vợt PickleBall Head RADICAL TOUR EX RAW', 'vt-pickleball-head-radical-tour-ex-raw', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-pickleball-head-radical-tour-ex-raw.html\">Vợt PickleBall Head RADICAL TOUR EX RAW</a>&nbsp;là siêu phẩm vợt Pickleball cao cấp của thương hiệu Head, mang đến khả năng kiểm soát linh hoạt cùng sức mạnh vượt trội.</p><p>- Với&nbsp;độ dày 15mm cùng trọng lượng 230 gr / 8.1 Oz, vợt thiên về lối chơi&nbsp;toàn diện, cân bằng giữa sức mạnh và kiểm soát thế trận. Cây vợt này phù hợp với những người chơi có trình độ từ trung bình trở lên, lực cổ tay tốt mới có thể sử dụng được.</p>', 4200000, 'vot-pickleball-head-radical-tour.jpg', '2025-10-28 14:26:46'),
(119, 11, 7, 'Vợt tennis Wilson Traid Three FRM 2', 'vt-tennis-wilson-traid-three-frm-2', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-tennis-wilson-traid-three-frm-2-chinh-hang-wr056511u2.html\">Vợt tennis Wilson Traid Three FRM 2 (264gr) chính hãng - WR056511U2</a>&nbsp;được&nbsp;với trọng lượng 264gt cùng với mặt vợt có diện tích rộng, được thiết kế cho lối chơi phòng thủ, kiểm soát các đường bóng và trọng lượng nhẹ giúp những người chơi có cổ tay yếu, đặc biệt là người mới có thể dễ dàng làm quen và kiểm soát vợt.</p>', 4490000, 'vot-tennis-wilson-traid-three-frm-2.jpg', '2025-10-29 02:04:14'),
(120, 11, 7, 'Vợt Tennis Wilson Hyper Hammer 5.3', 'vt-tennis-wilson-hyper-hammer-53', '<p>Hyper Hammer có thể xem là dòng vợt lâu đời nhất của nhà Wilson. Cho đến nay, dòng vợt cổ điển này vẫn là một sự lựa chọn an toàn của nhiều người chơi tennis phong trào. Với những người mới tiếp cận tennis hay những người chơi chưa nắm vững kĩ thuật thì sản phẩm&nbsp;<a href=\"https://shopvnb.com/vot-tennis-wilson-hyper-hammer-5-3-242gr-blk-chinh-hang-wr152111u2\">Vợt Tennis Wilson Hyper Hammer 5.3 (242gr) BLK 2 chính hãng</a>&nbsp;là một sự lựa chọn không nên bỏ qua.</p><p><br></p><p>Hyper Hammer 5.3 là một cây vợt nhẹ&nbsp;(chỉ 242g) nhờ vào thành phần Graphite và Hyper Carbon. Nhờ vào chất liệu cao cấp, thân vợt dù nhẹ nhưng vẫn có được sự cứng cáp, có thể chịu được những cú va chạm khi chơi bóng.</p>', 3600000, 'vot-tennis-wilson-minions-clash-100l-v2-0.jpg', '2025-10-29 02:07:01'),
(121, 11, 7, 'Vợt tennis Wilson Ultra Team V4.0 RKT 2', 'vt-tennis-wilson-ultra-team-v40-rkt-2', '<p><a href=\"https://shopvnb.com/vot-tennis-wilson-ultra-team-v4-0-rkt-2-280gr-chinh-hang-wr108710u2.html\">Vợt tennis Wilson Ultra Team V4.0 RKT 2 (280gr) chính hãng</a>&nbsp;là mẫu vợt thuộc phân khúc cao cấp dành cho người chơi tennis muốn nâng cao và hoàn thiện kĩ năng của mình trên sân với trọng lượng tiêu chuẩn được nhiều người chơi hiện nay sử dụng (280gr).</p><p>Wilson Ultra Team V4.0 RKT 2 (280gr)&nbsp;có thiết kế bóng bẩy, lôi cuốn với hiệu suất mạnh mẽ phù hợp với các kỹ năng chuyên nghiệp. Được trang bị cấu trúc vành khung mỏng&nbsp;và độ nhẹ đầu đáng kể&nbsp;giúp ưu tiên kiểm soát và cảm nhận bóng tốt hơn, cây vợt này cũng cung cấp kiểu dây mở cho phép tạo ra nhiều xoáy lên và độ phản hồi cao hơn so với mặt dây.</p>', 4850000, 'vot-tennis-wilson-ultra-team-v4-0-rkt-2.jpg', '2025-10-29 02:09:41'),
(122, 11, 7, 'Vợt tennis Wilson Pro Staff 97L V14 FRM2', 'vt-tennis-wilson-pro-staff-97l-v14-frm2', '<p>- Bạn đang tìm kiếm một cây vợt tennis nhẹ nhàng, linh hoạt, mang đến sự kết hợp hoàn hảo giữa sức mạnh và độ chính xác?&nbsp;<a href=\"https://shopvnb.com/vot-tennis-wilson-pro-staff-97l-v14-frm2-290gr-chinh-hang-wr125911u2.html\">Vợt tennis Wilson Pro Staff 97L V14 FRM2 (290gr) chính hãng - WR125911U2</a>&nbsp;chính là sự lựa chọn hoàn hảo dành cho bạn!</p><p>- Vợt tennis Wilson Pro Staff 97L V14 là phiên bản mới nhất năm 2023 của dòng Pro Staff huyền thoại, được tay vợt vĩ đại Roger Federer tin dùng. Cây vợt này được thiết kế dành cho người chơi trình độ trung cấp đến cao cấp, ưa chuộng khả năng kiểm soát và cảm giác bóng tinh tế.</p>', 6000000, 'vot-tennis-wilson-pro-staff-97l-v14-frm2.jpg', '2025-10-29 02:11:54'),
(123, 11, 7, 'Vợt tennis trẻ em Wilson Blade V7.0 RKT 26', 'vt-tennis-tr-em-wilson-blade-v70-rkt-26', '<p><a href=\"https://shopvnb.com/vot-tennis-tre-em-wilson-blade-v7-0-rkt-26-255gr-chinh-hang-wr014310.html\">Vợt tennis trẻ em Wilson Blade V7.0 RKT 26 (255gr) chính hãng - WR014310</a>&nbsp;mang lại hiệu suất cao cho các bé trên 11&nbsp;tuổi,&nbsp;đã có thời gian tập luyện tennis và đang muốn định hình lối chơi,&nbsp;chuyển sang phong cách mạnh mẽ hơn. Cây vợt này mang lại khả năng kiểm soát cú đánh tối ưu nhờ sự kết hợp giữa kiểu dáng, cảm giác và sự&nbsp;cơ động.</p><p>Khung vợt được thiết kế theo&nbsp;công nghệ độc quyền của Wilson giúp bóng tiếp xúc lâu hơn với dây để kiểm soát tối ưu mỗi cú đánh.</p><p>Cây vợt được trang bị công nghệ&nbsp;Top Grip Taper giúp mở rộng&nbsp;bề mặt cầm nắm ở phần cổ vợt, giúp người chơi thoải mái và có nhiều lựa chọn trong những pha bóng khác nhau.</p>', 4300000, 'vot-tennis-tre-em-wilson-blade-v7-0-rkt.jpg', '2025-10-29 02:15:00'),
(124, 11, 7, 'Vợt tennis Wilson Shift 99L V1 (285gr)', 'vt-tennis-wilson-shift-99l-v1-285gr', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-tennis-wilson-shift-99l-v1-285gr-chinh-hang-145511.html\">Vợt tennis Wilson Shift 99L V1 (285gr) chính hãng - 145511</a>&nbsp;là cây vợt tiên tiến tiếp theo của một trong những thương hiệu thể thao hàng đầu. Shift 99L được chế tạo đặc biệt để cung cấp cho người chơi sức mạnh và sự tự tin có thể kiểm soát được.</p><p>- Được xây dựng bằng công nghệ khung ARC 3D để có khả năng uốn ngang tối đa và độ ổn định xoắn tốt nhất trong phân khúc, Shift cho phép người chơi đánh bóng sâu liên tục trong sân với sự tự tin, độ sâu và độ xoáy. Cây vợt nặng 10,1 ounce (285gr) &nbsp;không có dây và có độ dày thành vợt &nbsp;23,5 mm, đồng thời có kiểu dây 16x20 dày đặc để mang đến mang đến cho người chơi sự cân bằng tối ưu giữa sức mạnh và khả năng kiểm soát</p>', 5400000, 'vot-tennis-wilson-shift-99l-v1.jpg', '2025-10-29 02:16:59'),
(125, 11, 7, 'Vợt tennis Wilson Traid Five FRM 2 (267gr)', 'vt-tennis-wilson-traid-five-frm-2-267gr', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-tennis-wilson-traid-five-frm-2-chinh-hang-wr056611u2.html\">Vợt tennis Wilson Traid Five FRM 2 (267gr) chính hãng - WR056611U2</a>&nbsp;được thiết kế với gam màu đỏ toát lên vẻ nổi bật, hiện đại cùng với các công nghệ vật liệu cao cấp. Cùng với trọng lượng nhẹ 267gr là một cây vợt nhẹ dành cho những người chơi mới, những ai chưa quen với các động tác kĩ thuật đang tìm một cây vợt chất lượng để tập luyện.</p><p><br></p><p>- Được sử dụng công nghệ Triad tạo cho người đánh có cảm giác thoải mái nhất với mặt vợt kích thước trung bình và trọng lượng nhẹ&nbsp;giúp hỗ trợ lực đánh ra,&nbsp;mang lại cảm giác mềm nhẹ nhàng khi đánh.</p>', 4600000, 'vot-tennis-wilson-traid-five-frm-2.jpg', '2025-10-29 02:19:19'),
(126, 11, 7, 'Vợt tennis Wilson Clash 100L V2.0 Noir limited', 'vt-tennis-wilson-clash-100l-v20-noir-limited', '<p>-&nbsp;<a href=\"https://shopvnb.com/vot-tennis-wilson-clash-100l-v2-0-noir-limited-chinh-hang-wr142211u2.html\">Vợt tennis Wilson Clash 100L V2.0 Noir limited (280gr) chính hãng - WR142211U2</a>&nbsp;được thiết kế với màu đen tuyền huyền bí tạo nên sự cuốn hút và không kém phần hiện đại. Được sử dụng các vật liệu cao cấp cùng với các công nghệ đặc biệt tạo nên một cây vợt kết hợp khéo léo cho lối đánh linh hoạt và ổn đinh.</p><p>-&nbsp;&nbsp;Với độ cứng thấp và khung vợt hình dạng độc đáo, thiết kế bằng phương pháp mô phỏng 3D giúp&nbsp;cực kì linh hoạt, mềm dẻo và có khả năng biến dạng đáng kính ngạc hỗ trợ&nbsp;tạo ra những cú đánh cực mạnh cùng khả năng kiểm soát bóng cao nhất. Được sử dụng&nbsp;công nghệ&nbsp;FortyFive&nbsp;gia cố chắc chắn ở các bề mặt cong trên toàn bộ khung vợt, làm tăng tính ổn định, êm ái khi đánh bóng</p>', 4800000, 'vot-tennis-wilson-clash-100l-v2-0-noir-limited.jpg', '2025-10-29 02:23:14'),
(127, 11, 8, 'Vợt Tennis Pure Drive Wimbledom 300gr', 'vt-tennis-pure-drive-wimbledom-300gr', '<p>Với thiết kế lấy cảm hứng từ giải Grand Slam huyền thoại của Anh,&nbsp;<a href=\"https://banhang.shopvnb.com/vot-tennis-pure-drive-wimbledom-300gr-chinh-hang-101516\">Vợt Tennis Pure Drive Wimbledom 300gr chính hãng (101516)</a>&nbsp;kết hợp sức mạnh,&nbsp;sự ổn định và cảm giác đánh. Cây vợt này đưa khái niệm về lối chơi cơ bản mạnh mẽ lên một tầm cao hoàn toàn mới, mang đến một vũ khí mạnh mẽ cho những người chơi khao khát sức mạnh dễ dàng và khả năng xoáy dễ dàng. Thêm vào đó, thiết kế của Phiên bản giới hạn Wimbledon mang lại cảm giác độc quyền cho người hâm mộ giải đấu danh giá.</p>', 5300000, 'vot-tennis-pure-drive-wimbledom-300gr.jpg', '2025-10-29 08:42:06'),
(130, 11, 8, 'Vợt Tennis Babolat Strike Evo 290gr', 'vt-tennis-babolat-strike-evo-290gr', '<p><a href=\"https://shopvnb.com/vot-tennis-babolat-strike-evo-290gr-chinh-hang-101515.html\">Vợt Tennis Babolat Strike Evo 290gr chính hãng (101515)</a>&nbsp;mang lại sức mạnh, khả năng kiểm soát bóng và sự thoải mái&nbsp;giúp bạn phát huy hết tiềm năng của mình. Nhờ cách bố trí&nbsp;kiểu đan 16 x 19 và kích thước mặt vợt 102 in2, cây vợt sẽ giúp bạn tung ra những cú đánh mạnh mẽ một cách dễ dàng hơn bao giờ hết.</p>', 3550000, 'vot-tennis-babolat-strike-evo-290gr.jpg', '2025-10-29 14:20:31'),
(131, 11, 8, 'Vợt Tennis Babolat Pure Drive Junior 25', 'vt-tennis-babolat-pure-drive-junior-25', '<p>Sức mạnh đánh bóng là yếu tố khiến dòng Pure Drive của Babolat trở thành biểu tượng. Không chỉ được các tay vợt chuyên nghiệp tin dùng, Pure Drive còn là một trong những cây vợt bán chạy nhất mọi thời đại nhờ vào tính linh hoạt và sức mạnh vượt trội trong tay bất cứ người chơi nào.</p><p>Cảm giác bóng&nbsp;cũng được cải thiện đáng kể nhờ công nghệ SWX PURE FEEL giúp hỗ trợ loại bỏ chấn động và giảm rung, kết hợp với khung vợt mới sẽ mang lại cho người chơi cảm giác bóng tuyệt vời nhất kèm với âm thanh “cực kỳ đã” mang chất đặc trưng của dòng Pure Drive lần này.</p>', 2500000, 'vot-tennis-babolat-pure-drive-junior-25.jpg', '2025-10-29 14:22:32'),
(132, 11, 8, 'Vợt Tennis Babolat Pure Drive Junior 26 Girl', 'vt-tennis-babolat-pure-drive-junior-26-girl', '<p>Babolat cho ra mắt&nbsp;Pure Drive vào năm 1994 và dòng vợt này đã nhanh chóng chiếm lĩnh thị trường, trở thành một biểu tượng và chuẩn mực cho các cây vợt thiên về sức mạnh. Trong suốt nhiều năm qua, Babolat không ngừng cải tiến những mẫu vợt của họ để đáp ứng nhu cầu ngày càng phức tạp của bộ môn tennis. Và giờ đây, Pure Drive đã thành công trở thành một trong những dòng vợt phổ biến và được ưa chuộng nhất Thế Giới.</p><p><a href=\"https://shopvnb.com/vot-tennis-babolat-pure-drive-junior-26-girl-chinh-hang-140424.html\">Vợt Tennis Babolat Pure Drive Junior 26 Girl chính hãng (140424)</a>&nbsp;được làm từ vật liệu cao cấp và trang bị những công nghệ tiên tiến, đưa yếu tố sức mạnh bùng nổ của&nbsp;vợt lên tầm cao mới.</p>', 2400000, 'vot-tennis-babolat-pure-drive-junior-26-girl.jpg', '2025-10-29 14:26:54'),
(133, 11, 8, 'Vợt tennis Babolat Pure Strike 18/20 305gr', 'vt-tennis-babolat-pure-strike-1820-305gr', '<p>Bứt phá giới hạn với&nbsp;<a href=\"https://shopvnb.com/vot-tennis-babolat-pure-strike-18-20-305gr-chinh-hang-101404\">Vợt Tennis Babolat Pure Strike 18/20 305gr Chính Hãng</a>&nbsp;- cây vợt được thiết kế dành cho những người chơi tennis đầy tham vọng, khao khát kiểm soát hoàn toàn trận đấu.</p><p>Vợt tennis Babolat Pure Strike 18/20 305gr là vũ khí hoàn hảo cho những người chơi khao khát sự kiểm soát hoàn hảo và độ chính xác cao trong từng cú đánh. Được thiết kế với mặt vợt 98 inch, mật độ dây 18x20 và trọng lượng 305gr, cây vợt này mang đến sự kết hợp hoàn hảo giữa cảm giác bóng và lực đánh.</p>', 4149999, 'vot-tennis-babolat-pure-strike-18-20-305gr.jpg', '2025-10-29 14:28:57'),
(134, 11, 8, 'Vợt Tennis Babolat Evo Aero Pink 275gr', 'vt-tennis-babolat-evo-aero-pink-275gr', '<p>Vợt Tennis Babolat Evo Aero&nbsp;Pink 275gr chính hãng&nbsp;là sản phẩm vợt tennis thuộc phân khúc cao cấp của hãng Babolat với thiết kế thể thao hiện đại, tông màu thanh thoát, tinh tế, Evo Aero Pink sẽ mang lại vẻ ngoài nổi bật và đẹp mắt trên sân.</p><p>Cấu trúc khung của cây vợt được cân bằng giữa sức mạnh và sự&nbsp;thoải mái cho từng cú đánh bóng. Phần đầu vợt được đổi mới để người chơi có thể tạo độ xoáy cao hơn và cảm giác đánh dễ dàng hơn. Kết hợp với kiểu dây mở 16 x 18, những đường bóng của bạn sẽ khiến đối thủ phải chật vật vì độ xoáy.</p>', 4250000, 'vot-tennis-babolat-evo-aero-pink-275gr.jpg', '2025-10-29 14:33:19'),
(135, 11, 8, 'Vợt Tennis Babolat Pure Drive Team Wimbledon 285gr', 'vt-tennis-babolat-pure-drive-team-wimbledon-285gr', '<p>Babolat ra mắt Pure Drive vào năm 1994&nbsp;và đã nhanh chóng thiết lập một chuẩn mực mới về&nbsp;Sức Mạnh – Power. Và Babolat cũng không ngừng cải tiến và đổi mới để phù hợp hơn với những trận đấu tennis hiện đại.​Năm 2021, thế hệ thứ 10 của&nbsp;Pure Drive&nbsp;đã được ra mắt.&nbsp;Pure Drive 2021&nbsp;mang đến sức mạnh bùng nổ và gia tăng cảm giác bóng cho người sử dụng.</p><p>Vợt Tennis Babolat Pure Drive Team Wimbledon 285gr chính hãng (101471)&nbsp;dành cho người chơi đang tìm kiếm một cây vợt Mạnh Mẽ - Độ Chính Xác ấn tượng và khả năng tạo xoáy dễ dàng.&nbsp;Babolat&nbsp;đã nâng cấp hệ thống&nbsp;HTR - The High Torsional Rigidity, lớp&nbsp;Graphite&nbsp;đã được thiết kế lại với độ cứng xoắn cao hơn, dẫn đến việc truyền năng lượng hiệu quả hơn đến trái bóng.</p><br>', 4700000, 'vot-tennis-babolat-pure-drive-team-wimbledon-285gr.jpg', '2025-10-29 14:35:21'),
(136, 11, 8, 'Vợt Tennis Babolat Evo Aero Lite Unstrung 260gr ', 'vt-tennis-babolat-evo-aero-lite-unstrung-260gr', '<p><a href=\"https://shopvnb.com/vot-tennis-babolat-evo-aero-lite-unstrung-260gr-chinh-hang-101507.html\">Vợt Tennis Babolat Evo Aero Lite Unstrung 260gr chính hãng&nbsp;</a>là cây vợt hoàn toàn mới&nbsp;mang tên Easy Power.&nbsp;Nhờ thiết kế mới này mà&nbsp;vợt có đầu rộng 102 inch vuông (660 cm vuông), việc đưa bóng lùi xa bằng một cú đánh mạnh mẽ chưa bao giờ dễ dàng đến thế.</p><p>Babolat Evo Aero Lite Unstrung 260gr chính hãng hướng đến những người chơi cần một cây vợt tennis có khả năng trợ lực và nhẹ nhàng để dễ dàng điều khiển và làm quen với bộ môn thể thao này. Điều đó sẽ giúp bạn nhanh chóng tiến bộ và cải thiện kĩ năng trong thời gian ngắn.</p>', 4100000, 'vot-tennis-babolat-evo-aero-lite-unstrung-260gr.jpg', '2025-10-29 14:37:07'),
(137, 11, 8, 'Vợt Tennis Babolat Boost Drive 260gr', 'vt-tennis-babolat-boost-drive-260gr', '<p><a href=\"https://shopvnb.com/vot-tennis-babolat-boost-drive-260gr-chinh-hang-121255\">Vợt Tennis Babolat Boost Drive 260gr Chính Hãng</a>&nbsp;- một dòng vợt hoàn toàn mới, được làm từ chất liệu Full Graphite, dành cho người mới chơi tennis hoặc đã chơi được một thời gian.</p><p>Khung vợt được làm từ Graphite kết hợp với phần đầu lớn hơn (105 inch) giúp tạo ra một điểm ngọt lớn, mang lại những cú đánh ổn định hơn.&nbsp; Mặt vợt lớn hơn giúp giảm sốc và mang lại cảm giác êm ái khi chạm vào bóng. Điều này làm cho việc tiếp xúc với bóng trở nên dễ dàng hơn, đồng thời giúp người chơi cảm thấy thoải mái hơn trong quá trình thi đấu.</p>', 2700000, 'vot-tennis-babolat-boost-drive-260gr-chinh-hang.jpg', '2025-10-29 14:39:18'),
(138, 11, 8, 'Vợt Tennis Babolat Boost Aero Rafa 260gr', 'vt-tennis-babolat-boost-aero-rafa-260gr', '<p>- Cây vợt Babolat Boost Aero Rafa được thiết kế với cùng tông màu với cây vợt của Rafael Nadal, kết hợp giữa màu xanh,&nbsp;vàng cùng màu hồng trong phiên bản giới hạn,&nbsp;mang đến sự đẳng cấp và chuyên nghiệp cho người chơi.</p><p>- Khung&nbsp;<a href=\"https://shopvnb.com/vot-tennis-babolat-boost-aero-rafa-260gr-chinh-hang-121246\">vợt tennis&nbsp;Babolat Boost Aero Rafa 260gr chính hãng (121246)</a>&nbsp;được làm từ Graphite kết hợp với một phần đầu lớn hơn (102 inch), tạo điểm ngọt lớn hơn, giúp cải thiện hiệu suất đánh và chỉ nặng 260 gram, cung cấp thêm khả năng xử lý và sức mạnh.</p>', 2800000, 'vot-tennis-babolat-boost-aero-rafa-260gr-chinh-hang.jpg', '2025-10-29 14:41:03'),
(139, 12, 9, 'Áo cầu lông Kamito V1 KMAH250752 - Trắng cam', 'ao-cau-long-kamito-v1-kmah250752---trang-cam', '<p>-&nbsp;Áo cầu lông Kamito V1 KMAH250752 - Trắng cam chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Kamito V1 KMAH250752 - Trắng cam chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p>', 250000, 'ao-cau-long-kamito-v1-kmah250752-trang-cam.jpg', '2025-10-30 01:54:15'),
(140, 12, 9, 'Áo cầu lông Kamito V1 KMAH250755', 'ao-cau-long-kamito-v1-kmah250755', '<p>-&nbsp;Áo cầu lông Kamito V1 KMAH250755 - Trắng xanh chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Kamito V1 KMAH250755 - Trắng xanh chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p>', 260000, 'ao-cau-long-kamito-v1-kmah250755-trang-xanh.jpg', '2025-10-30 02:08:06'),
(141, 12, 9, 'Áo Cầu Lông Kamito Galaxy 3 KMAP245328 Nam - Xanh', 'ao-cau-long-kamito-galaxy-3-kmap245328-nam---xanh', '<p>-&nbsp;Áo Cầu Lông Kamito Galaxy 3 KMAP245328 Nam - Xanh cổ vịt chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo Cầu Lông Kamito Galaxy 3 KMAP245328 Nam - Xanh cổ vịt chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p>', 320000, 'ao-cau-long-kamito-galaxy-3-kmap245328-nam-xanh-co-vit.jpg', '2025-10-30 02:23:27'),
(142, 12, 9, 'Áo cầu lông Kamito Galaxy 1 KMAP245150 nam', 'ao-cau-long-kamito-galaxy-1-kmap245150-nam', '<p>-&nbsp;Áo cầu lông Kamito Galaxy 1 KMAP245150 nam - Trắng chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Kamito Galaxy 1 KMAP245150 nam - Trắng chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p>', 350000, 'ao-cau-long-kamito-galaxy-1-kmap245150-nam-trang.jpg', '2025-10-30 02:28:17'),
(143, 12, 9, 'Áo Cầu Lông Kamito Galaxy 2 KMAP245250F Nữ ', 'ao-cau-long-kamito-galaxy-2-kmap245250f-nu', '<p>-&nbsp;Áo Cầu Lông Kamito Galaxy 2 KMAP245250F Nữ - Trắng Chính Hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo Cầu Lông Kamito Galaxy 2 KMAP245250F Nữ - Trắng Chính Hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p><p>- Nếu lông thủ nào đang tìm kiếm cho mình 1 mẫu&nbsp;áo cầu lông&nbsp;thì sản phẩm&nbsp;Áo Cầu Lông Kamito Galaxy 2 KMAP245250F Nữ - Trắng Chính Hãng là một sự lựa chọn vô cùng hợp lý. Mẫu áo cầu lông chính hãng này&nbsp;có chất lượng cực tốt được làm từ 100% Polyester không những cho người chơi khi mặc vào có cảm giác mát mẻ, dễ chịu, thấm hút mồ hôi tốt trong suốt quá trình chơi mà&nbsp;chiếc áo cầu lông&nbsp;này còn có độ bền bỉ rất cao dù bạn có giặt giũ mạnh cỡ nào thì đảm bảo màu của áo cũng sẽ không bị phai theo năm tháng.</p>', 340000, 'ao-cau-long-kamito-galaxy-2-kmap245250f-nu-trang.jpg', '2025-10-30 02:30:41'),
(144, 12, 9, 'Áo cầu lông Kamito Galaxy 2 KMAH243480 nam', 'ao-cau-long-kamito-galaxy-2-kmah243480-nam', '<p>-&nbsp;Áo cầu lông Kamito Galaxy 2 KMAH243480 nam - Tím chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Kamito Galaxy 2 KMAH243480 nam - Tím chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p><p>- Nếu lông thủ nào đang tìm kiếm cho mình 1 mẫu&nbsp;áo cầu lông&nbsp;thì sản phẩm&nbsp;Áo cầu lông Kamito Galaxy 2 KMAH243480 nam - Tím chính hãng là một sự lựa chọn vô cùng hợp lý. Mẫu áo cầu lông chính hãng này&nbsp;có chất lượng cực tốt được làm từ 100% Polyester không những cho người chơi khi mặc vào có cảm giác mát mẻ, dễ chịu, thấm hút mồ hôi tốt trong suốt quá trình chơi mà&nbsp;chiếc áo cầu lông&nbsp;này còn có độ bền bỉ rất cao dù bạn có giặt giũ mạnh cỡ nào thì đảm bảo màu của áo cũng sẽ không bị phai theo năm tháng.</p>', 210000, 'ao-cau-long-kamito-galaxy-2-kmah243480-nam-tim.jpg', '2025-10-30 02:32:32'),
(145, 12, 9, 'Áo cầu lông Kamito Galaxy 3 KMAH243330 nam', 'ao-cau-long-kamito-galaxy-3-kmah243330-nam', '<p>-&nbsp;Áo cầu lông Kamito Galaxy 3 KMAH243330 nam - Vàng chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Kamito Galaxy 3 KMAH243330 nam - Vàng chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p><p>- Nếu lông thủ nào đang tìm kiếm cho mình 1 mẫu&nbsp;áo cầu lông&nbsp;thì sản phẩm&nbsp;Áo cầu lông Kamito Galaxy 3 KMAH243330 nam - Vàng chính hãng là một sự lựa chọn vô cùng hợp lý. Mẫu áo cầu lông chính hãng này&nbsp;có chất lượng cực tốt được làm từ 100% Polyester không những cho người chơi khi mặc vào có cảm giác mát mẻ, dễ chịu, thấm hút mồ hôi tốt trong suốt quá trình chơi mà&nbsp;chiếc áo cầu lông&nbsp;này còn có độ bền bỉ rất cao dù bạn có giặt giũ mạnh cỡ nào thì đảm bảo màu của áo cũng sẽ không bị phai theo năm tháng.</p>', 190000, 'ao-cau-long-kamito-galaxy-3-kmah243330-nam-vang.jpg', '2025-10-30 02:35:21'),
(146, 12, 9, 'Áo cầu lông Kamito Galaxy 3 KMAH243351F nữ - Trắng', 'ao-cau-long-kamito-galaxy-3-kmah243351f-nu---trang', '<p>-&nbsp;Áo cầu lông Kamito Galaxy 3 KMAH243351F nữ - Trắng chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Kamito Galaxy 3 KMAH243351F nữ - Trắng chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p><p>- Nếu lông thủ nào đang tìm kiếm cho mình 1 mẫu&nbsp;áo cầu lông&nbsp;thì sản phẩm&nbsp;Áo cầu lông Kamito Galaxy 3 KMAH243351F nữ - Trắng chính hãng là một sự lựa chọn vô cùng hợp lý. Mẫu áo cầu lông chính hãng này&nbsp;có chất lượng cực tốt được làm từ 100% Polyester không những cho người chơi khi mặc vào có cảm giác mát mẻ, dễ chịu, thấm hút mồ hôi tốt trong suốt quá trình chơi mà&nbsp;chiếc áo cầu lông&nbsp;này còn có độ bền bỉ rất cao dù bạn có giặt giũ mạnh cỡ nào thì đảm bảo màu của áo cũng sẽ không bị phai theo năm tháng.</p>', 240000, 'ao-cau-long-kamito-galaxy-3-kmah243351f-nu-trang.jpg', '2025-10-30 02:37:41'),
(147, 12, 9, 'Áo cầu lông Kamito Youth V1 KMAT241782 - Tím nhạt', 'ao-cau-long-kamito-youth-v1-kmat241782---tim-nhat', '<p>-&nbsp;Áo cầu lông Kamito Youth V1 KMAT241782 - Tím nhạt chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Kamito Youth V1 KMAT241782 - Tím nhạt chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p><p>- Nếu lông thủ nào đang tìm kiếm cho mình 1 mẫu&nbsp;áo cầu lông&nbsp;thì sản phẩm&nbsp;Áo cầu lông Kamito Youth V1 KMAT241782 - Tím nhạt chính hãng là một sự lựa chọn vô cùng hợp lý. Mẫu áo cầu lông chính hãng này&nbsp;có chất lượng cực tốt được làm từ 100% Polyester không những cho người chơi khi mặc vào có cảm giác mát mẻ, dễ chịu, thấm hút mồ hôi tốt trong suốt quá trình chơi mà&nbsp;chiếc áo cầu lông&nbsp;này còn có độ bền bỉ rất cao dù bạn có giặt giũ mạnh cỡ nào thì đảm bảo màu của áo cũng sẽ không bị phai theo năm tháng.</p>', 220000, 'ao-cau-long-kamito-youth-v1-kmat241782-tim-nhat.jpg', '2025-10-30 02:43:33'),
(148, 12, 9, 'Áo cầu lông Kamio Youth V1 KMAT241725 - Xanh chuối', 'ao-cau-long-kamio-youth-v1-kmat241725---xanh-chuoi', '<p>-&nbsp;Áo cầu lông Kamio Youth V1 KMAT241725 - Xanh chuối chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Kamio Youth V1 KMAT241725 - Xanh chuối chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p><p>- Nếu lông thủ nào đang tìm kiếm cho mình 1 mẫu&nbsp;áo cầu lông&nbsp;thì sản phẩm&nbsp;Áo cầu lông Kamio Youth V1 KMAT241725 - Xanh chuối chính hãng là một sự lựa chọn vô cùng hợp lý. Mẫu áo cầu lông chính hãng này&nbsp;có chất lượng cực tốt được làm từ 100% Polyester không những cho người chơi khi mặc vào có cảm giác mát mẻ, dễ chịu, thấm hút mồ hôi tốt trong suốt quá trình chơi mà&nbsp;chiếc áo cầu lông&nbsp;này còn có độ bền bỉ rất cao dù bạn có giặt giũ mạnh cỡ nào thì đảm bảo màu của áo cũng sẽ không bị phai theo năm tháng.</p>', 300000, 'ao-cau-long-kamio-youth-v1-kmat241725-xanh-chuoi.jpg', '2025-10-30 02:47:03'),
(149, 12, 3, 'Áo cầu lông Victor 846 Nam - Tím đỏ', 'ao-cau-long-victor-846-nam---tim-do', '<p></p><p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 846 Nam - Tím đỏ là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn vì xét về tổng thể mẫu áo này không những&nbsp;đảm nhận tốt vai trò thâm hút mồ hôi tốt mà còn có giá bán siêu rẻ trên thị trường.</p>', 180000, 'ao-cau-long-victor-846-nam-tim-do.jpg', '2025-10-30 02:55:41'),
(150, 12, 3, 'Áo cầu lông Victor 2115 Nam - Trắng xanh', 'ao-cau-long-victor-2115-nam---trang-xanh', '<p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 2115 Nam - Trắng xanh là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn&nbsp;</p>', 360000, 'ao-cau-long-victor-2115-nam-trang-xanh.jpg', '2025-10-30 02:58:02'),
(151, 12, 3, 'Áo cầu lông Victor AT-7500M - Xanh chính hãng', 'ao-cau-long-victor-at-7500m---xanh-chinh-hang', '<p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 2115 Nam - Trắng xanh là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn&nbsp;</p>', 260000, 'ao-cau-long-victor-at-7500m-xanh-chinh-hang.jpg', '2025-10-30 03:00:40'),
(152, 12, 3, 'Áo cầu lông Victor 846 Nam - Trắng đen', 'ao-cau-long-victor-846-nam---trang-den', '<p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 846 Nam - Trắng đen là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn vì xét về tổng thể mẫu áo này không những&nbsp;đảm nhận tốt vai trò thâm hút mồ hôi tốt mà còn có giá bán siêu rẻ trên thị trường.</p>', 350000, 'ao-cau-long-victor-846-nam-trang-xanh_1749779798.jpg', '2025-10-30 03:02:57'),
(153, 12, 3, 'Áo cầu lông Victor 846 Nam - Hồng xanh', 'ao-cau-long-victor-846-nam---hong-xanh', '<p></p><p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 846 Nam - Hồng xanh là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn vì xét về tổng thể mẫu áo này không những&nbsp;đảm nhận tốt vai trò thâm hút mồ hôi tốt mà còn có giá bán siêu rẻ trên thị trường.</p>', 260000, 'ao-cau-long-victor-846-nam-hong-xanh_1749779630.jpg', '2025-10-30 03:05:46'),
(154, 12, 3, 'Áo cầu lông Victor 2117 Nam - Trắng xanh', 'ao-cau-long-victor-2117-nam---trang-xanh', '<p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 2117 Nam - Trắng xanh là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn vì xét về tổng thể mẫu áo này không những&nbsp;đảm nhận tốt vai trò thâm hút mồ hôi tốt mà còn có giá bán siêu rẻ trên thị trường.</p>', 335000, 'ao-cau-long-victor-2117-nam-trang-xanh_1749765032.jpg', '2025-10-30 03:07:52'),
(155, 12, 3, 'Áo cầu lông Victor 2121 Nam - Trắng xanh', 'ao-cau-long-victor-2121-nam---trang-xanh', '<p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 2121 Nam - Trắng xanh là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn vì xét về tổng thể mẫu áo này không những&nbsp;đảm nhận tốt vai trò thâm hút mồ hôi tốt mà còn có giá bán siêu rẻ trên thị trường.</p>', 355000, 'ao-cau-long-victor-2121-nam-trang-xanh_1749763840.jpg', '2025-10-30 03:10:30'),
(156, 12, 3, 'Áo cầu lông Victor 2121 Nam - Tím', 'ao-cau-long-victor-2121-nam---tim', '<p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 2121 Nam - Tím là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn vì xét về tổng thể mẫu áo này không những&nbsp;đảm nhận tốt vai trò thâm hút mồ hôi tốt mà còn có giá bán siêu rẻ trên thị trường.</p>', 170000, 'ao-cau-long-victor-2121-nam-tim_1749763452.jpg', '2025-10-30 03:12:30'),
(157, 12, 3, 'Áo cầu lông Victor T-40009D - Đỏ chính hãng', 'ao-cau-long-victor-t-40009d---do-chinh-hang', '<p>-&nbsp;Áo cầu lông Victor T-40009D - Đỏ chính hãng là một trong những mẫu&nbsp;áo cầu lông&nbsp;chính hãng&nbsp;nổi trội với chất liệu vải thấm hút tốt, mát mẻ, form áo đẹp, nhiều màu sắc và đặc biệt là có giá thành phải chăng đảm bảo sẽ làm các lông thủ cực ưng ý ngay từ lần đầu tiên sử dụng.</p><p>-&nbsp;Áo cầu lông Victor T-40009D - Đỏ chính hãng xịn&nbsp;với màu sắc bắt mắt, nổi trội khi sử dụng&nbsp;trên sân đấu.&nbsp;Đặc biệt mẫu áo thể thao cầu lông này chỉ được sản xuất với nhiều size để khách hàng có thể lựa chọn.</p><p>- Nếu lông thủ nào đang tìm kiếm cho mình 1 mẫu&nbsp;áo cầu lông&nbsp;thì sản phẩm&nbsp;Áo cầu lông Victor T-40009D - Đỏ chính hãng là một sự lựa chọn vô cùng hợp lý. Mẫu áo cầu lông chính hãng này&nbsp;có chất lượng cực tốt được làm từ 100% Polyester không những cho người chơi khi mặc vào có cảm giác mát mẻ, dễ chịu, thấm hút mồ hôi tốt trong suốt quá trình chơi mà&nbsp;chiếc áo cầu lông&nbsp;này còn có độ bền bỉ rất cao dù bạn có giặt giũ mạnh cỡ nào thì đảm bảo màu của áo cũng sẽ không bị phai theo năm tháng.</p>', 250000, 'ao-cau-long-victor-t-40009d-do-chinh-hang_1748478143.jpg', '2025-10-30 03:15:32'),
(158, 12, 3, 'Áo cầu lông Victor 2118 Nam - Trắng đen', 'ao-cau-long-victor-2118-nam---trang-den', '<p>-&nbsp;Nếu lông thủ nào chưa biết nhiều về&nbsp;áo cầu lông&nbsp;thì sản phẩm Áo cầu lông Victor 2118 Nam - Trắng đen là mẫu áo chuyển nhiệt tức là in nhiệt hẳn hoàn toàn màu sắc và thiết kế lên trên chiếc áo trơn. Thường các mẫu áo chuyển nhiệt được lấy ý tưởng từ áo chính hãng nhưng được bán ra với giá thành phải chăng hơn rất nhiều đấy nhé!</p><p>- Đa số các mẫu&nbsp;áo cầu lông đẹp&nbsp;thường được người chơi biết đến thông qua việc các vận động viên thế giới sử dụng và đó chính là áo cầu lông chính hãng có giá thành rất cao thậm chí lên đến hơn triệu. Chính vì vậy, các mẫu áo chuyển nhiệt được tạo ra với cùng một thiết kế nhưng sử dụng chất liệu vải kém hơn đôi chút. Thường các mẫu áo cầu lông chuyển nhiệt được rất nhiều các người chơi phong trào lựa chọn vì xét về tổng thể mẫu áo này không những&nbsp;đảm nhận tốt vai trò thâm hút mồ hôi tốt mà còn có giá bán siêu rẻ trên thị trường.</p>', 245000, 'ao-cau-long-victor-2118-nam-trang-den_1749756595.jpg', '2025-10-30 03:18:40');

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
CREATE TABLE IF NOT EXISTS `product_reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_reviews`
--

INSERT INTO `product_reviews` (`review_id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`) VALUES
(1, 6, 3, 5, 'Sản phẩm rất tốt chất lượng vượt mong đợi!', '2025-10-19 03:26:30'),
(2, 2, 1, 5, 'hehe', '2025-10-26 09:56:21'),
(3, 2, 1, 5, 'dgdgd', '2025-10-26 10:51:32');

-- --------------------------------------------------------

--
-- Table structure for table `product_tags`
--

DROP TABLE IF EXISTS `product_tags`;
CREATE TABLE IF NOT EXISTS `product_tags` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`tag_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `status` enum('active','inactive','banned','pending') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `phone`, `address`, `role`, `status`, `created_at`) VALUES
(2, 'Tran Thi B', 'b@example.com', '$2b$10$u4Ne8lT8RZky3pGzJsygaOFnXoSXgjnBvwmE0vUjqoOc/kH42W81G', '0987654321', '456 Hai Bà Trưng, Hà Nội', 'user', 'active', '2025-09-13 07:50:31'),
(6, 'HoangPro098', 'hoangsuon012@gmail.com', '$2b$10$CUhoYMk6IUsC6.WqZgXi4uZHzx8.r9iOeTZvGr5ZkWijB4cVSPigW', '0242455231', '123 Nguyễn Cửu Phú', 'user', 'active', '2025-09-15 03:33:12'),
(8, 'PhuocNguyen2034', 'phuoc@gmail.com', '$2b$10$0jmNkB.cE0wsWJtigJSgtOnwHtmSElDjjdiHJQO/M8D.gHFatRAEa', '02425233', 'ng3663631', 'user', 'active', '2025-09-15 03:39:59'),
(13, 'dewq294e1', 'r224242@gmail.com', '$2b$10$ELyrC4NTJ02EbUZGNM0ZWOdykpr6DFDTCA1TG/Trf1CCFlSZ3fyMS', '024211144', 'ff33535', 'user', 'active', '2025-09-15 03:55:11'),
(15, 'ft35352', 'wrw3@gmail.com', '$2b$10$D1A3jzllK/YTQ5dsyS7zQ.hV7.An8yFW2RtOjocbaIoS1HtX5SEpS', '024242111', 'f353535', 'user', 'inactive', '2025-09-15 04:02:39'),
(16, 'TrongLuc', 'trongluc@gmail.com', '$2b$10$qg6g3VHRAWIKgyLZHeWgOONMjtYYEyLlhRNGyirZPgqo1KT07pjQO', '033242424', 'Võ Văn Vân TPHCM', 'admin', 'active', '2025-09-15 07:46:41'),
(17, 'DaiMinh', 'daiminh@gmail.com', '$2b$10$AqCLmsiIIWgmeiHjtiVhpecjwmH1vzaLjIbbX.LCrrzgEwJxHVYsq', '0935352312', '224 An Dương Vương, TPHCM', 'admin', 'active', '2025-09-19 05:42:07'),
(19, 'HuuToan', 'huutoan@gmail.com', '$2b$10$0NxqZD6ImGVZWekDLgaA.ev1RPH65pifo2UldPnFhm2h0W.MGx98u', '045645632', 'Long An', 'admin', 'active', '2025-09-19 06:43:07'),
(20, 'HongDuc', 'hongduc@gmail.com', '$2b$10$yjlsGm58kJmrnFNQUhtF2OqJ/xB59De/Z4lLI4doW/TVTPIIr7PYO', '0965055060', 'Thủ Đức Tphcm', 'user', 'active', '2025-09-20 06:00:18'),
(21, 'HuyNguyen213', 'nguyenhuy9611@gmail.com', '$2b$10$wmixhMSNuKSNeSpohh5UnO.35vkKTBF/GmCMOpQ8lboEVmaaatH9m', '0965055062', 'Can Giuoc Long An', 'user', 'inactive', '2025-09-20 07:15:07'),
(26, 'TommyTeo', 'tommy@gmail.com', '$2b$10$tJsqqYcbqqtvAXLO59HpkeucIT/CbY8bEMevJE8LMz789OGeLrD4C', '0964646242', 'Bến Lức Long An', 'admin', 'active', '2025-09-23 02:43:46'),
(27, 'MinhTien', 'minhtien@gmail.com', '$2b$10$CDILtS1L3wZ6hsQ6dMTUoO1OIAiN2Lg2eewINAyot6GHetrZv71z2', '0373466155', 'Trần Phú TPHCM', 'user', 'active', '2025-09-27 00:43:48');

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
CREATE TABLE IF NOT EXISTS `voucher` (
  `voucher_id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `discount_type` enum('percent','fixed') NOT NULL,
  `discount_value` decimal(10,0) NOT NULL,
  `min_order_amount` decimal(10,0) DEFAULT 0,
  `usage_limit` int(11) DEFAULT 1,
  `used_count` int(11) DEFAULT 0,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('scheduled','active','expired','used','disabled') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`voucher_id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_voucher_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`voucher_id`, `code`, `description`, `discount_type`, `discount_value`, `min_order_amount`, `usage_limit`, `used_count`, `start_date`, `end_date`, `status`, `created_at`) VALUES
(1, 'SALE10', 'Giảm 10% cho đơn hàng từ 1.000.000 VNĐ trở lên', 'percent', 10, 1000000, 100, 0, '2025-08-28', '2025-09-26', 'active', '2025-09-13 07:50:32'),
(2, 'GIAM50K', 'Giảm 50.000 VNĐ cho đơn từ 200.000 VNĐ', 'fixed', 50000, 200000, 200, 0, '2025-08-30', '2025-09-13', 'active', '2025-09-13 07:50:32'),
(3, 'FLASH12', 'Đại Tiệc Bùng nổ', 'percent', 20, 700000, 4, 0, '2025-10-14', '2025-10-21', 'active', '2025-10-07 02:04:56');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `flash_sale_products`
--
ALTER TABLE `flash_sale_products`
  ADD CONSTRAINT `flash_sale_products_ibfk_1` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`flash_sale_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `flash_sale_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `fk_materials_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `news`
--


--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`voucher_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`material_id`) REFERENCES `materials` (`material_id`) ON DELETE CASCADE;

--
-- Constraints for table `preorders`
--
ALTER TABLE `preorders`
  ADD CONSTRAINT `fk_preorders_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_preorders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_tags`
--
ALTER TABLE `product_tags`
  ADD CONSTRAINT `product_tags_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
