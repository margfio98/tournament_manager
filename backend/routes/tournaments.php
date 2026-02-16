<?php
use Pecee\SimpleRouter\SimpleRouter as Router;
use App\Controllers\TournamentController;

// Rotte per la risorsa Tournaments
Router::get('/tournaments', 'TournamentController@index');  // Lista tornei
Router::post('/tournaments', 'TournamentController@store'); // Crea un torneo (e genera il tabellone)