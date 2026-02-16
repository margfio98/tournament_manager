# Tournament Manager

Web application per la gestione di tornei sportivi a eliminazione diretta. 

## Stack Tecnologico

- **Backend**: PHP 8+ (OOP), API REST JSON, MySQL/MariaDB
- **Frontend**: React, Vite, Tailwind CSS, Axios
- **Router**: SimpleRouter (Pecee)

## Requisiti

- PHP 8.2+
- MySQL
- Node.js 18+
- Composer

L'API sarà disponibile su `http://localhost:8000/api`.

**Test connessione DB**: `GET http://localhost:8000/api/db-test`

Il frontend sarà disponibile su `http://localhost:5173`.

## Struttura progetto

```
tournament_manager/
├── backend/
│   ├── config/          # Configurazione (database, ecc.)
│   ├── database/        # Schema SQL
│   ├── public/          # Entry point (index.php)
│   ├── routes/          # Definizione rotte API
│   └── src/
│       ├── Controllers/
│       ├── Database/    # Classe DB (PDO)
│       ├── Models/
│       ├── Services/    # BracketService (generazione tabellone)
│       └── Utils/
├── frontend/
│   └── src/
│       ├── pages/
│       └── api.js       # Client axios
└── database/
    └── schema.sql
```

## API Endpoints

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/db-test` | Test connessione database |
| GET | `/api/players` | Lista partecipanti |
| GET | `/api/players/{id}` | Dettaglio partecipante |
| POST | `/api/players` | Crea partecipante |
| PUT | `/api/players/{id}` | Modifica partecipante |
| DELETE | `/api/players/{id}` | Elimina partecipante |
| GET | `/api/tournaments` | Lista tornei |
| GET | `/api/tournaments/{id}` | Dettaglio torneo |
| POST | `/api/tournaments` | Crea torneo (con selezione partecipanti e generazione bracket) |
| GET | `/api/matches` | Lista partite (opzionale: `?tournament_id=X`) |
| GET | `/api/matches/tournament/{id}` | Partite per torneo |
| PUT | `/api/matches/{id}` | Aggiorna risultato (winner_player_id, score) |

## Funzionalità principali

1. **Gestione Partecipanti**: CRUD completo (crea, modifica, elimina)
2. **Creazione Torneo**: Nome, data, luogo, selezione partecipanti (4, 8 o 16 consigliati)
3. **Generazione Bracket**: Tabellone generato automaticamente con accoppiamenti casuali
4. **Gestione Risultati**: Inserimento vincitore per ogni partita; avanzamento automatico alla partita successiva
5. **Chiusura Torneo**: Quando viene inserito il risultato della finale, il torneo viene marcato come concluso
