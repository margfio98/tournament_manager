<?php
namespace App\Controllers;

use App\Models\Player;
use App\Utils\Response;
use App\Utils\Request;

final class PlayerController
{
    public function index(): void
    {
        $players = array_map(fn($p) => $p->toArray(), Player::all());
        Response::success($players)->send();
    }

    public function show(int $id): void
    {
        $player = Player::find($id);
        if (!$player) {
            Response::error("Giocatore non trovato", 404)->send();
        }
        Response::success($player->toArray())->send();
    }

    public function store(): void
    {
        $data = (new Request())->json();
        
        if (empty($data['first_name']) || empty($data['last_name'])) {
            Response::error("Nome e Cognome sono obbligatori", 400)->send();
        }

        $player = new Player($data);
        $player->save();
        
        Response::success($player->toArray(), 201)->send();
    }

    public function update(int $id): void
    {
        $player = Player::find($id);
        if (!$player) {
            Response::error("Giocatore non trovato", 404)->send();
        }
        $data = (new Request())->json();
        $player->fill($data)->save();
        Response::success($player->toArray())->send();
    }

    public function delete(int $id): void
    {
        $player = Player::find($id);
        if (!$player) {
            Response::error("Giocatore non trovato", 404)->send();
        }

        // vincolo non eliminare se ha giocato
        $partecipations = \App\Database\DB::select(
            "SELECT 1 FROM tournament_participants WHERE player_id = ? LIMIT 1",
            [$id]
        );
        if (!empty($partecipations)) {
            Response::error(
                "Impossibile eliminare: il partecipante ha già preso parte a tornei.",
                400
            )->send();
        }

        \App\Database\DB::execute("DELETE FROM players WHERE id = ?", [$id]);
        Response::success(["message" => "Giocatore eliminato"])->send();
    }
}