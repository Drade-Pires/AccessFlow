const API_URL = "http://localhost:3000";

export async function getDashboardStats() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/dashboard/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Erro ao buscar dashboard"
    );
  }

  return data;
}