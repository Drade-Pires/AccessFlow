import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { createUser, deleteUser, getUsers, updateUser } from "../services/users";

export function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    roleId: ""
  });

  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers();
      setUsers(data);
    }

    loadUsers();
  }, []);

  function handleEdit(user) {
    setSelectedUser(user);
  }

  function handleCloseEditModal() {
    setSelectedUser(null);
  }

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
      roleId: ""
    });
  }

  async function handleSaveUser() {
    const updatedUser = await updateUser(selectedUser.id, {
      name: selectedUser.name,
      email: selectedUser.email,
      active: selectedUser.active,
      roleId: selectedUser.roleId
    });

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );

    setSelectedUser(null);
  }

  async function handleCreateUser() {
    const createdUser = await createUser(newUser);

    setUsers((prevUsers) => [createdUser, ...prevUsers]);
    handleCloseCreateModal();
  }

  async function handleDeleteUser(userId) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );

    if (!confirmDelete) return;

    await deleteUser(userId);

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  }

  const roles = users.reduce((acc, user) => {
    if (user.role && !acc.some((role) => role.id === user.role.id)) {
      acc.push(user.role);
    }

    return acc;
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#020617] text-white">
      <Sidebar />

      <main className="min-h-screen w-full bg-[#020617] p-6 lg:pl-80">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">Usuários</h1>

          <button
            onClick={handleOpenCreateModal}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-700"
          >
            + Novo Usuário
          </button>
        </div>

        <div className="mt-10 w-full overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Perfil</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-800">
                  <td className="px-6 py-5">{user.name}</td>
                  <td className="px-6 py-5 text-slate-300">{user.email}</td>
                  <td className="px-6 py-5 text-slate-300">{user.role?.name}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.active
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {user.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-700"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h2 className="text-2xl font-bold">Editar usuário</h2>

              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                />

                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                />

                <select
                  value={selectedUser.active ? "active" : "inactive"}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      active: e.target.value === "active"
                    })
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={handleCloseEditModal}>Cancelar</button>
                <button onClick={handleSaveUser} className="rounded-lg bg-blue-600 px-4 py-2">
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <h2 className="text-2xl font-bold">Novo usuário</h2>

              <div className="mt-6 space-y-4">
                <input
                  placeholder="Nome"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                />

                <input
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                />

                <input
                  placeholder="Senha"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                />

                <select
                  value={newUser.roleId}
                  onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3"
                >
                  <option value="">Selecione um perfil</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={handleCloseCreateModal}>Cancelar</button>
                <button onClick={handleCreateUser} className="rounded-lg bg-blue-600 px-4 py-2">
                  Criar usuário
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}