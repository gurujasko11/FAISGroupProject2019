-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: localhost    Database: Zespolowe
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `haslo` varchar(256) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES (3,'c@c','$2b$10$366.xJqolKQEK.51u5.FwOPmRuYbPucpF/mNCS9Y0XXgWr9.gkkyq'),(4,'admin@admin','$2b$10$qZ5EJSN7ebgSKlOa65DnY.BZb8158DZXU2dYdCVPTtzv7MvlvpYkG'),(5,'c@c.pl','$2b$10$J.K.wqfEWNTZ4gYaSBs3ceJJhcWjx8rFKwsUKSrYBvXG6lRTYzKZS');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bary`
--

DROP TABLE IF EXISTS `Bary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Bary` (
  `id_baru` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa_baru` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefon` varchar(11) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `miasto` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ulica` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numer_budynku` varchar(4) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `numer_lokalu` varchar(4) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `haslo` varchar(256) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` float(10,6) DEFAULT NULL,
  `latitude` float(10,6) DEFAULT NULL,
  `status` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_baru`),
  UNIQUE KEY `email` (`email`),
  KEY `miasto` (`miasto`),
  CONSTRAINT `Bary_ibfk_1` FOREIGN KEY (`miasto`) REFERENCES `Miasta` (`miasto`)
) ENGINE=InnoDB AUTO_INCREMENT=1122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bary`
--

LOCK TABLES `Bary` WRITE;
/*!40000 ALTER TABLE `Bary` DISABLE KEYS */;
INSERT INTO `Bary` VALUES (1112,'Pueblo1','111111111','Kraków','Lubicz','2','','$2b$10$wngZg3DNIxDNST8.KFyCxe7GX5YmQPTuzcYIJuN3UYs4LrEw37G0.','pueblo1@pueblo.com',NULL,NULL,'activated'),(1113,'SuperBar','123456789','Krakow','Krakowska','12','12','$2b$10$P9Rgh50UEfZ1UOM.QD0d3OM4ZCLdMLp8gKBscPNsybuu4EiVBo1xW','super@bar.pl',NULL,NULL,'activated'),(1114,'bar','111111111','Kraków','Łojasiewicza','1','','$2b$10$uex8UlHbQUOVXqjx2MQmeeN4Oap63RVvRAPaRgNCIwFgDJg3bG0c2','bar@bar.com',NULL,NULL,'activated'),(1118,'barek','11111111','bb','b','1','','$2b$10$mEPe.RlYRFYMNpRlHAVigOV9Gs59msiMrLxrXsfIwbqckAF0l7E/.','barek@barek.com',NULL,NULL,'activated'),(1119,'aaaaaa','11111111','mmmm','a','1','','$2b$10$4f6XNgmPDQ2AZ8PuQHG33.nd3FZ505qvTqcYqJWqPFVpAyuhjH6FK','b@b.com',NULL,NULL,'activated'),(1120,'UJ','11111111','Kraków','Norymberska','1','','$2b$10$JqEjGsH1RnyH.FuBsWCehugWmGWfdevbgLdakiw0ueNv42iGoD4kK','mat789789@gmail.com',NULL,NULL,'activated'),(1121,'c','123131','c','c','c','','$2b$10$dm7fe4R7W3zZqFaaxX.gfun73iK3F7Sf/7MLMnwiJc85rFw7JDj0m','c@c',NULL,NULL,'activated');
/*!40000 ALTER TABLE `Bary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bary_Z_Meczami`
--

DROP TABLE IF EXISTS `Bary_Z_Meczami`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Bary_Z_Meczami` (
  `id_wydarzenia` int(11) NOT NULL AUTO_INCREMENT,
  `id_baru` int(11) DEFAULT NULL,
  `id_meczu` int(11) DEFAULT NULL,
  `czas` datetime DEFAULT NULL,
  PRIMARY KEY (`id_wydarzenia`),
  KEY `id_baru` (`id_baru`),
  KEY `id_meczu` (`id_meczu`),
  CONSTRAINT `Bary_Z_Meczami_ibfk_1` FOREIGN KEY (`id_baru`) REFERENCES `Bary` (`id_baru`),
  CONSTRAINT `Bary_Z_Meczami_ibfk_2` FOREIGN KEY (`id_meczu`) REFERENCES `Mecze` (`id_meczu`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bary_Z_Meczami`
--

LOCK TABLES `Bary_Z_Meczami` WRITE;
/*!40000 ALTER TABLE `Bary_Z_Meczami` DISABLE KEYS */;
INSERT INTO `Bary_Z_Meczami` VALUES (6,1121,3,'2019-08-15 22:27:00');
/*!40000 ALTER TABLE `Bary_Z_Meczami` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Druzyny`
--

DROP TABLE IF EXISTS `Druzyny`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Druzyny` (
  `id_druzyny` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa_druzyny` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_druzyny`),
  UNIQUE KEY `nazwa_druzyny` (`nazwa_druzyny`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Druzyny`
--

LOCK TABLES `Druzyny` WRITE;
/*!40000 ALTER TABLE `Druzyny` DISABLE KEYS */;
INSERT INTO `Druzyny` VALUES (1,'ARKA GDYNIA'),(2,'CRACOVIA'),(3,'GÓRNIK ZABRZE'),(4,'JAGIELLONIA BIAŁYSTOK'),(5,'KORONA KIELCE'),(6,'LECH POZNAŃ'),(7,'LECHIA GDAŃSK'),(8,'LEGIA WARSZAWA'),(9,'ŁKS ŁÓDŹ'),(10,'PIAST GLIWICE'),(11,'POGOŃ SZCZECIN'),(12,'RAKÓW CZĘSTOCHOWA'),(13,'ŚLĄSK WROCŁAW'),(14,'WISŁA KRAKÓW'),(15,'WISŁA PŁOCK'),(16,'KGHM ZAGŁĘBIE SOSNOWIEC');
/*!40000 ALTER TABLE `Druzyny` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mecze`
--

DROP TABLE IF EXISTS `Mecze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Mecze` (
  `id_meczu` int(11) NOT NULL AUTO_INCREMENT,
  `id_druzyna1` int(11) DEFAULT NULL,
  `id_druzyna2` int(11) DEFAULT NULL,
  `czas` datetime DEFAULT NULL,
  `liga` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_meczu`),
  KEY `id_druzyna1` (`id_druzyna1`),
  KEY `id_druzyna2` (`id_druzyna2`),
  CONSTRAINT `Mecze_ibfk_1` FOREIGN KEY (`id_druzyna1`) REFERENCES `Druzyny` (`id_druzyny`),
  CONSTRAINT `Mecze_ibfk_2` FOREIGN KEY (`id_druzyna2`) REFERENCES `Druzyny` (`id_druzyny`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mecze`
--

LOCK TABLES `Mecze` WRITE;
/*!40000 ALTER TABLE `Mecze` DISABLE KEYS */;
INSERT INTO `Mecze` VALUES (1,16,15,'2019-09-13 18:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (2,4,8,'2019-09-13 20:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (3,12,1,'2019-09-14 15:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (4,7,6,'2019-09-14 17:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (5,5,14,'2019-09-14 20:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (6,11,9,'2019-09-15 15:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (7,3,13,'2019-09-15 17:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (8,2,10,'2019-09-16 18:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (9,10,12,'2019-09-20 18:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (10,6,4,'2019-09-20 20:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (11,9,1,'2019-09-21 15:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (12,7,5,'2019-09-21 17:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (13,13,16,'2019-09-21 20:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (14,15,14,'2019-09-22 12:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (15,11,3,'2019-09-22 15:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (16,2,8,'2019-09-22 17:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (17,5,13,'2019-09-27 20:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (18,12,15,'2019-09-28 15:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (19,8,7,'2019-09-28 17:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (20,3,6,'2019-09-28 20:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (21,1,10,'2019-09-29 12:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (22,4,11,'2019-09-29 15:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (23,14,2,'2019-09-29 17:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (24,16,9,'2019-09-30 18:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (25,15,1,'2019-10-04 18:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (26,13,4,'2019-10-04 20:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (27,11,12,'2019-10-05 15:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (28,6,14,'2019-10-05 17:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (29,7,16,'2019-10-05 20:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (30,9,5,'2019-10-06 12:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (31,2,3,'2019-10-06 15:00:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (32,10,8,'2019-10-06 17:30:00','Ekstraklasa');
INSERT INTO `Mecze` VALUES (33,16,11,'2019-10-19','Ekstraklasa');
INSERT INTO `Mecze` VALUES (34,14,10,'2019-10-19','Ekstraklasa');
INSERT INTO `Mecze` VALUES (35,5,15,'2019-10-19','Ekstraklasa');
INSERT INTO `Mecze` VALUES (36,1,7,'2019-10-19','Ekstraklasa');
INSERT INTO `Mecze` VALUES (37,4,2,'2019-10-19','Ekstraklasa');
INSERT INTO `Mecze` VALUES (38,3,9,'2019-10-19','Ekstraklasa');
INSERT INTO `Mecze` VALUES (39,8,6,'2019-10-19','Ekstraklasa');
INSERT INTO `Mecze` VALUES (40,12,13,'2019-10-19','Ekstraklasa');
INSERT INTO `Mecze` VALUES (41,7,3,'2019-10-26','Ekstraklasa');
INSERT INTO `Mecze` VALUES (42,9,12,'2019-10-26','Ekstraklasa');
INSERT INTO `Mecze` VALUES (43,13,1,'2019-10-26','Ekstraklasa');
INSERT INTO `Mecze` VALUES (44,8,14,'2019-10-26','Ekstraklasa');
INSERT INTO `Mecze` VALUES (45,2,11,'2019-10-26','Ekstraklasa');
INSERT INTO `Mecze` VALUES (46,10,5,'2019-10-26','Ekstraklasa');
INSERT INTO `Mecze` VALUES (47,6,16,'2019-10-26','Ekstraklasa');
INSERT INTO `Mecze` VALUES (48,15,4,'2019-10-26','Ekstraklasa');
INSERT INTO `Mecze` VALUES (49,2,7,'2019-11-02','Ekstraklasa');
INSERT INTO `Mecze` VALUES (50,11,6,'2019-11-02','Ekstraklasa');
INSERT INTO `Mecze` VALUES (51,12,14,'2019-11-02','Ekstraklasa');
INSERT INTO `Mecze` VALUES (52,3,10,'2019-11-02','Ekstraklasa');
INSERT INTO `Mecze` VALUES (53,1,8,'2019-11-02','Ekstraklasa');
INSERT INTO `Mecze` VALUES (54,13,15,'2019-11-02','Ekstraklasa');
INSERT INTO `Mecze` VALUES (55,4,9,'2019-11-02','Ekstraklasa');
INSERT INTO `Mecze` VALUES (56,5,16,'2019-11-02','Ekstraklasa');
INSERT INTO `Mecze` VALUES (57,14,1,'2019-11-09','Ekstraklasa');
INSERT INTO `Mecze` VALUES (58,6,5,'2019-11-09','Ekstraklasa');
INSERT INTO `Mecze` VALUES (59,15,2,'2019-11-09','Ekstraklasa');
INSERT INTO `Mecze` VALUES (60,7,11,'2019-11-09','Ekstraklasa');
INSERT INTO `Mecze` VALUES (61,9,13,'2019-11-09','Ekstraklasa');
INSERT INTO `Mecze` VALUES (62,8,3,'2019-11-09','Ekstraklasa');
INSERT INTO `Mecze` VALUES (63,16,12,'2019-11-09','Ekstraklasa');
INSERT INTO `Mecze` VALUES (64,10,4,'2019-11-09','Ekstraklasa');
INSERT INTO `Mecze` VALUES (65,6,10,'2019-11-23','Ekstraklasa');
INSERT INTO `Mecze` VALUES (66,2,16,'2019-11-23','Ekstraklasa');
INSERT INTO `Mecze` VALUES (67,7,9,'2019-11-23','Ekstraklasa');
INSERT INTO `Mecze` VALUES (68,3,15,'2019-11-23','Ekstraklasa');
INSERT INTO `Mecze` VALUES (69,11,8,'2019-11-23','Ekstraklasa');
INSERT INTO `Mecze` VALUES (70,4,1,'2019-11-23','Ekstraklasa');
INSERT INTO `Mecze` VALUES (71,13,14,'2019-11-23','Ekstraklasa');
INSERT INTO `Mecze` VALUES (72,5,12,'2019-11-23','Ekstraklasa');
INSERT INTO `Mecze` VALUES (73,12,4,'2019-11-30','Ekstraklasa');
INSERT INTO `Mecze` VALUES (74,1,11,'2019-11-30','Ekstraklasa');
INSERT INTO `Mecze` VALUES (75,9,2,'2019-11-30','Ekstraklasa');
INSERT INTO `Mecze` VALUES (76,14,7,'2019-11-30','Ekstraklasa');
INSERT INTO `Mecze` VALUES (77,16,3,'2019-11-30','Ekstraklasa');
INSERT INTO `Mecze` VALUES (78,15,6,'2019-11-30','Ekstraklasa');
INSERT INTO `Mecze` VALUES (79,8,5,'2019-11-30','Ekstraklasa');
INSERT INTO `Mecze` VALUES (80,10,13,'2019-11-30','Ekstraklasa');
INSERT INTO `Mecze` VALUES (81,5,1,'2019-12-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (82,13,8,'2019-12-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (83,6,9,'2019-12-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (84,2,12,'2019-12-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (85,7,15,'2019-12-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (86,3,14,'2019-12-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (87,4,16,'2019-12-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (88,11,10,'2019-12-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (89,8,15,'2019-12-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (90,14,11,'2019-12-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (91,10,9,'2019-12-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (92,1,16,'2019-12-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (93,13,6,'2019-12-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (94,4,7,'2019-12-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (95,12,3,'2019-12-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (96,5,2,'2019-12-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (97,16,8,'2019-12-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (98,15,10,'2019-12-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (99,6,1,'2019-12-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (100,9,14,'2019-12-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (101,2,13,'2019-12-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (102,7,12,'2019-12-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (103,3,4,'2019-12-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (104,11,5,'2019-12-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (105,6,12,'2020-02-08','Ekstraklasa');
INSERT INTO `Mecze` VALUES (106,14,4,'2020-02-08','Ekstraklasa');
INSERT INTO `Mecze` VALUES (107,15,11,'2020-02-08','Ekstraklasa');
INSERT INTO `Mecze` VALUES (108,8,9,'2020-02-08','Ekstraklasa');
INSERT INTO `Mecze` VALUES (109,1,2,'2020-02-08','Ekstraklasa');
INSERT INTO `Mecze` VALUES (110,13,7,'2020-02-08','Ekstraklasa');
INSERT INTO `Mecze` VALUES (111,10,16,'2020-02-08','Ekstraklasa');
INSERT INTO `Mecze` VALUES (112,5,3,'2020-02-08','Ekstraklasa');
INSERT INTO `Mecze` VALUES (113,3,1,'2020-02-15','Ekstraklasa');
INSERT INTO `Mecze` VALUES (114,11,13,'2020-02-15','Ekstraklasa');
INSERT INTO `Mecze` VALUES (115,12,8,'2020-02-15','Ekstraklasa');
INSERT INTO `Mecze` VALUES (116,4,5,'2020-02-15','Ekstraklasa');
INSERT INTO `Mecze` VALUES (117,9,15,'2020-02-15','Ekstraklasa');
INSERT INTO `Mecze` VALUES (118,16,14,'2020-02-15','Ekstraklasa');
INSERT INTO `Mecze` VALUES (119,2,6,'2020-02-15','Ekstraklasa');
INSERT INTO `Mecze` VALUES (120,7,10,'2020-02-15','Ekstraklasa');
INSERT INTO `Mecze` VALUES (121,14,5,'2020-02-22','Ekstraklasa');
INSERT INTO `Mecze` VALUES (122,6,7,'2020-02-22','Ekstraklasa');
INSERT INTO `Mecze` VALUES (123,15,16,'2020-02-22','Ekstraklasa');
INSERT INTO `Mecze` VALUES (124,8,4,'2020-02-22','Ekstraklasa');
INSERT INTO `Mecze` VALUES (125,9,11,'2020-02-22','Ekstraklasa');
INSERT INTO `Mecze` VALUES (126,10,2,'2020-02-22','Ekstraklasa');
INSERT INTO `Mecze` VALUES (127,1,12,'2020-02-22','Ekstraklasa');
INSERT INTO `Mecze` VALUES (128,13,3,'2020-02-22','Ekstraklasa');
INSERT INTO `Mecze` VALUES (129,5,7,'2020-02-29','Ekstraklasa');
INSERT INTO `Mecze` VALUES (130,1,9,'2020-02-29','Ekstraklasa');
INSERT INTO `Mecze` VALUES (131,8,2,'2020-02-29','Ekstraklasa');
INSERT INTO `Mecze` VALUES (132,3,11,'2020-02-29','Ekstraklasa');
INSERT INTO `Mecze` VALUES (133,12,10,'2020-02-29','Ekstraklasa');
INSERT INTO `Mecze` VALUES (134,4,6,'2020-02-29','Ekstraklasa');
INSERT INTO `Mecze` VALUES (135,14,15,'2020-02-29','Ekstraklasa');
INSERT INTO `Mecze` VALUES (136,16,13,'2020-02-29','Ekstraklasa');
INSERT INTO `Mecze` VALUES (137,10,1,'2020-03-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (138,2,14,'2020-03-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (139,13,5,'2020-03-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (140,11,4,'2020-03-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (141,6,3,'2020-03-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (142,15,12,'2020-03-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (143,7,8,'2020-03-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (144,9,16,'2020-03-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (145,14,6,'2020-03-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (146,16,7,'2020-03-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (147,1,15,'2020-03-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (148,5,9,'2020-03-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (149,3,2,'2020-03-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (150,8,10,'2020-03-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (151,4,13,'2020-03-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (152,12,11,'2020-03-07','Ekstraklasa');
INSERT INTO `Mecze` VALUES (153,9,3,'2020-03-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (154,7,1,'2020-03-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (155,2,4,'2020-03-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (156,13,12,'2020-03-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (157,10,14,'2020-03-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (158,6,8,'2020-03-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (159,11,16,'2020-03-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (160,15,5,'2020-03-14','Ekstraklasa');
INSERT INTO `Mecze` VALUES (161,12,9,'2020-03-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (162,4,15,'2020-03-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (163,14,8,'2020-03-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (164,16,6,'2020-03-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (165,1,13,'2020-03-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (166,5,10,'2020-03-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (167,11,2,'2020-03-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (168,3,7,'2020-03-21','Ekstraklasa');
INSERT INTO `Mecze` VALUES (169,14,12,'2020-04-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (170,6,11,'2020-04-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (171,15,13,'2020-04-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (172,7,2,'2020-04-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (173,16,5,'2020-04-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (174,9,4,'2020-04-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (175,8,1,'2020-04-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (176,10,3,'2020-04-04','Ekstraklasa');
INSERT INTO `Mecze` VALUES (177,11,7,'2020-04-11','Ekstraklasa');
INSERT INTO `Mecze` VALUES (178,2,15,'2020-04-11','Ekstraklasa');
INSERT INTO `Mecze` VALUES (179,12,16,'2020-04-11','Ekstraklasa');
INSERT INTO `Mecze` VALUES (180,3,8,'2020-04-11','Ekstraklasa');
INSERT INTO `Mecze` VALUES (181,4,10,'2020-04-11','Ekstraklasa');
INSERT INTO `Mecze` VALUES (182,13,9,'2020-04-11','Ekstraklasa');
INSERT INTO `Mecze` VALUES (183,5,6,'2020-04-11','Ekstraklasa');
INSERT INTO `Mecze` VALUES (184,1,14,'2020-04-11','Ekstraklasa');
/*!40000 ALTER TABLE `Mecze` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Miasta`
--

DROP TABLE IF EXISTS `Miasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Miasta` (
  `miasto` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`miasto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Miasta`
--

LOCK TABLES `Miasta` WRITE;
/*!40000 ALTER TABLE `Miasta` DISABLE KEYS */;
INSERT INTO `Miasta` VALUES ('BB'),('c'),('Gdynia'),('Katowice'),('Krak'),('Kraków'),('mmmm'),('Poznań'),('Warszawa'),('Wrocław');
/*!40000 ALTER TABLE `Miasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Uzytkownicy`
--

DROP TABLE IF EXISTS `Uzytkownicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Uzytkownicy` (
  `id_uzytkownika` int(11) NOT NULL AUTO_INCREMENT,
  `imie` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nazwisko` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telefon` varchar(11) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `haslo` varchar(256) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_uzytkownika`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1243 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Uzytkownicy`
--

LOCK TABLES `Uzytkownicy` WRITE;
/*!40000 ALTER TABLE `Uzytkownicy` DISABLE KEYS */;
INSERT INTO `Uzytkownicy` VALUES (1235,'Jan','Kowalski','barek@barek.com','NULL','$2b$10$P25gC8O0vCRODQYw3E5YOuhx/10iodvUC7O9sJUiywfzZSYvCQGCm','activated'),(1238,'aaa','bbb','mat789789@gmail.com','aaa','$2b$10$VnMz5DymURdOLm1tAHHP4uQyapYoVLX2z1DseBvm0BUkLf1h2bUYO','activated'),(1239,'sascasasca','sasca','sasca@c','sasca','$2b$10$PKLI627NcQi5RdCyoIwqnuL7mQe0eYHeTBTLCn/KZUfAeJZhBrX0y','activated'),(1240,'NULL','NULL','c@c','NULL','$2b$10$pmk8aEnfKKmUOyeaZ5T.C.yhvFmeu.Vn6cS/QQNCmKLiBtUyNzBNG','activated'),(1242,'NULL','NULL','c@c.pl','NULL','$2b$10$/xsneHhThlN5tM9.2D/Lyut3DvyBLUf4Fh2wcYRjJnQWvrbRo4p4a','activated');
/*!40000 ALTER TABLE `Uzytkownicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Uzytkownik_Z_Druzynami`
--

DROP TABLE IF EXISTS `Uzytkownik_Z_Druzynami`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Uzytkownik_Z_Druzynami` (
  `id_uzytkownika` int(11) NOT NULL,
  `id_druzyny` int(11) NOT NULL,
  PRIMARY KEY (`id_uzytkownika`,`id_druzyny`),
  KEY `id_druzyny` (`id_druzyny`),
  CONSTRAINT `Uzytkownik_Z_Druzynami_ibfk_1` FOREIGN KEY (`id_uzytkownika`) REFERENCES `Uzytkownicy` (`id_uzytkownika`),
  CONSTRAINT `Uzytkownik_Z_Druzynami_ibfk_2` FOREIGN KEY (`id_druzyny`) REFERENCES `Druzyny` (`id_druzyny`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Uzytkownik_Z_Druzynami`
--

LOCK TABLES `Uzytkownik_Z_Druzynami` WRITE;
/*!40000 ALTER TABLE `Uzytkownik_Z_Druzynami` DISABLE KEYS */;
INSERT INTO `Uzytkownik_Z_Druzynami` VALUES (1238,10),(1238,12);
/*!40000 ALTER TABLE `Uzytkownik_Z_Druzynami` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-10 21:04:18
