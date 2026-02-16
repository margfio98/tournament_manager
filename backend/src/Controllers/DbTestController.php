<?php
namespace App\Controllers;

use App\Database\DB;
use App\Utils\Response;

/**
 * Controller per test connessione database (SELECT 1)
 */
final class DbTestController {
    public function index(): void {
        try {
            DB::select('SELECT 1');
            Response::success(['status' => 'ok', 'message' => 'Connessione MySQL attiva'])->send();
        } catch (\Throwable $e) {
            Response::error('Errore connessione DB: ' . $e->getMessage(), 500)->send();
        }
    }
}
