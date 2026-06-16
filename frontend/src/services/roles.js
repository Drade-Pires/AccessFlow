const API_URL = import.meta.env.VITE_API_URL;

export async function getRoles() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/roles`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar perfis");
  }

  return data;
}