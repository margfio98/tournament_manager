import MatchCard from './MatchCard';

export default function BracketRound({ roundName, matches, playerMap, onSaveMatch }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-amber-500 mb-4">{roundName}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} playerMap={playerMap} onSave={onSaveMatch} />
        ))}
      </div>
    </section>
  );
}
