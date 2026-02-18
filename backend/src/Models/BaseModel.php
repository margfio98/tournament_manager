<?php
namespace App\Models;
use App\Database\DB;

abstract class BaseModel {
    public ?int $id = null;
    protected static string $table;
    protected static string $primaryKey = 'id';

    public function __construct(array $data = []) { $this->fill($data); }

    public function fill(array $data): static {
        foreach ($data as $k => $v) { if (property_exists($this, $k)) $this->$k = $v; }
        return $this;
    }
// static:: x mod riutilizzabile da altri mod figlio (classe che loc hiama) 
    // self:: classe corrente; static:: classe che chisma il metodfo; //new static:: crae ogg classe figlia
    
    public static function all(): array {
        $pk = static::$primaryKey ?? 'id';
        $rows = DB::select("SELECT * FROM " . static::$table . " ORDER BY `$pk` DESC");
        return array_map(fn($r) => new static($r), $rows); 
    }

    public static function find(int $id): ?static {
        $pk = static::$primaryKey ?? 'id';
        $rows = DB::select("SELECT * FROM " . static::$table . " WHERE `$pk` = ?", [$id]);
        return !empty($rows) ? new static($rows[0]) : null;
    }

    public function toArray(): array { 
        return get_object_vars($this); 
    }

    public function save(): void {
        $data = $this->toArray();
        unset($data['id']);
        if ($this->id === null) {
            $cols = implode(',', array_keys($data));
            $pals = implode(',', array_fill(0, count($data), '?'));
            $this->id = DB::insert("INSERT INTO " . static::$table . " ($cols) VALUES ($pals)", array_values($data));
        } else {
            $pk = static::$primaryKey ?? 'id';
            $sets = implode('=?,', array_keys($data)) . '=?';
            $vals = array_values($data);
            $vals[] = $this->id;
            DB::execute("UPDATE " . static::$table . " SET $sets WHERE `$pk` = ?", $vals);
        }
    }
}