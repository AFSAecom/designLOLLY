import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (authError || !data.user) {
      setError('Identifiants incorrects');
      return;
    }
    const { user } = data;
    const { data: profile, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    if (roleError || !profile?.role) {
      setError("Aucun rôle défini pour cet utilisateur");
      await supabase.auth.signOut();
      return;
    }
    switch (profile.role) {
      case 'client':
        navigate('/client');
        break;
      case 'advisor':
        navigate('/advisor');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        setError('Rôle inconnu');
        await supabase.auth.signOut();
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h1 className="text-2xl mb-4">Connexion</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;

