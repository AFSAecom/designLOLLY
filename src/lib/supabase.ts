import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://lftouuybkowdqimpgrnr.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmdG91dXlia293ZHFpbXBncm5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwOTYzMzMsImV4cCI6MjA2OTY3MjMzM30.TFTdCZA9Ej8wpCTx5q0QS88qLAk_aKavdAiVLiwkPFM';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
