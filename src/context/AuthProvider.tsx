import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export type Role = 'client' | 'advisor' | 'admin';

interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role: Role;
  facebook_id?: string | null;
  messenger_id?: string | null;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (params: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: Role;
  }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return data as UserProfile | null;
  };

  useEffect(() => {
    const setup = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        let profileData = await fetchProfile(currentUser.id);
        if (!profileData) {
          const facebookIdentity = currentUser.identities?.find(
            (i) => i.provider === 'facebook',
          );
          const facebookId =
            (facebookIdentity?.identity_data as any)?.id ||
            (facebookIdentity?.identity_data as any)?.sub ||
            null;
          const messengerId =
            (currentUser.user_metadata as any)?.messenger_id || null;
          const role =
            ((currentUser.user_metadata as any)?.role as Role) || 'client';
          const { data } = await supabase
            .from('users')
            .insert({
              id: currentUser.id,
              email: currentUser.email,
              first_name: (currentUser.user_metadata as any)?.first_name,
              last_name: (currentUser.user_metadata as any)?.last_name,
              facebook_id: facebookId,
              messenger_id: messengerId,
              role,
            })
            .select()
            .single();
          profileData = data as UserProfile;
        }
        setProfile(profileData);
      }
      setLoading(false);
    };
    setup();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const profileData = await fetchProfile(currentUser.id);
        setProfile(profileData);
      } else {
        setProfile(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error: error.message };
    }
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();
    if (currentUser) {
      const profileData = await fetchProfile(currentUser.id);
      setProfile(profileData);
    }
    return {};
  };

  const signUp = async ({
    email,
    password,
    firstName,
    lastName,
    role = 'client',
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: Role;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { first_name: firstName, last_name: lastName, role } },
    });
    if (error || !data.user) {
      return { error: error?.message || 'Unable to sign up' };
    }
    await supabase.from('users').insert({
      id: data.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      role,
    });
    setUser(data.user);
    setProfile({
      id: data.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      role,
    });
    return {};
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const signInWithFacebook = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'facebook' });
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signIn, signUp, signOut, signInWithFacebook }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
};

export default AuthProvider;
