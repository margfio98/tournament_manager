<?php
namespace App\Utils;

final class Request {
    /** @var array|null */
    private ?array $jsonBody = null;

    public function json(): array {
        if ($this->jsonBody === null) {
            $raw = file_get_contents('php://input');
            $decoded = json_decode($raw ?: '{}', true);
            $this->jsonBody = is_array($decoded) ? $decoded : [];
        }
        return $this->jsonBody;
    }
}
