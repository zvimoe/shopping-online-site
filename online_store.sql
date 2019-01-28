-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2019 at 05:45 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `active` int(1) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `active`, `date`) VALUES
(1, 1, 0, '2019-01-16'),
(2, 1, 0, '2019-01-16'),
(3, 5454, 1, '2019-01-19'),
(4, 5454, 1, '2019-01-19'),
(5, 5454, 1, '2019-01-19'),
(6, 5454, 1, '2019-01-19'),
(7, 5454, 1, '2019-01-19'),
(8, 343, 1, '2019-01-21'),
(9, 343, 1, '2019-01-21'),
(10, 343, 1, '2019-01-21'),
(11, 343, 1, '2019-01-21'),
(12, 343, 1, '2019-01-21'),
(13, 343, 1, '2019-01-21'),
(14, 343, 1, '2019-01-21'),
(15, 1, 1, '2019-01-21'),
(16, 1, 1, '2019-01-21'),
(17, 1, 1, '2019-01-21'),
(18, 1, 1, '2019-01-21'),
(19, 1, 1, '2019-01-21'),
(20, 1, 1, '2019-01-21'),
(21, 1, 1, '2019-01-21'),
(22, 1, 1, '2019-01-21'),
(23, 1, 1, '2019-01-21'),
(24, 1, 1, '2019-01-21'),
(25, 1, 1, '2019-01-21'),
(26, 1, 1, '2019-01-21'),
(27, 1, 1, '2019-01-21'),
(28, 1, 1, '2019-01-21'),
(29, 1, 1, '2019-01-21'),
(30, 1, 1, '2019-01-21'),
(31, 1, 1, '2019-01-21'),
(32, 1, 1, '2019-01-21');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `item_id`, `amount`, `price`, `total`, `cart_id`) VALUES
(1, 1, 1, 4545, 4545, 2),
(2, 2, 1, 3232, 3232, 2),
(3, 1, 6, 4545, 4545, 7);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(1, 'baking', 'dry goods for baking'),
(2, 'dairy', 'dairy products and eggs');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(255) NOT NULL,
  `price` int(11) NOT NULL,
  `pic_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `category_id`, `price`, `pic_url`) VALUES
(1, 'flour', 1, 4545, 'img/flour.jpg'),
(2, 'milk', 2, 3434, 'img/milk.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `final_price` int(11) NOT NULL,
  `shipping_city` varchar(255) NOT NULL,
  `shipping_street` varchar(255) NOT NULL,
  `shipping_date` date NOT NULL,
  `order_date` date NOT NULL,
  `last_digits` int(11) NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `cart_id`, `final_price`, `shipping_city`, `shipping_street`, `shipping_date`, `order_date`, `last_digits`, `active`) VALUES
(9, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(10, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(11, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(12, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(13, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(14, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(15, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(16, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(17, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(18, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(19, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(20, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(21, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(22, 1, 1, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1),
(23, 1, 2, 5658658, 'jhghff', 'hhfhgftydc', '2019-11-03', '2019-11-03', 6785, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `user_name`, `role`, `password`, `city`, `street`) VALUES
(1, 'tmoe', 'sodhe', '', 'zvimoe', '1', '81dc9bdb52d04dc20036dbd8313ed055', 'wrwr', 'fdfd'),
(17, 'tmoer', 'sodher', '', 'erererer', '', 'bb4b80b7e49e1423bb0e7f89387339c4', 'wrwrr', 'fdfdr'),
(45, 'SaraKolatch', '1212', 'cskolatch@gmail.com', 'SaraKolatch', '', '202cb962ac59075b964b07152d234b70', 'BetShemesh', 'cskolatch'),
(123, 'dsadasds', 'dasdasdasd', 'cskolatch@gmail.com', 'dsadasds', '', '202cb962ac59075b964b07152d234b70', 'dgajasdsa', 'dasdasdasd'),
(157, 'tmoerr', 'sodher', '', 'erererertr', '', '38e6c98afe859106f556168f6f6b4d2d', 'wrwrrr', 'fdfdrr'),
(343, 'terr', 'sodherfff', 'adasdafasfas@jfdf.com', 'erererertrfff', '', '412bc37848556ae178682f5b95a3c86f', 'wrwrrrfff', 'fdfdrrfff'),
(789, 'sdsfsfs', 'dfsdfsdfd', 'cskolatch@gmail.com', 'sdsfsfs', '', '202cb962ac59075b964b07152d234b70', 'fhudi', 'dfsffdfds'),
(1578, 'tmoerr', 'sodher', '', 'erererertr', '', '38e6c98afe859106f556168f6f6b4d2d', 'wrwrrr', 'fdfdrr'),
(5454, 'tmoe', 'sodhe', 'ewuriyr@ggdshs.com', 'zvimoe', '', '827ccb0eea8a706c4c34a16891f84e7b', 'wrwr', 'fdfd'),
(5678, 'eyruer', 'eerere', 'cskolatch@gmail.com', 'eyruer', '', '202cb962ac59075b964b07152d234b70', 'ereeererrrrrrrrrrrrreeeer', 'ererer'),
(7777, 'gdgdg', 'dfdgg', 'cskolatch@gmail.com', 'gdgdg', '', 'b59c67bf196a4758191e42f76670ceba', 'dgg', 'gfgd'),
(45555, '43434', '343434', 'cskolatch@gmail.com', '43434', '', '202cb962ac59075b964b07152d234b70', '34334', '3434343'),
(565767, 't', 'sodherfff', '', 'erererertrfff', '', '75c71356fa1afdb43cfd23830b6b3a84', 'wrwrrrfff', 'fdfdrrfff'),
(676575, '1322312', '12312312', 'cskolatch@gmail.com', '1322312', '', '202cb962ac59075b964b07152d234b70', '13123', '1231312'),
(873478, 'Sarrgrg', '343434', 'cskolatch@gmail.com', 'Sarrgrg', '', '14c879f3f5d8ed93a09f6090d77c2cc3', 'rtrtrt', 'rtrtrt'),
(1578353, 'tmoerrff', 'sodherfff', '', 'erererertrfff', '', '75c71356fa1afdb43cfd23830b6b3a84', 'wrwrrrfff', 'fdfdrrfff'),
(3433434, 'terr', 'sodherfff', 'adasdafasfas@jfdf.com', 'erererertrfff', '', '412bc37848556ae178682f5b95a3c86f', 'wrwrrrfff', 'fdfdrrfff'),
(4364757, 'fdgfgf', 'gfhfghfghg', 'cskolatch@gmail.com', 'fdgfgf', '', '202cb962ac59075b964b07152d234b70', 'dfsdgdg', 'fgfdgfdg'),
(5555555, '4545', '454545', 'cskolatch@gmail.com', '4545', '', '698d51a19d8a121ce581499d7b701668', '343534', '543545'),
(32423235, '45345', '435345345', 'cskolatch@gmail.com', '45345', '', '827ccb0eea8a706c4c34a16891f84e7b', '32425', '5345345'),
(35464565, 'gdfgdfgdg', 'dfgdfgdfg', 'cskolatch@gmail.com', 'gdfgdfgdg', '', 'ae5eb824ef87499f644c3f11a7176157', 'fdgd', 'fdgdfgd'),
(47457575, 'fdfdf', 'fdfdfd', 'cskolatch@gmail.com', 'fdfdf', '', '202cb962ac59075b964b07152d234b70', 'dfdfd', 'dfdf'),
(98687895, '43434', '34343', 'cskolatch@gmail.com', '43434', '', '81dc9bdb52d04dc20036dbd8313ed055', '234', '43434'),
(343435566, 'terr', 'sodherfff', 'adasdafasfas@jfdf.com', 'erererertrfff', '', '412bc37848556ae178682f5b95a3c86f', 'wrwrrrfff', 'fdfdrrfff'),
(2147483647, 'terr', 'sodherfff', 'adasdafasfas@jfdf.com', 'erererertrfff', '', '412bc37848556ae178682f5b95a3c86f', 'wrwrrrfff', 'fdfdrrfff');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `catagies` (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_to_user` (`user_id`),
  ADD KEY `order_to_cart` (`cart_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `cart_item_to_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_item_to-cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_item_to_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `item_to_catagory` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `order_to_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `order_to_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
