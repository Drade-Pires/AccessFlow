import { useEffect, useState } from "react";
import { getAccessLogs } from "../services/api";
import { getDashboardStats } from "../services/dashboard";
import { Link } from "react-router-dom";

export function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalAccessLogs: 0,
    todayAccessLogs: 0
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const logsData = await getAccessLogs();
        const statsData = await getDashboardStats();

        setLogs(logsData);
        setStats(statsData);
      } catch (error) {
        console.error(error);
      }
    }

    loadDashboard();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-100">
      <aside className="fixed left-0 top-0 h-full w-72 border-r border-slate-800 bg-slate-950 px-6 py-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Access<span className="text-blue-500">Flow</span>
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Controle de acesso corporativo
        </p>

        <nav className="mt-12 space-y-3">
          <Link
            to="/dashboard"
            className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white shadow-lg shadow-blue-600/20"
          >
            Dashboard
          </Link>

          <Link
            to="/users"
            className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            Usuários
          </Link>

          <Link
            to="/logs"
            className="block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            Logs
          </Link>

          <button
            className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-400 transition hover:bg-slate-900 hover:text-white"
          >
            Permissões
          </button>
        </nav>
      </aside>

      <main className="ml-72 min-h-screen w-[calc(100%-18rem)] px-8 py-8">
        <header className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>

            <p className="mt-1 text-slate-400">
              Visão geral dos acessos, usuários e permissões.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold hover:bg-red-700"
          >
            Sair
          </button>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm text-slate-400">Total de usuários</p>

            <strong className="mt-3 block text-4xl">
              {stats.totalUsers}
            </strong>

            <span className="mt-3 block text-xs text-blue-400">
              Usuários cadastrados
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm text-slate-400">Usuários ativos</p>

            <strong className="mt-3 block text-4xl text-emerald-400">
              {stats.activeUsers}
            </strong>

            <span className="mt-3 block text-xs text-emerald-400">
              Usuários habilitados
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm text-slate-400">Total de logs</p>

            <strong className="mt-3 block text-4xl">
              {stats.totalAccessLogs}
            </strong>

            <span className="mt-3 block text-xs text-blue-400">
              Registros no sistema
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm text-slate-400">Logs de hoje</p>

            <strong className="mt-3 block text-4xl text-yellow-400">
              {stats.todayAccessLogs}
            </strong>

            <span className="mt-3 block text-xs text-yellow-400">
              Registros criados hoje
            </span>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Registros de acesso</h3>

            <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
              Ver todos
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-5 py-4">Usuário</th>
                  <th className="px-5 py-4">Tipo</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Data</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-t border-slate-800">
                    <td className="px-5 py-4 font-medium">
                      {log.user?.name}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {log.type}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          log.status === "PERMITIDO"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {new Date(log.createdAt).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}