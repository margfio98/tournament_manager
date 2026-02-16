<?php
namespace App\Models;

/**
 * gestione tornei
 */
final class Tournament extends BaseModel {
    // Nome tabella database
    protected static string $table = 'tournaments';

    // Proprietà corr colonne database
    public ?string $name = null;
    public ?string $status = 'created'; // created, ongoing, finished
    public ?int $winner_player_id = null;
    public ?string $start_date = null;
    public ?string $location = null;
}