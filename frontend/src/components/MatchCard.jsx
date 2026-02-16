import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function MatchCard({ match, playerMap, onSave }) {
  const [score, setScore] = useState(match.score ?? '');
  // const [winnerId, setWinnerId] = useState(match.winner_player_id ?? '');

  useEffect(() => {
    setScore(match.score ?? '');
    // setWinnerId(match.winner_player_id ?? '');
  }, [match.id, match.score, match.winner_player_id]);
  const [loading, setLoading] = useState(false);

  const getPlayerName = (playerId) => {
    if (!playerId) return '-';
    const p = playerMap[playerId];
    return p ? `${p.first_name} ${p.last_name}` : `ID ${playerId}`;
  };

  const hasBoth = match.player1_id && match.player2_id;
  const isFinished = match.winner_player_id != null;

  const handleSave = (e) => {
  e.preventDefault();
  if (loading) return;

  const s = score.trim();
  if (!s) return;

  setLoading(true);
  Promise.resolve(onSave(match.id, { score: s }))
    .finally(() => setLoading(false));
};

  return (
    <div
      className={`rounded-xl border p-4 ${
        isFinished ? 'bg-emerald-900/20 border-emerald-700' : hasBoth ? 'bg-slate-800 border-slate-600' : 'bg-slate-800/50 border-slate-700'
      }`}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 text-sm">Match #{match.id}</span>
          {isFinished && <span className="text-emerald-400 text-sm">Concluso</span>}
        </div>
        <div className="text-slate-200">
          <p>{getPlayerName(match.player1_id)}</p>
          <p className="text-slate-400">vs</p>
          <p>{getPlayerName(match.player2_id)}</p>
        </div>
        {match.score && <p className="text-amber-400 font-medium">Punteggio: {match.score}</p>}
        {isFinished && match.winner_player_id && (
          <p className="text-emerald-400 text-sm">Vincitore: {getPlayerName(match.winner_player_id)}</p>
        )}
        {hasBoth && !isFinished && (
          <form onSubmit={handleSave} className="pt-2 space-y-2">
            <div>
              <label className="block text-xs text-slate-400 mb-0.5">Punteggio</label>
              <input
                type="text"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="es. 6-4 6-3"
                className="w-full px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm"
              />
              <button
              type="submit"
              disabled={loading || !score.trim()}
              className="w-full px-3 py-2 bg-violet-500 hover:bg-violet-600 disabled:opacity-50 text-slate-900 text-sm font-medium rounded transition"
            >
              {loading ? <Loader2 className="animate-spin inline" size={14} /> : 'Salva'}
            </button>
            </div>
            
              {/* <div> 
              <label className="block text-xs text-slate-400 mb-0.5">Vincitore</label>
              <select
                value={winnerId}
                onChange={(e) => setWinnerId(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm"
              >
                <option value="">-- Seleziona --</option>
                <option value={match.player1_id}>{getPlayerName(match.player1_id)}</option>
                <option value={match.player2_id}>{getPlayerName(match.player2_id)}</option>
              </select>
            </div> */}
            
          </form>
        )}
        {!hasBoth && <p className="text-slate-500 text-sm">In attesa avversari</p>}
      </div>
    </div>
  );
}
