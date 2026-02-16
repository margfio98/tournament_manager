<?php
namespace App\Models;

final class MatchModel extends BaseModel {
    protected static string $table = 'matches';

    public static function byTournament(int $tournamentId): array {
        $rows = \App\Database\DB::select(
            "SELECT * FROM " . static::$table . " WHERE tournament_id = ? ORDER BY id ASC",
            [$tournamentId]
        );
        return array_map(fn($r) => new static($r), $rows);
    }
    public ?int $tournament_id = null;
    public ?string $round = null;
    public ?int $player1_id = null;
    public ?int $player2_id = null;
    public ?int $winner_player_id = null;
    public ?string $score = null;
    public ?int $next_match_id = null;

    public function save(): void {
        parent::save();

        if ($this->winner_player_id !== null) {
            // Se c'è un match successivo, sposta il vincitore
            if ($this->next_match_id !== null) {
                $this->promoteWinner();
            }
            // Se è la finale, chiudi il torneo
            if (strtolower($this->round) === 'final') {
                $this->closeTournament();
            }
        }
    }

    private function promoteWinner(): void {
        $next = self::find($this->next_match_id);
        if ($next) {
            if ($next->player1_id === null) {
                $next->player1_id = $this->winner_player_id;
            } elseif ($next->player2_id === null && $next->player1_id != $this->winner_player_id) {
                $next->player2_id = $this->winner_player_id;
            }
            $next->save();
        }
    }

    private function closeTournament(): void {
        $t = Tournament::find($this->tournament_id);
        if ($t) {
            $t->status = 'finished';
            $t->winner_player_id = $this->winner_player_id;
            $t->save();
        }
    }
}