import { useEffect, useState } from "react";
import { createUser, getUsers, updateUser } from "../services/users";

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
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
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
    try {
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
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar usuário");
    }
  }

  async function handleCreateUser() {
    try {
      const createdUser = await createUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        roleId: newUser.roleId
      });

      setUsers((prevUsers) => [createdUser, ...prevUsers]);
      handleCloseCreateModal();
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao criar usuário");
    }
  }

  const roles = users.reduce((acc, user) => {
    if (user.role && !acc.some((role) => role.id === user.role.id)) {
      acc.push(user.role);
    }

    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] p-8 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Usuários</h1>

        <button
          onClick={handleOpenCreateModal}
          className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold hover:bg-blue-700"
        >
          + Novo Usuário
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
        <table className="w-full text-left">
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
                <td className="px-6 py-4">{user.name}</td>

                <td className="px-6 py-4 text-slate-300">{user.email}</td>

                <td className="px-6 py-4 text-slate-300">
                  {user.role?.name}
                </td>

                <td className="px-6 py-4">
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

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-700"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h2 className="text-2xl font-bold">Editar usuário</h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-slate-400">Nome</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      name: e.target.value
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">Status</label>
                <select
                  value={selectedUser.active ? "active" : "inactive"}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      active: e.target.value === "active"
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseEditModal}
                className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
              >
                Cancelar
              </button>

              <button
                onClick={handleSaveUser}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <h2 className="text-2xl font-bold">Novo usuário</h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-slate-400">Nome</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      name: e.target.value
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      email: e.target.value
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">Senha</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      password: e.target.value
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400">Perfil</label>
                <select
                  value={newUser.roleId}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      roleId: e.target.value
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none"
                >
                  <option value="">Selecione um perfil</option>

                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCloseCreateModal}
                className="rounded-lg border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreateUser}
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700"
              >
                Criar usuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}