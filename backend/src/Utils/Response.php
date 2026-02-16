<?php
namespace App\Utils;

final class Response {
    private int $code;
    private array $payload;

    private function __construct(array $payload, int $code) {
        $this->payload = $payload;
        $this->code = $code;
    }

    public static function success($data, $code = 200): self {
        return new self(['success' => true, 'data' => $data], $code);
    }

    public static function error($msg, $code = 400): self {
        return new self(['success' => false, 'message' => $msg], $code);
    }

    public function send(): void {
        header('Content-Type: application/json');
        http_response_code($this->code);
        echo json_encode($this->payload);
        exit;
    }

    public static function handlePreflight(): void {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }
    }
}