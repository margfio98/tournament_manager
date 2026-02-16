<?php
namespace App\Controllers;

use App\Models\Tournament;
use App\Services\BracketService;
use App\Utils\Response;
use App\Utils\Request;

final class TournamentController
{
    public function index(): void
    {
        $tournaments = array_map(function ($t) {
            $arr = $t->toArray();
            if (!empty($t->winner_player_id)) {
                $winner = \App\Models\Player::find($t->winner_player_id);
                $arr['winner_name'] = $winner ? $winner->getFullName() : null;
            }
            return $arr;
        }, Tournament::all());
        Response::success($tournaments)->send();
    }

    public function show(int $id): void
    {
        $tournament = Tournament::find($id);
        if (!$tournament) {
            Response::error("Torneo non trovato", 404)->send();
        }
        $out = $tournament->toArray();
        if (!empty($tournament->winner_player_id)) {
            $winner = \App\Models\Player::find($tournament->winner_player_id);
            $out['winner_name'] = $winner ? $winner->getFullName() : null;
        }
        $out['matches'] = array_map(fn($m) => $m->toArray(), \App\Models\MatchModel::byTournament($tournament->id));
        Response::success($out)->send();
    }

    public function store(): void
    {
        $data = (new Request())->json();

        if (empty($data['name'])) {
            Response::error("Il nome del torneo è obbligatorio", 400)->send();
        }

        $playerIds = $data['player_ids'] ?? [];
        if (empty($playerIds) || count($playerIds) < 2) {
            Response::error("Seleziona almeno 2 partecipanti (4, 8 o 16 consigliati)", 400)->send();
        }

        $tournament = new Tournament([
            'name' => $data['name'],
            'start_date' => $data['start_date'] ?? null,
            'location' => $data['location'] ?? null,
        ]);
        $tournament->status = 'ongoing';
        $tournament->save();

        foreach ($playerIds as $pid) {
            \App\Database\DB::execute(
                "INSERT INTO tournament_participants (tournament_id, player_id) VALUES (?, ?)",
                [$tournament->id, (int)$pid]
            );
        }

        try {
            BracketService::generate($tournament->id, array_map('intval', $playerIds));
        } catch (\InvalidArgumentException $e) {
            \App\Database\DB::execute("DELETE FROM tournament_participants WHERE tournament_id = ?", [$tournament->id]);
            \App\Database\DB::execute("DELETE FROM matches WHERE tournament_id = ?", [$tournament->id]);
            \App\Database\DB::execute("DELETE FROM tournaments WHERE id = ?", [$tournament->id]);
            Response::error($e->getMessage(), 400)->send();
        }

        $out = $tournament->toArray();
        $out['winner_name'] = null;
        $out['matches'] = array_map(fn($m) => $m->toArray(), \App\Models\MatchModel::byTournament($tournament->id));
        Response::success($out, 201)->send();
    }

    public function update(int $id): void
    {
        $tournament = Tournament::find($id);
        if (!$tournament) {
            Response::error("Torneo non trovato", 404)->send();
        }
        $data = (new Request())->json();
        $allowed = ['name', 'start_date', 'location', 'status'];
        foreach ($allowed as $key) {
            if (array_key_exists($key, $data)) {
                $tournament->$key = $data[$key];
            }
        }
        $tournament->save();
        $out = $tournament->toArray();
        if (!empty($tournament->winner_player_id)) {
            $winner = \App\Models\Player::find($tournament->winner_player_id);
            $out['winner_name'] = $winner ? $winner->getFullName() : null;
        }
        Response::success($out)->send();
    }

    public function delete(int $id): void
    {
        $tournament = Tournament::find($id);
        if (!$tournament) {
            Response::error("Torneo non trovato", 404)->send();
        }
        \App\Database\DB::execute("DELETE FROM tournament_participants WHERE tournament_id = ?", [$id]);
        \App\Database\DB::execute("DELETE FROM matches WHERE tournament_id = ?", [$id]);
        \App\Database\DB::execute("DELETE FROM tournaments WHERE id = ?", [$id]);
        Response::success(["message" => "Torneo eliminato"])->send();
    }
}