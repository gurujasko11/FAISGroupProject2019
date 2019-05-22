-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: Zespolowe
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

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
) ENGINE=InnoDB AUTO_INCREMENT=1112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bary`
--

LOCK TABLES `Bary` WRITE;
/*!40000 ALTER TABLE `Bary` DISABLE KEYS */;
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
  `nazwa_druzyny` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_druzyny`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Druzyny`
--

LOCK TABLES `Druzyny` WRITE;
/*!40000 ALTER TABLE `Druzyny` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Mecze`
--

LOCK TABLES `Mecze` WRITE;
/*!40000 ALTER TABLE `Mecze` DISABLE KEYS */;
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
  PRIMARY KEY (`id_uzytkownika`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Uzytkownicy`
--

LOCK TABLES `Uzytkownicy` WRITE;
/*!40000 ALTER TABLE `Uzytkownicy` DISABLE KEYS */;
INSERT INTO `Uzytkownicy` VALUES (1,'Rafal','Kowalski','kowalski@kowalski.com','111111111','12345'),(2,'mmmm','mmmm','mmm@mmm.com','NULL','12345'),(3,'aaaa','aaaa','bbb@bbb.com','NULL','12345'),(4,'aaaa','aaaa','ab@ab.com','NULL','12345'),(6,'aaaa','aaaa','pueblo@pueblo1.com','NULL','12345'),(7,'as','as','aa@am.com','NULL','12345'),(8,'am','am','m@m.com','NULL','12345'),(9,'m','m','m@m.clm','NULL','12345');
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

-- Dump completed on 2019-04-22 17:13:06
