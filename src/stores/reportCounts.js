import { defineStore } from 'pinia'
import { fetchReportCounts } from '@/utils/supabase';

export const useReportCountsStore = defineStore('reportCounts', {
  state: () => ({
    total: 0,
    dogs: 0,
    cats: 0,
    loading: false,
  }),

  actions: {
    async loadReportCounts() {
      this.loading = true; // Start loading state
      try {
        const counts = await fetchReportCounts();

        // Ensure valid data before assigning
        this.total = counts?.total || 0;
        this.dogs = counts?.dogs || 0;
        this.cats = counts?.cats || 0;

        console.log('Report counts loaded:', { total: this.total, dogs: this.dogs, cats: this.cats });
      } catch (error) {
        console.error('Failed to load report counts:', error.message || error);
      } finally {
        this.loading = false; // End loading state
      }
    },
  },
});
