-- Tournament Manager - Schema Database
-- MySQL / MariaDB

CREATE DATABASE IF NOT EXISTS tournament_manager
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE tournament_manager;

-- PK = id su tutte le tabelle; FK: tournament_id, player_id, player1_id, player2_id, winner_player_id, next_match_id

-- Tabella giocatori/partecipanti (anagrafica)
CREATE TABLE IF NOT EXISTS players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  country VARCHAR(3) DEFAULT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabella tornei
CREATE TABLE IF NOT EXISTS tournaments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  status ENUM('created', 'ongoing', 'finished') DEFAULT 'created',
  winner_player_id INT DEFAULT NULL,
  start_date DATE DEFAULT NULL,
  location VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (winner_player_id) REFERENCES players(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabella partite (bracket)
CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tournament_id INT NOT NULL,
  round VARCHAR(50) NOT NULL,
  player1_id INT DEFAULT NULL,
  player2_id INT DEFAULT NULL,
  winner_player_id INT DEFAULT NULL,
  score VARCHAR(50) DEFAULT NULL,
  next_match_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  FOREIGN KEY (player1_id) REFERENCES players(id) ON DELETE SET NULL,
  FOREIGN KEY (player2_id) REFERENCES players(id) ON DELETE SET NULL,
  FOREIGN KEY (winner_player_id) REFERENCES players(id) ON DELETE SET NULL,
  FOREIGN KEY (next_match_id) REFERENCES matches(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Partecipanti per torneo
CREATE TABLE IF NOT EXISTS tournament_participants (
  tournament_id INT NOT NULL,
  player_id INT NOT NULL,
  PRIMARY KEY (tournament_id, player_id),
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB;
