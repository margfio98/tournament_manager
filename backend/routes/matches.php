<?php
use Pecee\SimpleRouter\SimpleRouter as Router;

Router::group(['prefix' => '/api'], function () {
    require_once 'players.php';
    require_once 'tournaments.php';
    require_once 'matches.php';
});