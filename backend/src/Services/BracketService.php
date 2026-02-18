<?php
namespace App\Services;

use App\Database\DB;
use App\Models\MatchModel;

/**
 * Genera tabellone a eliminazione diretta
 */
final class BracketService {
   
    // pl ^2
    public static function generate(int $tournamentId, array $playerIds): array {
        $n = count($playerIds);
        if ($n < 2 || ($n & ($n - 1)) !== 0) {
            throw new \InvalidArgumentException('Il numero di partecipanti deve essere 4, 8 o 16 (potenza di 2).');
        }
        // calcola num partite x pl
        $numRounds = (int)log($n, 2); // 4->2, 8->3
        $roundNames = self::buildRoundNames($numRounds);
        $matchesByRound = self::buildMatchStructure($numRounds);

        // Crea partite. finale prima x avere next_match_id
        $idMap = [];

        for ($r = $numRounds - 1; $r >= 0; $r--) {
            $roundName = $roundNames[$r];
            $count = $matchesByRound[$r];
            for ($s = 0; $s < $count; $s++) {
                $nextId = null;
                if ($r < $numRounds - 1) {
                    $nextSlot = (int)floor($s / 2);
                    $nextId = $idMap[$r + 1][$nextSlot] ?? null;
                }

                // ins matc db
                DB::execute(
                    "INSERT INTO matches (tournament_id, round, next_match_id) VALUES (?, ?, ?)",
                    [$tournamentId, $roundName, $nextId]
                );
                $matchId = (int)DB::connection()->lastInsertId();
                $idMap[$r] = $idMap[$r] ?? [];
                $idMap[$r][$s] = $matchId;
            }
        }

        // assegn pl random primo turno
        shuffle($playerIds);
        $firstRoundCount = $matchesByRound[0];
        for ($s = 0; $s < $firstRoundCount; $s++) {
            $p1 = $playerIds[$s * 2] ?? null;
            $p2 = $playerIds[$s * 2 + 1] ?? null;
            $matchId = $idMap[0][$s];
            DB::execute(
                "UPDATE matches SET player1_id = ?, player2_id = ? WHERE id = ?",
                [$p1, $p2, $matchId]
            );
        }

        return MatchModel::byTournament($tournamentId);
    }

    // etichette
    private static function buildRoundNames(int $numRounds): array {
        $names = [];
        for ($r = 0; $r < $numRounds; $r++) {
            $matchesInRound = (int)pow(2, $numRounds - 1 - $r);
            if ($matchesInRound === 1) {
                $names[] = 'Final';
            } elseif ($matchesInRound === 2) {
                $names[] = 'Semi-final';
            } else {
                $names[] = 'Round ' . ($r + 1);
            }
        }
        return $names;
    }

    // rit matc
    private static function buildMatchStructure(int $numRounds): array {
        $arr = [];
        for ($r = 0; $r < $numRounds; $r++) {
            $arr[$r] = (int)pow(2, $numRounds - 1 - $r);
        }
        return $arr;
    }
}
