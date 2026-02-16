import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PlayerFormModal({ player, onSave, onClose }) {
  const [form, setForm] = useState({
    first_name: player?.first_name ?? '',
    last_name: player?.last_name ?? '',
    country: player?.country ?? '',
  });

  useEffect(() => {
    setForm({
      first_name: player?.first_name ?? '',
      last_name: player?.last_name ?? '',
      country: player?.country ?? '',
    });
  }, [player]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = form.first_name?.trim();
    const lastName = form.last_name?.trim();
    if (!firstName || !lastName) return;
    setLoading(true);
    onSave({
      first_name: firstName,
      last_name: lastName,
      country: form.country?.trim() || null,
    }).finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40" onClick={onClose}>
      <div
        className="bg-slate-800 rounded-xl p-6 border border-slate-700 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-slate-200 mb-4">
          {player ? 'Modifica partecipante' : 'Nuovo partecipante'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Nome *</label>
            <input
              type="text"
              required
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Cognome *</label>
            <input
              type="text"
              required
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Paese</label>
            <input
              type="text"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="es. ITA"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={loading || !form.first_name?.trim() || !form.last_name?.trim()}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-600 disabled:opacity-50 text-slate-900 font-medium rounded-lg transition"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : 'Salva'}
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
