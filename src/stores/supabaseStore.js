// supabaseStore.js
import { supabase } from '@/utils/supabase';

export const useSupabaseStore = () => {
  // Fetch reports from the database
  const fetchReports = async () => {
    try {
      const { data: reports, error } = await supabase.from('pet_reports').select('*');
      if (error) throw new Error(error.message);
      return reports;
    } catch (err) {
      console.error('Error fetching reports:', err.message);
      throw err;
    }
  };

  // Upload image to Supabase Storage
  const uploadImage = async (file) => {
    const fileName = `reports/${file.name}`;

    try {
      const { data, error } = await supabase.storage.from('pawtrack').upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
      if (error) throw new Error(error.message);
      return data.path;
    } catch (err) {
      console.error('Error uploading image:', err.message);
      throw err;
    }
  };

  // Insert a new report into the database
  const insertReport = async (reportData) => {
    try {
      const { error } = await supabase.from('pet_reports').insert([reportData]);
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error('Error inserting report:', err.message);
      throw err;
    }
  };

  return {
    fetchReports,
    uploadImage,
    insertReport
  };
};
