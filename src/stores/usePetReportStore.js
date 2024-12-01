import { defineStore } from 'pinia'
import { useSupabaseStore } from '@/stores/supabaseStore'

export const usePetReportStore = defineStore('petReport', {
  state: () => ({
    lostCats: 0,
    foundCats: 0,
    lostDogs: 0,
    foundDogs: 0
  }),
  actions: {
    async fetchPetReports() {
      const { fetchReports } = useSupabaseStore()

      try {
        const reports = await fetchReports()
        this.lostCats = reports.filter(
          (report) => report.pet_type === 'Cat' && report.report_type === 'Lost'
        ).length
        this.foundCats = reports.filter(
          (report) => report.pet_type === 'Cat' && report.report_type === 'Found'
        ).length
        this.lostDogs = reports.filter(
          (report) => report.pet_type === 'Dog' && report.report_type === 'Lost'
        ).length
        this.foundDogs = reports.filter(
          (report) => report.pet_type === 'Dog' && report.report_type === 'Found'
        ).length
      } catch (err) {
        console.error('Error fetching pet reports:', err.message)
      }
    }
  }
})
