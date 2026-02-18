<?php
namespace App\Models;

/**
 * gestione giocatori
 */
final class Player extends BaseModel {
    protected static string $table = 'players';

    public ?int $id = null;
    public ?string $first_name = null;
    public ?string $last_name = null;
    public ?string $country = null;
    public int $is_active = 1;

    public function getFullName(): string {
        return trim("{$this->first_name} {$this->last_name}");
    }
}