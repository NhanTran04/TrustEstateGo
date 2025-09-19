CREATE DATABASE  IF NOT EXISTS `trust_estate_go` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trust_estate_go`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: trust_estate_go
-- ------------------------------------------------------
-- Server version	8.4.3

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

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Mua bán'),(3,'Cho thuê'),(8,'căn hộ');
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
  `message` tinytext COLLATE utf8mb4_bin,
  `message_type` tinytext COLLATE utf8mb4_bin,
  `created_at` datetime DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `chat_message_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `chat_room` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_message_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
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
  `status` tinytext COLLATE utf8mb4_bin,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `seller_id` (`seller_id`),
  KEY `property_id` (`property_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_room_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `chat_room_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `user` (`id`),
  CONSTRAINT `chat_room_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `FKjqx1ixf0jep8hhi0jxhak9jor` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
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
  `name` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `description` tinytext COLLATE utf8mb4_bin,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,'Basic',30,200.00,'Được đăng tin trong vòng 1 tháng',NULL),(2,'Standard',90,500.00,'Được đăng tin trong vòng 3 tháng','2025-07-29 15:54:25'),(3,'Premium',180,1000.00,'Được đăng tin trong vòng 6 tháng','2025-07-29 16:02:56'),(4,'Vip',180,1000.00,'Được đăng tin trong vòng 6 tháng','2025-07-29 16:33:11'),(5,'SieuVip',180,1000.00,'Được đăng tin trong vòng 6 tháng',NULL),(14,'SieuVip5',3,300000.00,'vippppp','2025-08-30 21:25:25');
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
  `payment_method` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `order_id` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `capture_id` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `is_paid` tinyint(1) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (23,1000.00,3,'PAYPAL','2SN51623DU297842L','6FD2415499598014Y',NULL,NULL,'2025-09-17 01:33:02','2025-09-17 01:32:54','2025-09-17 01:33:02',_binary '',2),(24,1000.00,3,'PAYPAL','9PX66680HW379845N','0BM34129H7590083N',NULL,NULL,'2025-09-17 01:35:07','2025-09-17 01:34:59','2025-09-17 01:35:07',_binary '',2),(25,200.00,1,'PAYPAL','4KE90543FD079911M','7MH80951CJ3878438',NULL,NULL,'2025-09-17 01:35:20','2025-09-17 01:35:13','2025-09-17 01:35:20',_binary '',2),(26,500.00,2,'PAYPAL','0PA87070HP3526010','50582176WJ740334L',NULL,NULL,'2025-09-17 01:41:26','2025-09-17 01:41:18','2025-09-17 01:41:26',_binary '',2),(27,1000.00,4,'PAYPAL','35818625874276249',NULL,NULL,NULL,NULL,'2025-09-17 01:41:38',NULL,_binary '\0',2),(28,1000.00,4,'PAYPAL','0Y123982D4248904V',NULL,NULL,NULL,NULL,'2025-09-17 01:41:50',NULL,_binary '\0',2);
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
  `name` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `description` tinytext COLLATE utf8mb4_bin,
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
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `description` tinytext COLLATE utf8mb4_bin,
  `expire_at` datetime DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `property_type` enum('APARTMENT','RENTAL_ROOM','TOWNHOUSE','VILLA') COLLATE utf8mb4_bin DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `area` int DEFAULT NULL,
  `bedroom` int DEFAULT NULL,
  `interior` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK51njvck50nuf57ngcfuhnjxye` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `property_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property`
--

LOCK TABLES `property` WRITE;
/*!40000 ALTER TABLE `property` DISABLE KEYS */;
INSERT INTO `property` VALUES (1,2,'Căn hộ đẹp trung tâm','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp','2025-09-24 12:00:00',1200000000.00,'Hà Nội, Việt Nam',1,'APARTMENT','2025-08-24 16:45:29',3,10,2,'cơ bản'),(2,2,'Căn hộ đẹp trung tâm,Căn hộ đẹp trung tâm','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2025-09-24 12:00:00',1200000000.00,'Hà Nội, Việt Nam,',1,'VILLA','2025-08-24 18:21:37',3,15,3,'đầy đủ'),(3,2,'Nhà trọ siu đẹp','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2025-09-24 12:00:00',1200000000.00,'Hà Nội, Việt Nam,',1,'VILLA','2025-08-24 18:28:21',4,14,1,'trống'),(5,3,'Nhà phố Quận 1,Căn hộ đẹp trung tâm','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2025-09-24 12:00:00',1200000000.00,'Hà Nội, Việt Nam,',1,'APARTMENT','2025-08-25 19:03:34',4,53,4,'đầy đủ'),(6,3,'Nhà phố Quận 2,Căn hộ đẹp trung tâm','Căn hộ 2 phòng ngủ, đầy đủ tiện nghi, view đẹp,','2025-09-24 12:00:00',1200000000.00,'Hà Nội, Việt Nam,',1,'TOWNHOUSE','2025-08-31 19:58:09',4,27,2,'trống'),(7,3,'e123213','123213','2025-09-18 20:00:00',12321321.00,'Ho Chi Minh Office',1,'RENTAL_ROOM','2025-09-01 20:00:24',3,17,4,'cơ bản'),(8,8,'75623543','21312','2025-09-11 20:05:00',1000000.00,'Binh Thanh, Ho Chi Minh City',1,'TOWNHOUSE','2025-09-01 20:05:57',2,38,3,'cơ bản'),(9,8,'666666','123213','2025-09-24 20:42:00',1.00,'Binh Thanh, Ho Chi Minh City',1,'RENTAL_ROOM','2025-09-01 20:42:37',3,85,1,'đầy đủ');
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
  `image_url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `property_image_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_image`
--

LOCK TABLES `property_image` WRITE;
/*!40000 ALTER TABLE `property_image` DISABLE KEYS */;
INSERT INTO `property_image` VALUES (1,1,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756030690/u67zme5xj309c1rgfqrn.png',0,NULL),(2,1,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756030692/ndota8oacokl2kvnxjif.png',0,NULL),(3,1,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756030688/b0vteaqfpebv77vumspx.jpg',0,NULL),(4,1,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756030686/jmav5wiyhhzz6knhwe5j.png',0,NULL),(5,2,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756034499/v8g0sypscv7xjawrkmkh.png',0,NULL),(8,3,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756035263/k99aeur6mv2tame3lmnf.png',0,NULL),(9,3,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756035257/lvsjiarxx9cbj8vg7z4i.png',0,NULL),(10,3,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756035261/ozjntzosou7i2e2n57gx.png',0,NULL),(11,3,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756035259/pwji60hoigng5lhqkz7g.jpg',0,NULL),(12,6,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756645094/ydkgqvlzthrhj3lybxbi.png',0,NULL),(13,7,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756731628/gyjaa3k0fdeagpbiyl9z.jpg',0,NULL),(14,8,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756731959/q45xwpykl4cio7b7nnve.jpg',0,NULL),(15,9,'https://res.cloudinary.com/diimcwvs5/image/upload/v1756734161/n4stfkt4qlahcjd1to6u.png',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_save`
--

LOCK TABLES `property_save` WRITE;
/*!40000 ALTER TABLE `property_save` DISABLE KEYS */;
INSERT INTO `property_save` VALUES (4,3,2),(5,3,3),(12,23,1),(13,23,2);
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
  `buyer_id` int DEFAULT NULL,
  `property_id` int DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  `reason` tinytext COLLATE utf8mb4_bin,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `property_id` (`property_id`),
  KEY `staff_id` (`staff_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FKj62onw73yx1qnmd57tcaa9q3a` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `report_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`),
  CONSTRAINT `report_ibfk_3` FOREIGN KEY (`staff_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (2,NULL,3,NULL,'thong tin khong chinh xac',0,'2025-08-25 02:28:17',3);
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
  `comment` tinytext COLLATE utf8mb4_bin,
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
  `name` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
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
  `first_name` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `username` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nguyen','Van A',1,'1998-05-20','nguyenvana@example.com','123 Đường Lê Lợi, Quận 1, TP.HCM','0912345678','nguyenvana','$2a$10$0Fe6kZ6S8Iwsp7F7zjpLjOKj3q0cxveAIXPb93ovh8YL1meBnR.M.',NULL,1,NULL,'2025-09-10 15:52:10'),(2,'Nguyen','Van B',1,'1998-05-20','nhan@gmail.com','123 Đường Lê Lợi, Quận 1, TP.HCM','0912345678','nguyenvanb','$2a$10$tsja/uRm3NliLNgOYAd8yu1EZ.Irc/EP46/TIxmyTJT36xpPrjU1O',NULL,1,NULL,'2025-09-10 15:52:22'),(3,'Nhan',NULL,1,NULL,NULL,NULL,NULL,'nguyenvanc','$2a$10$V6qDVQnBS1YJpoH5Tultpu6GZuaeTkC9KXN4tZ4d2H/kWezRqcNlS','https://res.cloudinary.com/diimcwvs5/image/upload/v1756027015/hqvvjfz0cdsvoitntan1.jpg',NULL,NULL,'2025-09-10 15:51:55'),(4,'Nguyen','Van D',1,'1998-05-20','nhat1@gmail.com','123 Đường Lê Lợi, Quận 1, TP.HCM','0912345678','nguyenvand','$2a$10$D91Hhuoc78KDuudOObt2w.pAipfyL06RWCOGnKfaxM5jmDZfnK8HC','https://res.cloudinary.com/diimcwvs5/image/upload/v1756026939/x10zweveifsf4o2xntvo.jpg',1,NULL,NULL),(23,'Nhan','Tran',1,'2025-09-04','nhann1@gmail.com','','0522809305','nhan1','$2a$10$N5pZ45l4/OGc1uHUtDNJcOM7mn845HLEubhwdTIZrkNsTP8oFi7xe','https://res.cloudinary.com/diimcwvs5/image/upload/v1757964151/gwfnctnonbkrwpsnldll.png',0,'2025-09-10 16:07:12','2025-09-16 02:22:33'),(27,'fix','fix',NULL,NULL,'nhantran.0111004@gmail.com','1111','11111','123123123','$2a$10$0k.QPxp22laPozTkMh3TBuMqmyfDIppnqbp9jEaTd/EHtIzg8rUBm','https://res.cloudinary.com/diimcwvs5/image/upload/v1757964070/ljgegcyhbkezathwernw.png',1,'2025-09-15 23:26:04','2025-09-16 02:21:12'),(28,'Nhan','Tran',1,NULL,'nhann12@gmail.com','Binh Thanh',NULL,'nhan3','$2a$10$EcVefFiDAi.ehKW5zZ0FEOSeW0DNojyp1QA0cKsxMVuo9FRGYjy1W','https://res.cloudinary.com/diimcwvs5/image/upload/v1757964332/bwzf8jkdjbj1b7lpza4a.png',1,'2025-09-16 02:25:34',NULL),(30,'Nhan','Tran',1,NULL,'nhann123@gmail.com','Binh Thanh',NULL,'nhan4','$2a$10$tj7L4WHwiwAg4iU50I8lHO7Xv6S8taXe1/qBq/38i5Q2ilzg.sx..','https://res.cloudinary.com/diimcwvs5/image/upload/v1757964466/om10tkqujduwbxt7uoax.png',1,'2025-09-16 02:27:48','2025-09-16 02:29:47');
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
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,1),(2,2,3),(3,3,3),(4,4,4),(21,23,2),(53,27,3),(55,28,2),(54,28,3),(59,30,2);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-17 13:33:29
