## PASSWD

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/M1chalS/Password-manager/blob/master/README.md)
[![pl](https://img.shields.io/badge/lang-pl-green.svg)](https://github.com/M1chalS/Password-manager/blob/master/README.pl.md)

Deployment link: [PASSWD](https://passwd-manager.netlify.app/)

### Technologie
- Laravel
- React
- MySQL

### Opis
Aplikacja umożliwia użytkownikom tworzenie, edytowanie i usuwanie haseł, a następnie przesyłanie ich pomiędzy zarejestrowanymi użytkownikami.
Aplikacja wykorzystuje autorski algorytm dwustronnego szyfrowania haseł.

Plik konceptu: [concept](concept.md)

### Setup

1. Sklonuj repozytorium
2. Zainstaluj wymagane zależności
    ```bash
    composer install
    ```
3. Stwórz plik .env na podstawie .env.example
4. Wygeneruj klucz aplikacji
    ```bash
    php artisan key:generate
    ```
5. Uruchom migracje
    ```bash
    php artisan migrate
    ```
6. Uruchom serwer
    ```bash
    php artisan serve
    ```
7. Wejdź do folderu react i zainstaluj zależności
    ```bash
    cd react
    npm run install
    npm run dev
    ```

8. Aplikacja pracuje na  http://localhost:4000

*Stworzone przez [Michał Szajner](https://github.com/M1chalS)*