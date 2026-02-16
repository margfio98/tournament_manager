import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTournament } from '../api/tournaments';
import { updateMatch } from '../api/matches';
import { listPlayers } from '../api/players';
import BracketRound from '../components/BracketRound';
import Toast from '../components/Toast';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function TournamentDetailPage() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [matches, setMatches] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const load = () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([getTournament(id), listPlayers()])
      .then(([tData, pData]) => {
        setTournament(tData);
        setMatches(Array.isArray(tData?.matches) ? tData.matches : []);
        setPlayers(Array.isArray(pData) ? pData : []);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
        setToast({ message: msg, type: 'error' });
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  const handleSaveMatch = (matchId, data) => {
    return updateMatch(matchId, data).then(() => {
      setToast({ message: 'Risultato salvato. Vincitore promosso.', type: 'success' });
      load();
    }).catch((err) => {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      setToast({ message: msg, type: 'error' });
    });
  };

  const playerMap = Object.fromEntries(players.map((p) => [p.id, p]));

  const byRound = matches.reduce((acc, m) => {
    const r = m.round || 'Round';
    (acc[r] = acc[r] || []).push(m);
    return acc;
  }, {});

  if (loading && !tournament) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-amber-500" size={40} />
        <p className="text-slate-400">Caricamento…</p>
      </div>
    );
  }

  if (error && !tournament) {
    return (
      <div className="space-y-6">
        <Link to="/tournaments" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition">
          <ArrowLeft size={18} /> Torna ai tornei
        </Link>
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-200">
          <p>{error}</p>
          <button
            onClick={load}
            className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  if (!tournament) return null;

  return (
    <div className="space-y-6">
      <Link
        to="/tournaments"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition"
      >
        <ArrowLeft size={18} /> Torna ai tornei
      </Link>

      <h1 className="text-2xl font-bold text-slate-200">{tournament.name}</h1>
      <p className="text-slate-400">
        {tournament.start_date || '-'} · {tournament.location || '-'} · Stato: {tournament.status}
      </p>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-200">
          <p>{error}</p>
          <button
            onClick={load}
            className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition"
          >
            Riprova
          </button>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="space-y-8">
        {Object.entries(byRound).map(([roundName, roundMatches]) => (
          <BracketRound
            key={roundName}
            roundName={roundName}
            matches={roundMatches}
            playerMap={playerMap}
            onSaveMatch={handleSaveMatch}
          />
        ))}
      </div>

      {matches.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-400">Nessuna partita in questo torneo.</p>
        </div>
      )}
    </div>
  );
}
