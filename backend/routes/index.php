<?php
use Pecee\SimpleRouter\SimpleRouter as Router;

Router::group(['prefix' => '/api'], function () {
    Router::get('/db-test', 'DbTestController@index');

    Router::get('/players', 'PlayerController@index');
    Router::get('/players/{id}', 'PlayerController@show');
    Router::post('/players', 'PlayerController@store');
    Router::put('/players/{id}', 'PlayerController@update');
    Router::delete('/players/{id}', 'PlayerController@delete');

    Router::get('/tournaments', 'TournamentController@index');
    Router::get('/tournaments/{id}', 'TournamentController@show');
    Router::post('/tournaments', 'TournamentController@store');
    Router::put('/tournaments/{id}', 'TournamentController@update');
    Router::delete('/tournaments/{id}', 'TournamentController@delete');

    Router::get('/matches', 'MatchController@index');
    Router::get('/matches/tournament/{tournamentId}', 'MatchController@byTournament');
    Router::get('/matches/{id}', 'MatchController@show');
    Router::post('/matches', 'MatchController@store');
    Router::put('/matches/{id}', 'MatchController@update');
    Router::delete('/matches/{id}', 'MatchController@delete');
});