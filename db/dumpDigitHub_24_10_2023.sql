-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: digithub
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_fk` int NOT NULL,
  `product_fk` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_fk_idx` (`user_fk`),
  KEY `product_fk_idx` (`product_fk`),
  CONSTRAINT `product_fk` FOREIGN KEY (`product_fk`) REFERENCES `product` (`product_id`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user_fk`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,2,2,5);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Câble'),(3,'Clavier'),(4,'Souris'),(5,'Ecran'),(6,'Carte mère'),(7,'Carte Graphique'),(8,'Docking station'),(9,'Ram');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `cart_fk` int NOT NULL,
  `amount` double DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `cart_fk_idx` (`cart_fk`),
  CONSTRAINT `cart_fk` FOREIGN KEY (`cart_fk`) REFERENCES `cart` (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (3,1,301,'still unpaid','2023-10-15 00:00:00','2023-10-15 00:00:00'),(4,1,220,'unpaid','2023-10-15 00:00:00','2023-10-15 00:00:00');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `category_fk` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `image_path` varchar(16000) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_fk_idx` (`category_fk`),
  CONSTRAINT `category_fk` FOREIGN KEY (`category_fk`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,3,'corsair k70','Clavier mecanique red cherry',159.9,NULL),(2,2,'cable HDMI 3M','HDMI male-femelle 3M ',21.1,NULL),(3,2,'cable HDMI 4M','HDMI male-femelle 3M ',21.1,NULL),(4,2,'cable HDMI 5M','HDMI male-femelle 3M ',21.1,NULL),(5,2,'cable DVI 2M','DVI male-femelle 2M ',10.9,NULL),(6,2,'cable DVI 3M','DVI male-femelle 3M ',10.9,NULL),(7,4,'Logitech G Pro','Souris ultra lègére bluetooth',139.9,NULL),(9,3,'te','sdaf',135,'360_F_585864419_kgIYUcDQ0yiLOCo1aRjeu7kRxndcoitz.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(300) DEFAULT NULL,
  `last_name` varchar(300) DEFAULT NULL,
  `mail` varchar(45) NOT NULL,
  `password` varchar(300) DEFAULT NULL,
  `birthdate` date NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Padilla','Elaine','test@test.com','789456','2021-02-07',2),(3,'bouby','avi','test@test.com','789456','2021-02-07',2),(8,'emile','zola','emile.zola@tes.com','emileZola','1981-08-07',4),(9,'jean','valjean','test@bla.com','456789','1800-05-03',1),(10,'emile','zola','emile.zola@tes.com','emileZola','1981-08-07',4),(11,'emile','zola','emile.zola@tes.com','emileZola','1981-08-07',4),(13,'Padilla','Elaine','test@test.com','sha256$5Tqx8NPQMKkX7D9W$e22c53b5a7929bccce77edb534447e8c9d263115c39c242b5f53455b234a6c5e','2021-02-07',2),(14,'Padilla','Elaine','flow@test.com','sha256$5iCzmvfPrJIZ543G$5c67662e21f19504980d0a66ef0a937e34150da116b6538ba1fbfeb731755fee','2021-02-07',3),(15,'Padilla','Elaine','flow@test.com','sha256$q4vw6OvHE2jIITsa$f56de3810fb61475096016bb61fcad9d050404305aff3c9ecf5c543e9cd21823','2021-02-07',3),(16,'billy','testu','billy@test.com','sha256$wCZIsaWOrUvB34VN$137ecdde528f73b3cc38a35610cad4a6bfb198787c6ebd3c83f572d97bb8ece9','1991-06-02',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-24 12:04:39
