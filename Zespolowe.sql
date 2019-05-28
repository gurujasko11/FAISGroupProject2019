-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: Zespolowe
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bary`
--

DROP TABLE IF EXISTS `Bary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bary` (
  `id_baru` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa_baru` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefon` varchar(11) CHARACTER SET latin1 DEFAULT NULL,
  `miasto` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ulica` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numer_budynku` varchar(4) CHARACTER SET latin1 DEFAULT NULL,
  `numer_lokalu` varchar(4) CHARACTER SET latin1 DEFAULT NULL,
  `haslo` varchar(256) CHARACTER SET latin1 NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` float(10,6) DEFAULT NULL,
  `latitude` float(10,6) DEFAULT NULL,
  PRIMARY KEY (`id_baru`),
  UNIQUE KEY `email` (`email`),
  KEY `miasto` (`miasto`),
  CONSTRAINT `Bary_ibfk_1` FOREIGN KEY (`miasto`) REFERENCES `Miasta` (`miasto`)
) ENGINE=InnoDB AUTO_INCREMENT=1116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bary`
--

LOCK TABLES `Bary` WRITE;
/*!40000 ALTER TABLE `Bary` DISABLE KEYS */;
INSERT INTO `Bary` VALUES (1112,'Pueblo1','111111111','Kraków','Lubicz','2','','$2b$10$wngZg3DNIxDNST8.KFyCxe7GX5YmQPTuzcYIJuN3UYs4LrEw37G0.','pueblo1@pueblo.com',NULL,NULL),(1113,'SuperBar','123456789','Krakow','Krakowska','12','12','$2b$10$P9Rgh50UEfZ1UOM.QD0d3OM4ZCLdMLp8gKBscPNsybuu4EiVBo1xW','super@bar.pl',NULL,NULL),(1114,'bar','111111111','Kraków','Łojasiewicza','1','','$2b$10$uex8UlHbQUOVXqjx2MQmeeN4Oap63RVvRAPaRgNCIwFgDJg3bG0c2','bar@bar.com',NULL,NULL),(1115,'barek','111111111','Kraków','Łojasiewicza','1','','$2b$10$zkYaWiBMFCpM69OnwAePSOyR/NP5xCf33n7ncYSXZmWpe5mftjI3.','barek@barek.com',NULL,NULL);
/*!40000 ALTER TABLE `Bary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Bary_Z_Meczami`
--

DROP TABLE IF EXISTS `Bary_Z_Meczami`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bary_Z_Meczami`
--

LOCK TABLES `Bary_Z_Meczami` WRITE;
/*!40000 ALTER TABLE `Bary_Z_Meczami` DISABLE KEYS */;
/*!40000 ALTER TABLE `Bary_Z_Meczami` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Druzyny`
--

DROP TABLE IF EXISTS `Druzyny`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Druzyny` (
  `id_druzyny` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa_druzyny` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_druzyny`),
  UNIQUE KEY `nazwa_druzyny` (`nazwa_druzyny`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Druzyny`
--

LOCK TABLES `Druzyny` WRITE;
/*!40000 ALTER TABLE `Druzyny` DISABLE KEYS */;
INSERT INTO `Druzyny` VALUES (1,'legia'),(2,'pogoń');
/*!40000 ALTER TABLE `Druzyny` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Mecze`
--

DROP TABLE IF EXISTS `Mecze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Mecze` (
  `id_meczu` int(11) NOT NULL AUTO_INCREMENT,
  `id_druzyna1` int(11) DEFAULT NULL,
  `id_druzyna2` int(11) DEFAULT NULL,
  `czas` datetime DEFAULT NULL,
  PRIMARY KEY (`id_meczu`),
  KEY `id_druzyna1` (`id_druzyna1`),
  KEY `id_druzyna2` (`id_druzyna2`),
  CONSTRAINT `Mecze_ibfk_1` FOREIGN KEY (`id_druzyna1`) REFERENCES `Druzyny` (`id_druzyny`),
  CONSTRAINT `Mecze_ibfk_2` FOREIGN KEY (`id_druzyna2`) REFERENCES `Druzyny` (`id_druzyny`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mecze`
--

LOCK TABLES `Mecze` WRITE;
/*!40000 ALTER TABLE `Mecze` DISABLE KEYS */;
INSERT INTO `Mecze` VALUES (1,1,2,'2019-05-08 00:00:00');
/*!40000 ALTER TABLE `Mecze` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Miasta`
--

DROP TABLE IF EXISTS `Miasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Miasta` (
  `miasto` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`miasto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Miasta`
--

LOCK TABLES `Miasta` WRITE;
/*!40000 ALTER TABLE `Miasta` DISABLE KEYS */;
INSERT INTO `Miasta` VALUES ('Gdynia'),('Katowice'),('Kraków'),('Poznań'),('Warszawa'),('Wrocław');
/*!40000 ALTER TABLE `Miasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Uzytkownicy`
--

DROP TABLE IF EXISTS `Uzytkownicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Uzytkownicy` (
  `id_uzytkownika` int(11) NOT NULL AUTO_INCREMENT,
  `imie` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nazwisko` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 NOT NULL,
  `telefon` varchar(11) CHARACTER SET latin1 DEFAULT NULL,
  `haslo` varchar(256) CHARACTER SET latin1 NOT NULL,
  `status` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_uzytkownika`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Uzytkownicy`
--

LOCK TABLES `Uzytkownicy` WRITE;
/*!40000 ALTER TABLE `Uzytkownicy` DISABLE KEYS */;
INSERT INTO `Uzytkownicy` VALUES (1234, "Admin", "Admin", "admin@admin.com", 123456789, 1234, NULL);
/*INSERT INTO `Uzytkownicy` VALUES (1235, "Admin", "Admin", "chce.dostac@maila.com", 123456789, 1234, NULL);*/;
/*!40000 ALTER TABLE `Uzytkownicy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Uzytkownik_Z_Druzynami`
--

DROP TABLE IF EXISTS `Uzytkownik_Z_Druzynami`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `Uzytkownik_Z_Druzynami` VALUES (1235, 1);
/*!40000 ALTER TABLE `Uzytkownik_Z_Druzynami` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `Uzytkownik_Z_Druzynami`
--

DROP TABLE IF EXISTS `Wlasciciel_Z_Barami`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Wlasciciel_Z_Barami` (
  `id_uzytkownika` int(11) NOT NULL,
  `id_baru` int(11) NOT NULL,
  PRIMARY KEY (`id_uzytkownika`)
--  CONSTRAINT `Wlasciciel_Z_Barami_ibfk_1` FOREIGN KEY (`id_uzytkownika`) REFERENCES `Uzytkownicy` (`id_uzytkownika`),
--  CONSTRAINT `Wlasciciel_Z_Barami_ibfk_2` FOREIGN KEY (`id_druzyny`) REFERENCES `Druzyny` (`id_druzyny`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wlasciciel_Z_Barami`
--

LOCK TABLES `Wlasciciel_Z_Barami` WRITE;
/*!40000 ALTER TABLE `Wlasciciel_Z_Barami` DISABLE KEYS */;
INSERT INTO `Wlasciciel_Z_Barami` VALUES (1234, 1112);
INSERT INTO `Wlasciciel_Z_Barami` VALUES (1235, 1113);
/*!40000 ALTER TABLE `Wlasciciel_Z_Barami` ENABLE KEYS */;
UNLOCK TABLES;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-07 22:28:02
