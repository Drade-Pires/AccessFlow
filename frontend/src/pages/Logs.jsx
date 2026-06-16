import { useEffect, useState } from "react";
import { getAccessLogs } from "../services/api";

export function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function loadLogs() {
      try {
        const data = await getAccessLogs();
        setLogs(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadLogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-white">
      <h1 className="text-3xl font-bold">Logs de acesso</h1>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="px-6 py-4">Usuário</th>
              <th className="px-6 py-4">Tipo</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Data</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-slate-800">
                <td className="px-6 py-4">{log.user?.name}</td>

                <td className="px-6 py-4 text-slate-300">{log.type}</td>

                <td className="px-6 py-4">
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

                <td className="px-6 py-4 text-slate-400">
                  {new Date(log.createdAt).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}