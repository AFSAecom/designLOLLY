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
  error: string | null;
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
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) {
        if (error.code !== 'PGRST116') {
          setError(error.message);
          alert(error.message);
        }
        return null;
      }
      return data as UserProfile | null;
    } catch (err: any) {
      const message = err?.message || 'Unable to fetch profile';
      setError(message);
      alert(message);
      return null;
    }
  };

  useEffect(() => {
    const setup = async () => {
      setLoading(true);
      setError(null);
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) {
          setError(sessionError.message);
          alert(sessionError.message);
          setLoading(false);
          return;
        }
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
            const { data, error: insertError } = await supabase
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
            if (insertError || !data) {
              const message = insertError?.message || 'Unable to create profile';
              setError(message);
              alert(message);
              setLoading(false);
              return;
            }
            profileData = data as UserProfile;
          }
          setProfile(profileData);
        }
      } catch (err: any) {
        const message = err?.message || 'Unexpected error';
        setError(message);
        alert(message);
      } finally {
        setLoading(false);
      }
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
    setLoading(true);
    setError(null);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
        alert(signInError.message);
        return { error: signInError.message };
      }
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) {
        setError(userError.message);
        alert(userError.message);
        return { error: userError.message };
      }
      if (currentUser) {
        const profileData = await fetchProfile(currentUser.id);
        setProfile(profileData);
      }
      return {};
    } catch (err: any) {
      const message = err?.message || 'Unable to sign in';
      setError(message);
      alert(message);
      return { error: message };
    } finally {
      setLoading(false);
    }
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
    setLoading(true);
    setError(null);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { first_name: firstName, last_name: lastName, role } },
      });
      if (signUpError || !data.user) {
        const message = signUpError?.message || 'Unable to sign up';
        setError(message);
        alert(message);
        return { error: message };
      }
      const { error: insertError } = await supabase.from('users').insert({
        id: data.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        role,
      });
      if (insertError) {
        setError(insertError.message);
        alert(insertError.message);
        return { error: insertError.message };
      }
      setUser(data.user);
      setProfile({
        id: data.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        role,
      });
      return {};
    } catch (err: any) {
      const message = err?.message || 'Unable to sign up';
      setError(message);
      alert(message);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError(signOutError.message);
        alert(signOutError.message);
        return;
      }
      setUser(null);
      setProfile(null);
    } catch (err: any) {
      const message = err?.message || 'Unable to sign out';
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: fbError } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
      });
      if (fbError) {
        setError(fbError.message);
        alert(fbError.message);
      }
    } catch (err: any) {
      const message = err?.message || 'Unable to sign in with Facebook';
      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, error, signIn, signUp, signOut, signInWithFacebook }}
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
