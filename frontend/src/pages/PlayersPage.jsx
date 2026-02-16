import { useEffect, useState } from 'react';
import { listPlayers, createPlayer, updatePlayer, deletePlayer } from '../api/players';
import PlayerFormModal from '../components/PlayerFormModal';
import Toast from '../components/Toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    listPlayers()
      .then((data) => setPlayers(Array.isArray(data) ? data : []))
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
        setToast({ message: msg, type: 'error' });
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = (data) => {
    const promise = modalPlayer ? updatePlayer(modalPlayer.id, data) : createPlayer(data);
    return promise
      .then(() => {
        setToast({ message: modalPlayer ? 'Partecipante aggiornato.' : 'Partecipante creato.', type: 'success' });
        setModalPlayer(null);
        load();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
        setToast({ message: msg, type: 'error' });
      });
  };

  const handleDelete = (id) => {
    if (!confirm('Eliminare questo partecipante?')) return;
    deletePlayer(id)
      .then(() => {
        setToast({ message: 'Partecipante eliminato.', type: 'success' });
        load();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
        setToast({ message: msg, type: 'error' });
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-200">Partecipanti</h1>
        <button
          onClick={() => setModalPlayer(undefined)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-slate-900 font-medium rounded-lg transition"
        >
          <Plus size={18} /> Nuovo
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-200" role="alert">
          <p>{error}</p>
          <button
            onClick={load}
            className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition"
          >
            Riprova
          </button>
        </div>
      )}

      {modalPlayer !== null && (
        <PlayerFormModal
          player={modalPlayer}
          onSave={handleSave}
          onClose={() => setModalPlayer(null)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="animate-spin text-violet-500" size={36} />
            <p className="text-slate-400">Caricamento…</p>
          </div>
        ) : players.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-400 mb-4">Nessun partecipante. Aggiungi il primo.</p>
            <button
              onClick={() => setModalPlayer(undefined)}
              className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-slate-900 font-medium rounded-lg transition"
            >
              Aggiungi giocatore
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Nome</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Cognome</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Paese</th>
                <th className="w-24 py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 px-4 text-slate-200">{p.first_name}</td>
                  <td className="py-3 px-4 text-slate-200">{p.last_name}</td>
                  <td className="py-3 px-4 text-slate-400">{p.country || '-'}</td>
                  <td className="py-3 px-4 flex gap-1">
                    <button
                      onClick={() => setModalPlayer(p)}
                      className="p-2 text-slate-400 hover:text-violet-500 hover:bg-slate-700 rounded-lg transition"
                      title="Modifica"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-700 rounded-lg transition"
                      title="Elimina"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
