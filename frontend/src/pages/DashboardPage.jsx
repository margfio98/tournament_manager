import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listTournaments } from '../api/tournaments';
import { Trophy, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    listTournaments()
      .then((data) => setTournaments(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const finished = tournaments.filter((t) => t.status === 'finished');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-amber-500" size={40} />
        <p className="text-slate-400">Caricamento…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-200">Dashboard</h1>
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

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Trophy className="text-violet-500" size={40} />
        <h1 className="text-3xl font-bold text-slate-200">Tournament Manager</h1>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Tornei conclusi</h2>
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          {finished.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400 mb-4">Nessun torneo concluso.</p>
              <Link
                to="/tournaments"
                className="inline-block px-4 py-2 bg-violet-500 hover:bg-violet-600 text-slate-900 font-medium rounded-lg transition"
              >
                Vai ai tornei
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-700">
              {finished.map((t) => (
                <li key={t.id} className="flex items-center justify-between p-4 hover:bg-slate-700/50">
                  <div>
                    <p className="font-medium text-slate-200">{t.name}</p>
                    <p className="text-sm text-slate-400">
                      {t.location || '-'} · {t.start_date || '-'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-violet-600">
                      Vincitore: {t.winner_name || `ID ${t.winner_player_id}`}
                    </span>
                    <Link
                      to={`/tournaments/${t.id}`}
                      className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-slate-900 font-medium rounded-lg transition"
                    >
                      Dettaglio
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
