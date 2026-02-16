<?php
use Pecee\SimpleRouter\SimpleRouter as Router;
use App\Controllers\PlayerController;

// Rotte per la risorsa Players
Router::get('players', 'PlayerController@index');      // Lista tutti i giocatori
Router::post('/players', 'PlayerController@store');     // Crea un nuovo giocatore
Router::delete('/players/{id}', 'PlayerController@delete'); // Elimina un giocatore