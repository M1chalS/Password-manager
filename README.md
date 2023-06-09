## PASSWD

[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/M1chalS/Password-manager/blob/master/README.md)
[![pl](https://img.shields.io/badge/lang-pl-green.svg)](https://github.com/M1chalS/Password-manager/blob/master/README.pl.md)

Deployment link: [PASSWD](https://passwd-manager.netlify.app/)

### Technologies
- Laravel
- React
- MySQL

### Opis
Application allows users to create, edit and delete passwords, and then send them between registered users.
The application uses an author's algorithm for two-way password encryption.

Concept file: [concept](concept.md)

### Setup

1. Clone repository
2. Install required dependencies
    ```bash
    composer install
    ```
3. Create .env file based on .env.example
4. Generate application key
    ```bash
    php artisan key:generate
    ```
5. Run migrations
    ```bash
    php artisan migrate
    ```
6. Start server
    ```bash
    php artisan serve
    ```
7. Go to the /react folder and install dependencies
    ```bash
    cd react
    npm run install
    npm run dev
    ```

8. App runs on: http://localhost:4000

*By [Michał Szajner](https://github.com/M1chalS)*