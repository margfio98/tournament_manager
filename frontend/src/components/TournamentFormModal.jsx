import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function TournamentFormModal({ players, onCreate, onClose }) {
  const [form, setForm] = useState({
    name: '',
    start_date: '',
    location: '',
    player_ids: [],
  });
  const [loading, setLoading] = useState(false);

  const togglePlayer = (id) => {
    setForm((f) => ({
      ...f,
      player_ids: f.player_ids.includes(id) ? f.player_ids.filter((x) => x !== id) : [...f.player_ids, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name?.trim()) return;
    if (form.player_ids.length < 2) return;
    setLoading(true);
    onCreate({
      name: form.name.trim(),
      start_date: form.start_date || null,
      location: form.location?.trim() || null,
      player_ids: form.player_ids,
    }).finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 overflow-y-auto py-8" onClick={onClose}>
      <div
        className="bg-slate-800 rounded-xl p-6 border border-slate-700 w-full max-w-lg my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-slate-200 mb-4">Nuovo torneo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Nome *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Data torneo</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Luogo</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="es. Palazzetto Roma"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Partecipanti (4, 8 o 16 consigliati) *</label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-700/50 rounded-lg">
              {players.map((p) => (
                <label
                  key={p.id}
                  className={`px-3 py-1.5 rounded-lg text-sm cursor-pointer transition ${
                    form.player_ids.includes(p.id) ? 'bg-violet-500 text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.player_ids.includes(p.id)}
                    onChange={() => togglePlayer(p.id)}
                    className="sr-only"
                  />
                  {p.first_name} {p.last_name}
                </label>
              ))}
            </div>
            <p className="text-slate-500 text-sm mt-1">Selezionati: {form.player_ids.length}</p>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={loading || !form.name?.trim() || form.player_ids.length < 2}
              className="px-4 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-slate-900 font-medium rounded-lg transition"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Crea torneo'}
            </button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition">
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
