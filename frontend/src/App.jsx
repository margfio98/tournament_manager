import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';

import PlayersPage from './pages/PlayersPage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-200">

        {/* menu */}
        <nav className="bg-zinc-900 border-b border-zinc-800 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-3 flex gap-3">
            <NavLink to="/dashboard"
              className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all
              ${isActive
                ? "bg-violet-500 text-black font-violet"
                : "hover:bg-zinc-800 text-zinc-400"}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink to="/players"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all
                ${isActive
                  ? "bg-violet-500 text-black font-violet"
                  : "hover:bg-zinc-800 text-zinc-400"}`
                }
              >
                Giocatori
              </NavLink>
            <NavLink to="/tournaments"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all
                ${isActive
                  ? "bg-violet-500 text-black font-violet"
                  : "hover:bg-zinc-800 text-zinc-400"}`
                }
              >
                Tornei
              </NavLink>
          </div>
        </nav>

        {/* pag */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;

