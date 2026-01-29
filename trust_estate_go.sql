CREATE DATABASE  IF NOT EXISTS trust_estate_go /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trust_estate_go`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: trust-estate-mysql-real-estate-01.h.aivencloud.com    Database: trust_estate_go
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'cba5d52c-b85d-11f0-a3d9-862ccfb008a8:1-233';

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Mua bán'),(3,'Cho thuê');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `message` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `message_type` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` datetime DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `chat_message_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `chat_room` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_message_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
INSERT INTO `chat_message` VALUES (9,4,23,'hello','TEXT','2025-09-17 23:06:50',0),(10,4,3,'chào bạn','TEXT','2025-09-17 23:07:31',0),(11,5,2,'chào bạn','TEXT','2025-09-21 09:32:09',0),(12,5,2,'chào bạn','TEXT','2025-10-22 09:19:42',0),(13,4,23,'hello','TEXT','2025-10-24 09:28:43',0),(14,7,23,'chào bạn nhé','TEXT','2025-10-24 10:30:02',0),(15,7,2,'chào bạn','TEXT','2025-10-24 10:30:10',0),(16,7,23,'căn này bao nhiêu','TEXT','2025-10-27 10:02:07',0),(17,7,2,'30trieu','TEXT','2025-10-27 10:02:13',0),(18,7,23,'hello','TEXT','2025-10-27 11:46:38',0),(19,7,2,'helooooo','TEXT','2025-10-28 03:47:55',0),(20,7,2,'ashdashd','TEXT','2025-10-28 04:14:56',0),(21,7,2,'chào bạn','TEXT','2025-10-28 07:30:52',0),(22,7,23,'chào bạn\'','TEXT','2025-10-28 07:30:57',0),(23,7,23,'chào bạn','TEXT','2025-10-28 07:39:27',0),(24,7,2,'cahfo','TEXT','2025-10-28 07:39:35',0),(25,6,23,'chào bạn','TEXT','2025-10-28 07:42:47',0),(26,7,23,'chào bạn','TEXT','2025-10-28 08:25:15',0),(27,7,2,'helo','TEXT','2025-10-28 08:25:39',0),(28,4,23,'chào bạn','TEXT','2025-10-28 08:30:06',0),(29,7,2,'helo bạn','TEXT','2025-10-31 02:12:53',0),(30,8,32,'hello','TEXT','2025-11-15 05:00:59',0),(31,9,32,'hello','TEXT','2025-11-15 05:06:40',0),(32,9,32,'hello','TEXT','2025-11-15 05:06:45',0),(33,9,2,'cẹc','TEXT','2025-11-15 05:06:57',0),(34,9,2,'hello bạn','TEXT','2025-11-15 05:07:08',0),(35,9,32,'chào tôi muốn tìm phòng','TEXT','2025-11-15 05:07:36',0),(36,9,2,'chào bạn','TEXT','2025-11-17 03:27:15',0),(37,9,2,'chào bạn','TEXT','2025-11-17 03:27:18',0),(38,9,2,'chào bạn','TEXT','2025-11-17 03:29:04',0),(39,9,2,'bạn làm gì vậy','TEXT','2025-11-17 03:29:11',0),(40,9,2,'chào bạn','TEXT','2025-11-24 09:14:43',0),(41,9,2,'chào bạn','TEXT','2025-11-24 09:29:12',0),(42,9,2,'chào bạn','TEXT','2025-11-24 09:34:28',0);
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `buyer_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `last_message_at` datetime DEFAULT NULL,
  `status` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `user_id` int DEFAULT NULL,
  `last_message` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `seller_id` (`seller_id`),
  KEY `property_id` (`property_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_room_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `chat_room_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`),
  CONSTRAINT `chat_room_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `FKjqx1ixf0jep8hhi0jxhak9jor` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (4,NULL,3,NULL,'2025-09-17 23:06:42','2025-10-28 08:30:06',NULL,23,NULL),(5,NULL,3,NULL,'2025-09-21 09:32:03','2025-10-22 09:19:42',NULL,2,NULL),(6,NULL,4,NULL,'2025-10-06 13:31:00','2025-10-28 07:42:47',NULL,23,NULL),(7,NULL,2,NULL,'2025-10-24 10:29:51','2025-10-31 02:12:53',NULL,23,NULL),(8,NULL,3,NULL,'2025-11-15 05:00:26','2025-11-15 05:00:59',NULL,32,NULL),(9,NULL,2,NULL,'2025-11-15 05:06:29','2025-11-24 09:34:28',NULL,32,'chào bạn');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `description` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,'Basic',30,100000.00,'Được đăng tin trong vòng 1 tháng',NULL),(2,'Standard',90,200000.00,'Được đăng tin trong vòng 3 tháng','2025-07-29 15:54:25'),(3,'Premium',180,350000.00,'Được đăng tin trong vòng 6 tháng','2025-07-29 16:02:56');
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(15,2) DEFAULT NULL,
  `package_id` int DEFAULT NULL,
  `payment_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `order_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `capture_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `is_pay` bit(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `package_id` (`package_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK4spfnm9si9dowsatcqs5or42i` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (34,500.00,2,'PAYPAL','73386267KK470012K','49640155VV173451L',NULL,'2025-09-20 22:56:15','2025-09-20 22:55:32','2025-09-20 22:56:15',_binary '',3),(39,1000.00,3,'PAYPAL','58C39081WU770664F','8JK78517WY663405H',NULL,'2025-09-20 23:14:49','2025-09-20 23:14:17','2025-09-20 23:14:49',_binary '',3);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `description` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Category_create','tạo danh mục'),(2,'Category_update','chỉnh sửa thể loại'),(4,'Category_delete','Xóa thể loại'),(5,'Property_create','Tạo sản phẩm'),(6,'Property_update','Chỉnh sửa sản phẩm'),(7,'Property_delete','Xóa sản phẩm'),(8,'Property_show','Xem sản phẩm'),(9,'Package_show',NULL),(10,'Package_create',NULL),(11,'Package_delete',NULL),(12,'Package_update',NULL),(13,'User_create',NULL),(14,'User_update',NULL),(15,'User_show',NULL),(16,'User_delete',NULL),(17,'Review_show',NULL),(18,'Review_delete',NULL),(19,'Review_create',NULL),(20,'Role_update',NULL),(21,'Role_create',NULL),(22,'Role_show',NULL),(23,'Role_delete',NULL),(24,'Permission_create',NULL),(25,'Permission_update',NULL),(26,'Permission_show',NULL),(27,'Permission_delete',NULL);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property`
--

DROP TABLE IF EXISTS `property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `description` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `expire_at` datetime DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `property_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `area` int DEFAULT NULL,
  `bedroom` int DEFAULT NULL,
  `interior` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `blockchain_hash` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `blockchain_tx_hash` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_bin DEFAULT 'PENDING',
  `approved_at` datetime DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  KEY `fk_property_payment` (`payment_id`),
  CONSTRAINT `FK51njvck50nuf57ngcfuhnjxye` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_property_payment` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  CONSTRAINT `property_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,2,'Nhà phố quận 1','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp','2026-12-24 12:00:00',1200000000.00,'285 Cách Mạng Tháng 8, Quận 10, TP. Hồ Chí Minh',1,'APARTMENT','2025-08-24 16:45:29',3,10,2,'cơ bản',10.773777800000001,106.69005095710621,NULL,NULL,'APPROVED',NULL,NULL),(2,2,'Nhà phố quận 2','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2026-12-24 12:00:00',1200000000.00,'12 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',1,'VILLA','2025-08-24 18:21:37',3,15,3,'đầy đủ',10.845234,106.606839,NULL,NULL,'APPROVED',NULL,NULL),(3,2,'Nhà phố quận 3','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2026-12-24 12:00:00',12000000000.00,'45 Trần Não, TP. Thủ Đức, TP. Hồ Chí Minh',1,'VILLA','2025-08-24 18:28:21',4,14,1,'trống',10.781971,106.693081,NULL,NULL,'APPROVED',NULL,NULL),(5,3,'nha tro q3','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2026-12-24 12:00:00',12321321.00,'90 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh',1,'APARTMENT','2025-08-25 19:03:34',4,31,4,'đầy đủ',10.79715085,106.70645531587837,NULL,NULL,'APPROVED',NULL,NULL),(6,3,'Nhà phố quận 5','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2026-12-24 12:00:00',12000000.00,'188 Lê Văn Sỹ, Quận Phú Nhuận, TP. Hồ Chí Minh',1,'TOWNHOUSE','2025-08-31 19:58:09',4,27,2,'trống',10.79475,106.6763,NULL,NULL,'APPROVED',NULL,NULL),(7,2,'Nhà phố quận 6','123213','2026-12-24 12:00:00',12321321.00,'18 Hàng Bài, Hoàn Kiếm, Hà Nội',1,'RENTAL_ROOM','2025-09-01 20:00:24',3,17,4,'cơ bản',21.0197103,105.85734242885715,NULL,NULL,'APPROVED',NULL,NULL),(8,2,'Nhà phố quận 7','21312','2026-12-24 12:00:00',10000040.00,'105 Láng Hạ, Đống Đa, Hà Nội',1,'TOWNHOUSE','2025-09-01 20:05:57',2,38,3,'cơ bản',21.018957,105.8026611,NULL,NULL,'APPROVED',NULL,NULL),(9,3,'Nhà lầu quận 1','123213','2026-12-24 12:00:00',1.00,'225 Trần Duy Hưng, Cầu Giấy, Hà Nội',1,'RENTAL_ROOM','2025-09-01 20:42:37',3,39,1,'đầy đủ',21.0144563,105.8041457,NULL,NULL,'APPROVED',NULL,NULL),(10,3,'Nhà lầu quận 2','123213','2026-12-24 12:00:00',1000000.00,'92 Tây Sơn, Đống Đa, Hà Nội',1,'RENTAL_ROOM',NULL,4,27,4,'đầy đủ',21.0045229437748,105.8216080254431,NULL,NULL,'APPROVED',NULL,NULL),(11,3,'Nhà lầu quận 3','123213','2026-12-24 12:00:00',12321321.00,'32 Nguyễn Thị Minh Khai, Quận 3, TP. Hồ Chí Minh',1,'RENTAL_ROOM',NULL,3,17,4,'cơ bản',10.784274,106.678627,NULL,NULL,'APPROVED',NULL,NULL),(12,3,'Nhà chung cư quận 5','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2026-12-24 12:00:00',120000000.00,'65 Nguyễn Hữu Cảnh, Bình Thạnh, TP. Hồ Chí Minh',1,'APARTMENT','2025-09-21 01:02:30',2,NULL,NULL,NULL,10.77306,106.75444,NULL,NULL,'APPROVED',NULL,NULL),(13,3,'Nhà chung cư quận 6','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2026-12-24 12:00:00',120000000.00,'45 Xuân Thủy, Cầu Giấy, Hà Nội',1,'APARTMENT','2025-09-21 01:07:15',2,20,NULL,NULL,21.03625725,105.78845566443232,NULL,NULL,'APPROVED',NULL,NULL),(14,3,'Nhà trọ quận 3','','2026-12-24 12:00:00',120000000.00,'7 Bà Triệu, Hoàn Kiếm, Hà Nội',1,'APARTMENT','2025-09-21 01:08:57',2,20,NULL,NULL,21.0245,105.84117,NULL,NULL,'APPROVED',NULL,NULL),(15,3,'Nhà trọ quận 4','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2026-12-24 12:00:00',120000000.00,'18 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',1,'RENTAL_ROOM','2025-09-21 01:11:03',2,40,2,NULL,16.060262784984673,108.21376298693853,NULL,NULL,'APPROVED',NULL,NULL),(16,3,'Căn hộ quận 3','','2026-12-24 12:00:00',120000000.00,'33 Võ Văn Kiệt, Sơn Trà, Đà Nẵng',1,'APARTMENT','2025-09-21 01:18:08',2,40,2,'trống',16.06778,108.22083,NULL,NULL,'APPROVED',NULL,NULL),(17,2,'Căn hộ 2 tầng','123','2026-12-24 12:00:00',12000000.00,'25 Lê Lợi, Hải Châu, Đà Nẵng',1,'APARTMENT','2025-09-21 01:47:51',2,40,2,NULL,16.073085609610747,108.22016570960868,NULL,NULL,'APPROVED',NULL,NULL),(19,2,'nha tro q3',NULL,'2026-12-24 12:00:00',NULL,'45 Nguyễn Văn Thoại, Ngũ Hành Sơn, Đà Nẵng',NULL,NULL,'2025-10-27 15:36:23',1,NULL,NULL,NULL,16.05578697163081,108.24461550331955,NULL,NULL,'APPROVED',NULL,NULL),(24,2,'nha tro q4',NULL,'2026-12-24 12:00:00',2222222.00,'60 Nguyễn Tri Phương, Thanh Khê, Đà Nẵng',1,'APARTMENT','2025-10-27 16:00:36',3,NULL,NULL,NULL,16.056429650836844,108.20844550015491,NULL,NULL,'APPROVED',NULL,NULL),(25,2,'Nhà phố Đinh Bộ Lĩnh','Mặt tiền',NULL,1000000.00,'97 Lê Duẩn, Hải Châu, Đà Nẵng',1,NULL,'2025-10-27 09:30:24',2,20,2,NULL,16.071407,108.221187,NULL,NULL,'PENDING',NULL,NULL);
/*!40000 ALTER TABLE `property` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_image`
--

DROP TABLE IF EXISTS `property_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_image_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_image`
--

LOCK TABLES `property_image` WRITE;
/*!40000 ALTER TABLE `property_image` DISABLE KEYS */;
INSERT INTO `property_image` VALUES (23,24,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761555640/oj7yzb8nc4dqxyd7gqqq.png',0,NULL),(26,19,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556254/jntafx91tzxgw6hqtv5m.png',0,NULL),(27,19,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556267/jxmwndpjwsaqib2nlkph.png',0,NULL),(28,17,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556479/vkdqefaldy7pl9aa5lok.png',0,NULL),(29,17,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556484/g4yoahlv6auksu0sgnhk.png',0,NULL),(30,16,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556569/bwb9z7xzpdklunjnwctv.webp',0,NULL),(31,15,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556660/utbccvvrvytzptjkefdm.webp',0,NULL),(32,14,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556767/njxjteujesza3zyy9oyn.png',0,NULL),(33,14,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556770/fm5hojwzv3a0kxx3dj2p.png',0,NULL),(34,13,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556814/atrh5bgv6l4rficdqrao.png',0,NULL),(35,12,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556858/vejklsskv8fltxqml9lp.png',0,NULL),(36,11,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556880/fyfbcgpa4qxme1rzswps.png',0,NULL),(37,10,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556942/wjlctwwmbulrzlb8kiur.png',0,NULL),(38,9,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556960/wqsqgngrggg0vh5ookyj.png',0,NULL),(39,8,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761556980/bysxw3ll4frjqhyshvk5.png',0,NULL),(40,7,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761557002/pgeyhzekqio9rbtmrird.png',0,NULL),(41,6,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761557030/bz19gevr25vel6erp19v.png',0,NULL),(42,5,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761557072/na1rpsvphv574ag7joar.png',0,NULL),(43,3,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761557115/akftdnvaliazmd95xy2d.png',0,NULL),(44,2,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761557159/o5aatmjyahajzsisasox.png',0,NULL),(45,1,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761557213/jhyzn2rvpb4g9ajd4fbv.png',0,NULL),(46,25,'https://res.cloudinary.com/diimcwvs5/image/upload/v1761557426/ifcjfksz1vskb3yfa07k.png',0,NULL);
/*!40000 ALTER TABLE `property_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_save`
--

DROP TABLE IF EXISTS `property_save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_save` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`property_id`),
  UNIQUE KEY `user_property` (`user_id`,`property_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_save_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `property_save_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_save`
--

LOCK TABLES `property_save` WRITE;
/*!40000 ALTER TABLE `property_save` DISABLE KEYS */;
INSERT INTO `property_save` VALUES (21,2,2),(24,2,5),(25,2,6),(4,3,2),(5,3,3),(12,23,1),(14,23,7);
/*!40000 ALTER TABLE `property_save` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_view`
--

DROP TABLE IF EXISTS `property_view`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_view` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `viewed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `property_view_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE,
  CONSTRAINT `property_view_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_view`
--

LOCK TABLES `property_view` WRITE;
/*!40000 ALTER TABLE `property_view` DISABLE KEYS */;
/*!40000 ALTER TABLE `property_view` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  `reason` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `staff_id` (`staff_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FKj62onw73yx1qnmd57tcaa9q3a` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `report_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `report_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (2,3,NULL,'thong tin khong chinh xac',1,'2025-08-25 02:28:17',3),(7,1,NULL,'hình ảnh sai sự thật',1,'2025-11-24 15:03:22',2);
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int DEFAULT NULL,
  `comment` tinytext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `buyer_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `buyer_id` (`buyer_id`,`property_id`),
  KEY `seller_id` (`seller_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`),
  CONSTRAINT `review_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `review_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,5,'xinh',1,3,2,NULL),(3,5,'xinh',1,2,1,'2025-08-25 16:28:27'),(4,5,NULL,4,3,3,'2025-09-03 18:46:06'),(5,3,NULL,2,3,3,'2025-09-03 18:48:06');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN','Quản trị hệ thống, có toàn quyền'),(2,'USER','Người dùng'),(3,'SELLER','Người đăng tin'),(4,'STAFF','Nhân viên'),(8,'babee',NULL),(9,'căn hộ','ew123213');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_permission` (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (39,1,1),(32,2,1),(33,2,2),(35,3,1),(34,3,2),(38,8,1),(40,8,2),(41,9,1),(42,9,2);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nguyen','Van A',1,'1998-05-20','nguyenvana@example.com','123 Đường Lê Lợi, Quận 1, TP.HCM','0912345678','nguyenvana','$2a$10$0Fe6kZ6S8Iwsp7F7zjpLjOKj3q0cxveAIXPb93ovh8YL1meBnR.M.',NULL,1,NULL,'2025-09-10 15:52:10'),(2,'Nguyen','Van B',1,'1998-05-20','nhan@gmail.com','123 Đường Lê Lợi, Quận 1, TP.HCM','0912345678','nguyenvanb','$2a$10$tsja/uRm3NliLNgOYAd8yu1EZ.Irc/EP46/TIxmyTJT36xpPrjU1O',NULL,1,NULL,'2025-09-10 15:52:22'),(3,'Nhan',NULL,1,NULL,NULL,NULL,NULL,'nguyenvanc','$2a$10$V6qDVQnBS1YJpoH5Tultpu6GZuaeTkC9KXN4tZ4d2H/kWezRqcNlS','https://res.cloudinary.com/diimcwvs5/image/upload/v1756027015/hqvvjfz0cdsvoitntan1.jpg',NULL,NULL,'2025-09-10 15:51:55'),(4,'Nguyen','Van D',1,'1998-05-20','nhat1@gmail.com','123 Đường Lê Lợi, Quận 1, TP.HCM','0912345678','nguyenvand','$2a$10$D91Hhuoc78KDuudOObt2w.pAipfyL06RWCOGnKfaxM5jmDZfnK8HC','https://res.cloudinary.com/diimcwvs5/image/upload/v1756026939/x10zweveifsf4o2xntvo.jpg',1,NULL,NULL),(23,'Nhan','Tran',1,'2025-09-04','nhann1@gmail.com','','0522809305','nhan1','$2a$10$N5pZ45l4/OGc1uHUtDNJcOM7mn845HLEubhwdTIZrkNsTP8oFi7xe','https://res.cloudinary.com/diimcwvs5/image/upload/v1757964151/gwfnctnonbkrwpsnldll.png',0,'2025-09-10 16:07:12','2025-09-16 02:22:33'),(27,'fix','fix',NULL,NULL,'nhantran.0111004@gmail.com','1111','11111','123123123','$2a$10$0k.QPxp22laPozTkMh3TBuMqmyfDIppnqbp9jEaTd/EHtIzg8rUBm','https://res.cloudinary.com/diimcwvs5/image/upload/v1757964070/ljgegcyhbkezathwernw.png',1,'2025-09-15 23:26:04','2025-09-16 02:21:12'),(28,'Nhan','Tran',1,NULL,'nhann12@gmail.com','Binh Thanh',NULL,'nhan3','$2a$10$EcVefFiDAi.ehKW5zZ0FEOSeW0DNojyp1QA0cKsxMVuo9FRGYjy1W','https://res.cloudinary.com/diimcwvs5/image/upload/v1757964332/bwzf8jkdjbj1b7lpza4a.png',1,'2025-09-16 02:25:34',NULL),(30,'Nhan','Tran',1,NULL,'nhann123@gmail.com','Binh Thanh',NULL,'nhan4','$2a$10$tj7L4WHwiwAg4iU50I8lHO7Xv6S8taXe1/qBq/38i5Q2ilzg.sx..','https://res.cloudinary.com/diimcwvs5/image/upload/v1757964466/om10tkqujduwbxt7uoax.png',1,'2025-09-16 02:27:48','2025-09-16 02:29:47'),(31,'Nhan','Tran',NULL,NULL,'2251052078nhan@ou.edu.vn','241 Đinh Bộ Lĩnh Phường 26 Quận Bình Thạnh','0522809305','nhantran1','$2a$10$NelNP76/DILVMD3/Zc5vGOLzYvrBvw2eB7NkUhDZ782G18WyzFdpS','https://res.cloudinary.com/diimcwvs5/image/upload/v1761792125/hpbvcvzb46pccgnyssuz.jpg',1,'2025-10-30 02:42:06',NULL),(32,'Nguyễn','Nhật',NULL,NULL,'nhat722004@gmail.com','075204008980','0358001963','Cnatro','$2a$10$G2jv4AUU0Sjs7CnDiSbFUuyxxobGtc692//Yh3pyaHBs1tHUs4sMS',NULL,1,'2025-11-15 04:49:35',NULL),(33,'phuong','Nguyen',NULL,NULL,'phuongnguyen.jp@interspace.vn',NULL,'0362967931','phuongnguyen','$2a$10$FjYpDSWFI0K5xBzA0bZZCe5Jj05KKhQxkSLGD23dg4H901xR63UrW',NULL,1,'2025-11-18 11:05:51',NULL),(34,'Nguyen','Thach Van',NULL,NULL,'thachnguyen.jp@interspace.vn',NULL,'0338677460','obs-dev@interspace.ne.jp','$2a$10$xPRSY1D8r6YJ3Jtk3tlNLOlqQQJWNpLy69RbK8B3WKYbPGCDiBj3O',NULL,1,'2025-11-18 11:06:04',NULL),(36,'Nguyen','Thach Van',NULL,NULL,'thachnguyen@interspace.vn',NULL,'0338677460','ThachTest','$2a$10$FSQcS10LtJlCILf0hIxMZuD8eC05j8GSO7t/vq8zJdgQwHU1PYltK',NULL,1,'2025-11-18 11:07:46',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK872xec3woupu3gw59b04pj3sa` (`user_id`,`role_id`),
  UNIQUE KEY `uk_user_role` (`user_id`,`role_id`),
  KEY `idx_user_role_user_id` (`user_id`),
  KEY `idx_user_role_role_id` (`role_id`),
  KEY `role_id` (`role_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,1),(2,2,3),(3,3,3),(4,4,4),(21,23,2),(53,27,3),(55,28,2),(54,28,3),(59,30,2),(60,31,2),(61,32,3),(62,33,2),(63,34,2),(64,36,2);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-29 16:30:28
