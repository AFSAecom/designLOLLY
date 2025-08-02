// This file should be generated via `npm run types:supabase` once the
// Supabase CLI is available in your environment. The Database interface
// reflects your Supabase schema and is used for typed queries.
// See package.json for the generation script.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  // Define your tables here or regenerate using the Supabase CLI
  public: Record<string, unknown>;
}
