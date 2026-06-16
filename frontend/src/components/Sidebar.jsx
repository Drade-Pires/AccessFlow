import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Usuários", path: "/users" },
    { label: "Logs", path: "/logs" },
    { label: "Permissões", path: "/permissions" }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 border-r border-slate-800 bg-slate-950 px-6 py-8">
      <h1 className="text-4xl font-bold tracking-tight">
        Access<span className="text-blue-500">Flow</span>
      </h1>

      <p className="mt-3 text-sm text-slate-500">
        Controle de acesso corporativo
      </p>

      <nav className="mt-12 space-y-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}