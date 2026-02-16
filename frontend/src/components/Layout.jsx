import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Trophy, Users, Calendar, LayoutDashboard } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-4 flex-wrap">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isActive ? 'bg-violet-600 text-slate-900' : 'text-slate-300 hover:bg-violet-500 hover:text-white'
              }`
            }
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink
            to="/players"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isActive ? 'bg-violet-600 text-slate-900' : 'text-slate-300 hover:bg-violet-500 hover:text-white'
              }`
            }
          >
            <Users size={20} /> Partecipanti
          </NavLink>
          <NavLink
            to="/tournaments"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isActive ? 'bg-violet-600 text-slate-900' : 'text-slate-300 hover:bg-violet-600 hover:text-white'
              }`
            }
          >
            <Calendar size={20} /> Tornei
          </NavLink>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
