# Tournament Manager

Gestione di tornei di tennis con backend PHP e frontend React.
Il progetto permette di creare giocatori, generare tornei, inserire risultati e determinare automaticamente il vincitore finale.

---

## Tecnologie

Backend:

* PHP (OOP)
* SimpleRouter
* MySQL
* API REST JSON

Frontend:

* React
* Vite
* TailwindCSS
* Axios

---

## Struttura del progetto

```
tournament_manager
│
├── backend
│   ├── app
│   │   ├── Controllers
│   │   ├── Models
│   │   ├── Database
│   │   └── Http
│   │
│   ├── routes
│   │   ├── index.php
│   │   ├── players.php
│   │   ├── tournaments.php
│   │   └── matches.php
│   │
│   ├── config
│   ├── public
│   ├── composer.json
│   └── vendor
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── database
│   └── tournament_manager_dump.sql
│
├── .gitignore
└── README.md
```

---

## Setup Database

```bash
mysql -u root -p tournament_manager < database/tournament_manager_dump.sql
```
Configurare credenziali MySql. Aprire il file:
backend/config/database.php
e inserire la propria password MySQL

---

## Avvio Backend

```bash
cd backend
composer install
php -S localhost:8000 -t public
```

API:
http://localhost:8000/api

---

## Avvio Frontend

```bash
cd frontend
npm install
npm run dev
```

App:
http://localhost:5173
