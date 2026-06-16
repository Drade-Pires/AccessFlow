import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/api";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await loginRequest(email, password);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");

      console.log(data);
    } catch (error) {
  console.error(error);
  alert(error.message);
}
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px"
        }}
      >
        <h1>AccessFlow</h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}