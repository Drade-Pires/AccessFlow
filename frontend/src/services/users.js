const API_URL = "http://localhost:3000";

export async function getUsers() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar usuários");
  }

  return data;
}

export async function updateUser(id, userData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao atualizar usuário");
  }

  return data;
}