<?php
namespace App\Controllers;

use App\Models\MatchModel;
use App\Models\Tournament;
use App\Utils\Response;
use App\Utils\Request;

final class MatchController
{
    public function index(): void
    {
        $tournamentId = isset($_GET['tournament_id']) ? (int)$_GET['tournament_id'] : null;
        $matches = $tournamentId
            ? MatchModel::byTournament($tournamentId)
            : MatchModel::all();
        Response::success(array_map(fn($m) => $m->toArray(), $matches))->send();
    }

    public function show(int $id): void
    {
        $match = MatchModel::find($id);
        if (!$match) {
            Response::error("Match non trovato", 404)->send();
        }
        Response::success($match->toArray())->send();
    }

    public function store(): void
    {
        $data = (new Request())->json();

        if (empty($data['tournament_id'])) {
            Response::error("tournament_id obbligatorio", 400)->send();
        }

        $tournament = Tournament::find((int)$data['tournament_id']);
        if (!$tournament) {
            Response::error("Torneo non trovato", 404)->send();
        }

        $match = new MatchModel([
            'tournament_id' => (int)$data['tournament_id'],
            'round' => $data['round'] ?? 'Round 1',
            'player1_id' => isset($data['player1_id']) ? (int)$data['player1_id'] : null,
            'player2_id' => isset($data['player2_id']) ? (int)$data['player2_id'] : null,
            'winner_player_id' => isset($data['winner_player_id']) ? (int)$data['winner_player_id'] : null,
            'score' => $data['score'] ?? null,
            'next_match_id' => isset($data['next_match_id']) ? (int)$data['next_match_id'] : null,
        ]);
        $match->save();

        Response::success($match->toArray(), 201)->send();
    }

    public function byTournament(int $tournamentId): void
    {
        $matches = MatchModel::byTournament($tournamentId);
        Response::success(array_map(fn($m) => $m->toArray(), $matches))->send();
    }

    public function update(int $id): void
    {
        $match = MatchModel::find($id);
        if (!$match) {
            Response::error("Match non trovato", 404)->send();
        }
        $data = (new Request())->json();
        $intKeys = ['player1_id', 'player2_id', 'winner_player_id', 'next_match_id'];
        $strKeys = ['round', 'score'];
        foreach ($intKeys as $key) {
            if (array_key_exists($key, $data)) {
                $match->$key = ($data[$key] !== null && $data[$key] !== '') ? (int)$data[$key] : null;
            }
        }
        foreach ($strKeys as $key) {
            if (array_key_exists($key, $data)) {
                $match->$key = $data[$key] !== null ? (string)$data[$key] : null;
            }
        }
        $match->save();

        Response::success($match->toArray())->send();
    }

    public function delete(int $id): void
    {
        $match = MatchModel::find($id);
        if (!$match) {
            Response::error("Match non trovato", 404)->send();
        }
        \App\Database\DB::execute("UPDATE matches SET next_match_id = NULL WHERE next_match_id = ?", [$id]);
        \App\Database\DB::execute("DELETE FROM matches WHERE id = ?", [$id]);
        Response::success(["message" => "Match eliminato"])->send();
    }
}