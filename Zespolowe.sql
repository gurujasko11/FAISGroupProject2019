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
INSERT INTO `Druzyny` VALUES (11,'KS Cracovia'),(13,'Lech Poznań'),(12,'Legia Warszawa'),(10,'Wisła Kraków');
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
INSERT INTO `Mecze` VALUES (1,11,12,'2019-09-14 00:00:00', 'Ekstraklasa'),(2,11,12,'2019-09-18 00:00:00', 'Ekstraklasa'),(3,11,12,'2019-09-24 00:00:00', 'Ekstraklasa'),(4,13,12,'2019-09-24 14:00:00', 'Ekstraklasa'),(5,13,11,'2019-09-26 14:00:00', 'Ekstraklasa'),(6,11,13,'2019-09-08 12:12:00', 'Ekstraklasa');
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
