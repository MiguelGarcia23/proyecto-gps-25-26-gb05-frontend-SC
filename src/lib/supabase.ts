import { createClient } from '@supabase/supabase-js';

const supabaseProjectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseProjectUrl, supabaseApiKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
		flowType: 'pkce',
	},
});
