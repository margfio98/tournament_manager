# Tournament Manager - Frontend

React + Vite + Tailwind per la gestione tornei tennis.

## Prerequisiti

- Node.js 18+
- Backend PHP attivo su `http://localhost:8000/api`

## Avvio

```bash
npm install
npm run dev
```

Il frontend sarà disponibile su `http://localhost:5173`.

## Avvio Backend (necessario prima del frontend)

```bash
cd backend
php -S localhost:8000 -t public public/index.php
```

## Pagine

| Rotta | Pagina | Descrizione |
|-------|--------|-------------|
| `/` | Redirect | Reindirizza a `/dashboard` |
| `/dashboard` | Dashboard | Tornei con status `finished` e winner_name |
| `/players` | Partecipanti | Lista, crea, modifica, elimina giocatori |
| `/tournaments` | Tornei | Lista tornei, creazione con name, data, location, player_ids |
| `/tournaments/:id` | Dettaglio torneo | Info torneo, bracket (matches per round), update risultati |

## Bracket

Il bracket è mostrato come **elenco per round** (non grafico ad albero). Ogni match permette:
- Input punteggio
- Selezione vincitore
- Salvataggio → PUT `/matches/:id` con `{ score, winner_player_id }`

## Note tecniche

- **baseURL API**: `http://localhost:8000/api` (configurato in `src/api/api.js`)
- **Interceptor**: estrae `res.data.data` dalle risposte `{ success, data }`
- **Status torneo**: `created`, `ongoing`, `finished`
- **Toast**: feedback per creazione, eliminazione, update match, errori API
