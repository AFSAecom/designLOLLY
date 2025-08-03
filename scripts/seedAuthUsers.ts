import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    id: '9972d0f5-68f7-4222-bccf-78ef5ef3ea84',
    email: 'client@lolly.tn',
    password: 'taftoufa',
    email_confirm: true,
    user_metadata: {
      first_name: 'Leila',
      last_name: 'Lclient',
      role: 'client',
    },
  });

  if (error) {
    console.error('Error creating auth user:', error);
    process.exit(1);
  }

  console.log('Created auth user:', data.user?.id);
}

main();
