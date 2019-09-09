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
UPDATE `Bary` SET `nazwa_baru`='El bar de Pablo Escobar', `telefon`='609273484' WHERE `id_baru`='1112';
UPDATE `Bary` SET `nazwa_baru`='Super Bar' WHERE `id_baru`='1113';
UPDATE `Bary` SET `nazwa_baru`='Pod Kotlem ', `telefon`='321234543' WHERE `id_baru`='1114';
UPDATE `Bary` SET `nazwa_baru`='Pierogi i Piwo', `telefon`='432856', `miasto`='Gdynia', `ulica`='Kolorowa' WHERE `id_baru`='1118';
UPDATE `Bary` SET `nazwa_baru`='Omerta', `telefon`='3281394', `miasto`='Kraków', `ulica`='Kupa' WHERE `id_baru`='1119';
UPDATE `Bary` SET `nazwa_baru`='Bar Studencki', `telefon`='38492384' WHERE `id_baru`='1120';
UPDATE `Bary` SET `nazwa_baru`='Fast Beer', `telefon`='12313143', `miasto`='Warszawa', `ulica`='Ciemna', `numer_budynku`='3', `numer_lokalu`='4' WHERE `id_baru`='1121';
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

INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('1', '1113', '4', '2019-09-14 17:30:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('2', '1119', '5', '2019-09-14 20:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('3', '1120', '5', '2019-09-14 20:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('4', '1112', '44', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('5', '1113', '44', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('7', '1120', '61', '2019-11-09 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('8', '1120', '54', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('9', '1114', '61', '2019-11-09 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('10', '1114', '54', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('11', '1113', '38', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('12', '1121', '38', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('13', '1112', '38', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('14', '1120', '38', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('15', '1118', '38', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('16', '1114', '38', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('17', '1119', '27', '2019-10-05 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('18', '1118', '27', '2019-10-05 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('19', '1114', '27', '2019-10-05 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('20', '1113', '27', '2019-10-05 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('21', '1112', '27', '2019-10-05 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('22', '1120', '27', '2019-10-05 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `czas`) VALUES ('23', '1121', '2019-10-05 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('24', '1119', '25', '2019-10-04 18:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('25', '1112', '25', '2019-10-04 18:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('26', '1121', '25', '2019-10-04 18:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('27', '1113', '25', '2019-10-04 18:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('28', '1114', '25', '2019-10-04 18:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('29', '1118', '25', '2019-10-04 18:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('30', '1120', '25', '2019-10-04 18:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('31', '1112', '45', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('32', '1113', '45', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('33', '1114', '45', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('34', '1118', '45', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('35', '1119', '45', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('36', '1112', '55', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('37', '1113', '55', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('38', '1114', '55', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('39', '1121', '55', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('40', '1120', '56', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('41', '1114', '56', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('42', '1113', '56', '2019-11-02 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('43', '1114', '60', '2019-11-09 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('44', '1119', '60', '2019-11-09 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('45', '1114', '65', '2019-11-23 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('46', '1118', '65', '2019-11-23 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('47', '1114', '79', '2019-11-30 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('48', '1119', '79', '2019-11-30 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('49', '1118', '61', '2019-11-09 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('50', '1114', '61', '2019-11-09 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('51', '1119', '43', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('52', '1114', '43', '2019-10-26 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('53', '1118', '39', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('54', '1120', '39', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('55', '1119', '36', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('56', '1114', '36', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('57', '1118', '34', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('58', '1114', '34', '2019-10-19 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('59', '1119', '31', '2019-10-06 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('60', '1114', '31', '2019-10-06 15:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('61', '1120', '105', '2020-02-08 00:00:00');
INSERT INTO `Bary_Z_Meczami` (`id_wydarzenia`, `id_baru`, `id_meczu`, `czas`) VALUES ('62', '1121', '105', '2020-02-08 00:00:00');
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
INSERT INTO `Druzyny` VALUES (21,'ARSENAL'),(22,'ASTON VILLA'),(23,'AFC BOURNEMOUTH'),(24,'BRIGHTON AND HOVE ALBION'),(25,'BURNLEY'),(26,'CHELSEA'),(27,'CRYSTAL PALACE'),(28,'EVERTON'),(29,'LEICESTER CITY'),(30,'LIVERPOOL'),(31,'MANCHESTER CITY'),(32,'MANCHESTER UNITED'),(33,'NEWCASTLE UNITED'),(34,'NORWICH CITY'),(35,'SHEFFIELD UNITED'),(36,'SOUTHAMPTON'),(37,'TOTTENHAM HOTSPUR'),(38,'WATFORD'),(39,'WEST HAM UNITED'),(40,'WOLVERHAMPTON WANDERERS');
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

INSERT INTO `Mecze` VALUES (201,23,35,'2019-10-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (202,25,36,'2019-10-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (203,27,28,'2019-10-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (204,29,40,'2019-10-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (205,37,22,'2019-10-8 17:30:00:00','Premier League');
INSERT INTO `Mecze` VALUES (206,38,24,'2019-10-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (207,39,31,'2019-10-8 12:30:00:00','Premier League');
INSERT INTO `Mecze` VALUES (208,32,26,'2019-11-8 16:30:00:00','Premier League');
INSERT INTO `Mecze` VALUES (209,33,21,'2019-11-8 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (210,21,25,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (211,22,23,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (212,24,39,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (213,26,29,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (214,28,38,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (215,31,37,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (216,34,33,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (217,35,27,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (218,36,30,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (219,40,32,'2019-17-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (220,22,28,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (221,23,31,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (222,24,36,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (223,30,21,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (224,32,27,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (225,34,26,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (226,35,29,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (227,37,33,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (228,38,39,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (229,40,25,'2019-24-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (230,21,37,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (231,25,30,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (232,26,35,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (233,27,22,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (234,28,40,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (235,29,23,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (236,31,24,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (237,33,38,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (238,36,32,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (239,39,34,'2019-31-8 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (240,22,39,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (241,23,28,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (242,24,25,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (243,30,33,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (244,32,29,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (245,34,31,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (246,35,36,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (247,37,27,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (248,38,21,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (249,40,26,'2019-14-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (250,21,22,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (251,25,34,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (252,26,30,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (253,27,40,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (254,28,35,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (255,29,37,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (256,31,38,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (257,33,24,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (258,36,23,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (259,39,32,'2019-21-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (260,22,25,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (261,23,39,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (262,26,24,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (263,27,34,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (264,28,31,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (265,29,33,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (266,32,21,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (267,35,30,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (268,37,36,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (269,40,38,'2019-28-9 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (270,21,23,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (271,24,37,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (272,25,28,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (273,30,29,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (274,31,40,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (275,33,32,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (276,34,22,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (277,36,26,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (278,38,35,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (279,39,27,'2019-5-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (280,22,24,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (281,23,34,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (282,26,33,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (283,27,31,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (284,28,39,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (285,29,25,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (286,32,30,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (287,35,21,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (288,37,38,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (289,40,36,'2019-19-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (290,21,27,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (291,24,28,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (292,25,26,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (293,30,37,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (294,31,22,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (295,33,40,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (296,34,32,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (297,36,29,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (298,38,23,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (299,39,35,'2019-26-10 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (300,21,40,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (301,22,30,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (302,23,32,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (303,24,34,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (304,27,29,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (305,28,37,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (306,31,36,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (307,35,25,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (308,38,26,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (309,39,33,'2019-2-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (310,25,39,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (311,26,27,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (312,29,21,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (313,30,31,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (314,32,24,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (315,33,23,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (316,34,38,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (317,36,28,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (318,37,35,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (319,40,22,'2019-9-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (320,21,36,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (321,22,33,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (322,23,40,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (323,24,29,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (324,27,30,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (325,28,34,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (326,31,26,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (327,35,32,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (328,38,25,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (329,39,37,'2019-23-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (330,25,27,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (331,26,39,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (332,29,28,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (333,30,24,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (334,32,22,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (335,33,31,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (336,34,21,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (337,36,38,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (338,37,23,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (339,40,35,'2019-30-11 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (340,21,24,'2019-3-12 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (341,25,31,'2019-3-12 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (342,29,38,'2019-3-12 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (343,32,37,'2019-3-12 19:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (344,35,33,'2019-3-12 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (345,40,39,'2019-3-12 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (346,26,22,'2019-4-12 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (347,27,23,'2019-4-12 19:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (348,30,28,'2019-4-12 19:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (349,36,34,'2019-4-12 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (350,22,29,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (351,23,30,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (352,24,40,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (353,28,26,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (354,31,32,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (355,33,36,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (356,34,35,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (357,37,25,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (358,38,27,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (359,39,21,'2019-7-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (360,21,31,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (361,25,33,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (362,26,23,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (363,27,24,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (364,29,34,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (365,30,38,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (366,32,28,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (367,35,22,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (368,36,39,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (369,40,37,'2019-14-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (370,22,36,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (371,23,25,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (372,24,35,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (373,28,21,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (374,31,29,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (375,33,27,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (376,34,40,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (377,37,26,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (378,38,32,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (379,39,30,'2019-21-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (380,22,34,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (381,23,21,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (382,26,36,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (383,27,39,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (384,28,25,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (385,29,30,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (386,32,33,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (387,35,38,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (388,37,24,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (389,40,31,'2019-26-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (390,21,26,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (391,24,23,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (392,25,32,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (393,30,40,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (394,31,35,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (395,33,28,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (396,34,37,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (397,36,27,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (398,38,22,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (399,39,29,'2019-28-12 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (400,21,32,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (401,24,26,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (402,25,22,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (403,30,35,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (404,31,28,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (405,33,29,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (406,34,27,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (407,36,37,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (408,38,40,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (409,39,23,'2020-1-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (410,22,31,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (411,23,38,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (412,26,25,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (413,27,21,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (414,28,24,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (415,29,36,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (416,32,34,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (417,35,39,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (418,37,30,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (419,40,33,'2020-11-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (420,21,35,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (421,24,22,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (422,25,29,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (423,30,32,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (424,31,27,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (425,33,26,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (426,34,23,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (427,36,40,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (428,38,37,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (429,39,28,'2020-18-1 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (430,22,38,'2020-21-1 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (431,23,24,'2020-21-1 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (432,28,33,'2020-21-1 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (433,29,39,'2020-21-1 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (434,32,25,'2020-21-1 19:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (435,35,31,'2020-21-1 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (436,40,30,'2020-21-1 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (437,26,21,'2020-22-1 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (438,27,36,'2020-22-1 19:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (439,37,34,'2020-22-1 18:45:00:00','Premier League');
INSERT INTO `Mecze` VALUES (440,23,22,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (441,25,21,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (442,27,35,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (443,29,26,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (444,30,36,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (445,32,40,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (446,33,34,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (447,37,31,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (448,38,28,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (449,39,24,'2020-1-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (450,21,33,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (451,22,37,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (452,24,38,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (453,26,32,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (454,28,27,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (455,31,39,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (456,34,30,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (457,35,23,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (458,36,25,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (459,40,29,'2020-8-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (460,21,28,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (461,25,23,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (462,26,37,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (463,27,33,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (464,29,31,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (465,30,39,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (466,32,38,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (467,35,24,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (468,36,22,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (469,40,34,'2020-22-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (470,22,35,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (471,23,26,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (472,24,27,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (473,28,32,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (474,31,21,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (475,33,25,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (476,34,29,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (477,37,40,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (478,38,30,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (479,39,36,'2020-29-2 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (480,21,39,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (481,25,37,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (482,26,28,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (483,27,38,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (484,29,22,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (485,30,23,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (486,32,31,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (487,35,34,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (488,36,33,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (489,40,24,'2020-7-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (490,22,26,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (491,23,27,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (492,24,21,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (493,28,30,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (494,31,25,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (495,33,35,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (496,34,36,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (497,37,32,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (498,38,29,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (499,39,40,'2020-14-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (500,25,38,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (501,26,31,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (502,29,24,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (503,30,27,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (504,32,35,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (505,33,22,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (506,34,28,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (507,36,21,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (508,37,39,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (509,40,23,'2020-21-3 14:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (510,21,34,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (511,22,40,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (512,23,33,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (513,24,32,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (514,27,25,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (515,28,29,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (516,31,30,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (517,35,37,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (518,38,36,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (519,39,26,'2020-4-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (520,25,35,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (521,26,38,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (522,29,27,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (523,30,22,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (524,32,23,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (525,33,39,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (526,34,24,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (527,36,31,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (528,37,28,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (529,40,21,'2020-11-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (530,21,29,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (531,22,32,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (532,23,37,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (533,24,30,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (534,27,26,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (535,28,36,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (536,31,33,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (537,35,40,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (538,38,34,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (539,39,25,'2020-18-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (540,22,27,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (541,23,29,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (542,24,31,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (543,30,25,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (544,32,36,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (545,34,39,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (546,35,26,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (547,37,21,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (548,38,33,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (549,40,28,'2020-25-4 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (550,21,30,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (551,25,40,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (552,26,34,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (553,27,32,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (554,28,22,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (555,29,35,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (556,31,23,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (557,33,37,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (558,36,24,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (559,39,38,'2020-2-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (560,22,21,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (561,23,36,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (562,24,33,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (563,30,26,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (564,32,39,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (565,34,25,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (566,35,28,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (567,37,29,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (568,38,31,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (569,40,27,'2020-9-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (570,21,38,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (571,25,24,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (572,26,40,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (573,27,37,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (574,28,23,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (575,29,32,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (576,31,34,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (577,33,30,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (578,36,35,'2020-17-5 15:00:00:00','Premier League');
INSERT INTO `Mecze` VALUES (579,39,22,'2020-17-5 15:00:00:00','Premier League');
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
