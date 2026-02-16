<?php
namespace App\Database;
use PDO, RuntimeException;

final class DB {
    private static ?PDO $pdo = null;

    public static function connection(): PDO {
        if (self::$pdo === null) {
            $cfg = require __DIR__ . '/../../config/database.php';
            $port = $cfg['port'] ?? 3306;
            $dsn = "mysql:host={$cfg['host']};port={$port};dbname={$cfg['database']};charset={$cfg['charset']}";
            self::$pdo = new PDO($dsn, $cfg['username'], $cfg['password'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
        }
        return self::$pdo;
    }

    public static function select($sql, $params = []) {
        $stmt = self::connection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function insert($sql, $params = []) {
        $stmt = self::connection()->prepare($sql);
        $stmt->execute($params);
        return (int)self::connection()->lastInsertId();
    }

    public static function execute($sql, $params = []) {
        $stmt = self::connection()->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }
}