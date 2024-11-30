import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
 export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// 👉 Check if the session exists and is valid; Return false if there's an error
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session:', error.message)
    return false
  }

  return !!data.session
}

// 👉 Form Action utils
export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSuccessMessage: ''
}

export async function fetchReportCounts() {
  try {
    // Fetch total count
    const { count: total, error: totalError } = await supabase
      .from('pet_reports')
      .select('*', { count: 'exact' });

    if (totalError) throw new Error(`Total Error: ${totalError.message}`);

    // Fetch dog count
    const { count: dogs, error: dogError } = await supabase
      .from('pet_reports')
      .select('*', { count: 'exact' })
      .ilike('pet_type', 'dog'); // Case-insensitive

    if (dogError) throw new Error(`Dog Error: ${dogError.message}`);

    // Fetch cat count
    const { count: cats, error: catError } = await supabase
      .from('pet_reports')
      .select('*', { count: 'exact' })
      .ilike('pet_type', 'cat'); // Case-insensitive

    if (catError) throw new Error(`Cat Error: ${catError.message}`);

    // Return all counts
    return {
      total: total || 0,
      dogs: dogs || 0,
      cats: cats || 0,
    };
  } catch (error) {
    console.error('Error fetching report counts:', error.message || error);
    return { total: 0, dogs: 0, cats: 0 }; // Fallback
  }
}
