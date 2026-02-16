-- Allineamento schema: PK = id su tutte le tabelle
-- Esegui se hai errori "Unknown column 'id'" (tabelle create con id_player, id_tournament, ecc.)

USE tournament_manager;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS tournament_participants;
DROP TABLE IF EXISTS tournament_players;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS tournaments;
DROP TABLE IF EXISTS players;

SET FOREIGN_KEY_CHECKS = 1;

-- Tabella players (PK = id)
CREATE TABLE players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  country VARCHAR(3) DEFAULT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabella tournaments (PK = id)
CREATE TABLE tournaments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  status ENUM('created', 'ongoing', 'finished') DEFAULT 'created',
  winner_player_id INT DEFAULT NULL,
  start_date DATE DEFAULT NULL,
  location VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (winner_player_id) REFERENCES players(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Tabella matches (PK = id, FK = tournament_id, player1_id, player2_id, winner_player_id, next_match_id)
CREATE TABLE matches (
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
CREATE TABLE tournament_participants (
  tournament_id INT NOT NULL,
  player_id INT NOT NULL,
  PRIMARY KEY (tournament_id, player_id),
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
) ENGINE=InnoDB;
