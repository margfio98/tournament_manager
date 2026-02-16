<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Pecee\SimpleRouter\SimpleRouter;
use App\Utils\Response;

// Configurazione ambiente
date_default_timezone_set('Europe/Rome');
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

// Gestione errori per lo sviluppo
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Gestione CORS Preflight
Response::handlePreflight();

// Handler Eccezioni Globale
set_exception_handler(function ($e) {
    Response::error(
        'Errore interno del server: ' . $e->getMessage(),
        500
    )->send();
});

// Configurazione Router
SimpleRouter::setDefaultNamespace('App\Controllers');

// Caricamento rotte
require_once __DIR__ . '/../routes/index.php';

// Avvio
SimpleRouter::start();