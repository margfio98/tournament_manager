import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listTournaments, createTournament } from '../api/tournaments';
import { listPlayers } from '../api/players';
import TournamentFormModal from '../components/TournamentFormModal';
import Toast from '../components/Toast';
import { Plus, Loader2 } from 'lucide-react';

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    Promise.all([listTournaments(), listPlayers()])
      .then(([tData, pData]) => {
        setTournaments(Array.isArray(tData) ? tData : []);
        setPlayers(Array.isArray(pData) ? pData : []);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
        setToast({ message: msg, type: 'error' });
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreate = (form) => {
    return createTournament(form).then(() => {
      setToast({ message: 'Torneo creato con tabellone generato.', type: 'success' });
      setShowModal(false);
      load();
    }).catch((err) => {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      setToast({ message: msg, type: 'error' });
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-amber-500" size={40} />
        <p className="text-slate-400">Caricamento…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-200">Tornei</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-slate-900 font-medium rounded-lg transition"
        >
          <Plus size={18} /> Nuovo torneo
        </button>
      </div>

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

      {showModal && (
        <TournamentFormModal
          players={players}
          onCreate={handleCreate}
          onClose={() => setShowModal(false)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        {tournaments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400 mb-4">Nessun torneo. Creane uno per iniziare.</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-slate-900 font-medium rounded-lg transition"
            >
              Crea torneo
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-700">
            {tournaments.map((t) => (
              <li key={t.id} className="flex items-center justify-between p-4 hover:bg-slate-700/50">
                <div>
                  <p className="font-medium text-slate-200">{t.name}</p>
                  <p className="text-sm text-slate-400">
                    {t.start_date || '-'} · {t.location || '-'} · {t.status}
                  </p>
                </div>
                <Link
                  to={`/tournaments/${t.id}`}
                  className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-slate-900 font-medium rounded-lg transition"
                >
                  Apri
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
