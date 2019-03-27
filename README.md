# FAISGroupProject2019

W celu skorzystania z bazy danych należy zainstalować mysql serwer, a następnie wczytać bazę z pliku.  

Nawiązanie połączenia z bazą danych: w pliku app.js jest tworzenie połączenia z bazą danych.  
Wymagany jest pakiet mysql dla npm, można zainstalować komendą npm install mysql  
Nazwę użytkownika, hasło i nazwę bazy danych zmienić tak, aby paswowała do waszej stworzonej bazy mysql.

W celu korzystania z sesji - instalacja modułu express-session


# Pełna instrukcja:

Wymagania:
- node.js
- mysql (zalecana wersja 5.X)

# 1. Instalujemy node.js
# 2. Instalujemy mysql
Uwaga:
node.js nie wspiera nowego uwierzytelenienia wprowadzonego w mysql 8.X, więc jeżeli instalujesz wersję 8.X upewnij się, że hasło konta użytkownika używa starej wersji uwierzytelnienia: mysql_native_password. Więcej informacji i zmiana mechanizmu uwierzytelenienia:   https://stackoverflow.com/questions/50373427/node-js-cant-authenticate-to-mysql-8-0
# 3. Klonujemy repo
# 4. Logujemy się na mysql i tworzymy bazę
Domyślnie konto root'a jest bez hasła - chyba, że zostało ustawione przy instalacji. Komenda logowania (użytkownicy linuxa powinni wykonać ją za pomocą sudo):  
Bez hasła:  
mysql -u root  
Z hasłem:  
mysql -u root -p  
Po zalogowaniu się tworzymy bazę. Nazwa nie ma znaczenia, Mateusz nazwał ją Zespolowe. Można ustawić inną, ale należy pamiętać, że trzeba ją później wszędzie ustawić, gdzie z niej korzystamy (domyślnie push'nieta jest nazwa 'Zespolowe'). Komenda:  
create database nazwa_bazy
# 5. Ładujemy plik .sql do bazy danych mysql
mysql -u username -p database_name < file.sql
# 6. Konfiguracja projektu
Jeżeli node został zainstalowany, pakiet npm powinien działać z poziomu konsoli.
Przechodzimy do katalogu projektu (tam gdzie app.js) i jeżeli nie mamy folderu node_modules (nie korzystacie z archiwum Piotra), to należy wpisac:  
npm install  
npm install express  
npm install mysql  
Archiwum Piotra nie zawierało mysql, należy więc wpisać ostatnią linijkę mysql.  
Połączenie z bazą z poziomu projektu tworzone jest w pliku app.js, w linijkach (teraz 27-31):  
dbconn = mysql.createConnection({  
	user: 'root',  
	password: 'password',  
	database: 'Zespolowe'  
});  
Jak coś inaczej skonfigurowaliście, to należy to zmienić.
# Po tych wszystkich zmianach, serwer powinien odpalić
komendą: npm start  
Problemy przy odpalaniu:  
- Authentication error (handshake): Patrz punkt 2
- Authentication failed (permission denied): Niepoprawny login/hasło (logowania do mysql/ustawione w app.js - punkt 6)
