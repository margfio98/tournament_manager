-- MySQL dump 10.13  Distrib 8.0.45, for macos15 (x86_64)
--
-- Host: localhost    Database: tournament_manager
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Current Database: `tournament_manager`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `tournament_manager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `tournament_manager`;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tournament_id` int NOT NULL,
  `round` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `player1_id` int DEFAULT NULL,
  `player2_id` int DEFAULT NULL,
  `winner_player_id` int DEFAULT NULL,
  `score` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `next_match_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tournament_id` (`tournament_id`),
  KEY `player1_id` (`player1_id`),
  KEY `player2_id` (`player2_id`),
  KEY `winner_player_id` (`winner_player_id`),
  KEY `next_match_id` (`next_match_id`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`player1_id`) REFERENCES `players` (`id`) ON DELETE SET NULL,
  CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`player2_id`) REFERENCES `players` (`id`) ON DELETE SET NULL,
  CONSTRAINT `matches_ibfk_4` FOREIGN KEY (`winner_player_id`) REFERENCES `players` (`id`) ON DELETE SET NULL,
  CONSTRAINT `matches_ibfk_5` FOREIGN KEY (`next_match_id`) REFERENCES `matches` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (1,1,'Final',2,1,2,'6-4 6-3',NULL,'2026-02-16 09:07:32'),(2,2,'Final',4,3,4,'1-0',NULL,'2026-02-16 10:21:51'),(3,2,'Semi-final',2,4,4,'1-0',2,'2026-02-16 10:21:51'),(4,2,'Semi-final',1,3,3,'1-0',2,'2026-02-16 10:21:51');
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(3) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'Mario','Rossi','ITA',1,'2026-02-16 08:46:15'),(2,'Anna','Bianchi','ITA',1,'2026-02-16 08:57:56'),(3,'Adsfghjkhl',';lokoh','ITA',1,'2026-02-16 10:20:53'),(4,'ok','okok','DE',1,'2026-02-16 10:21:15');
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournament_participants`
--

DROP TABLE IF EXISTS `tournament_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournament_participants` (
  `tournament_id` int NOT NULL,
  `player_id` int NOT NULL,
  PRIMARY KEY (`tournament_id`,`player_id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `tournament_participants_ibfk_1` FOREIGN KEY (`tournament_id`) REFERENCES `tournaments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tournament_participants_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournament_participants`
--

LOCK TABLES `tournament_participants` WRITE;
/*!40000 ALTER TABLE `tournament_participants` DISABLE KEYS */;
INSERT INTO `tournament_participants` VALUES (1,1),(2,1),(1,2),(2,2),(2,3),(2,4);
/*!40000 ALTER TABLE `tournament_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tournaments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('created','ongoing','finished') COLLATE utf8mb4_unicode_ci DEFAULT 'created',
  `winner_player_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `winner_player_id` (`winner_player_id`),
  CONSTRAINT `tournaments_ibfk_1` FOREIGN KEY (`winner_player_id`) REFERENCES `players` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tournaments`
--

LOCK TABLES `tournaments` WRITE;
/*!40000 ALTER TABLE `tournaments` DISABLE KEYS */;
INSERT INTO `tournaments` VALUES (1,'Torneo Test','finished',2,NULL,'Genova','2026-02-16 09:07:32'),(2,'qwertyui','finished',4,'2026-03-01','zxcvbn','2026-02-16 10:21:51');
/*!40000 ALTER TABLE `tournaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tournament_manager'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-16 12:10:21
