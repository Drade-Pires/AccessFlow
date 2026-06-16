const API_URL = import.meta.env.VITE_API_URL;

export async function loginRequest(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const text = await response.text();
  console.log("RESPOSTA DO BACKEND:", text);

  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || "Erro ao fazer login");
  }

  return data;
}

export async function getAccessLogs() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/access-logs`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar logs");
  }

  return data;
}