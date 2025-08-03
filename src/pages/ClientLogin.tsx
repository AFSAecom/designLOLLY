import { useState, useEffect } from "react";
import supabase from "../lib/supabase";


import { useNavigate } from "react-router-dom";

export default function ClientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
    const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;
    if (demoEmail) {
      setEmail(demoEmail);
    }
    if (demoPassword) {
      setPassword(demoPassword);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg("Email ou mot de passe incorrect");
      } else {
        navigate("/client/catalogue");
      }
    } catch (error) {
      setErrorMsg("Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </div>
  );
}
