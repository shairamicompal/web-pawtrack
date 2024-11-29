// src/stores/reports.js

import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useReportsStore = defineStore('reports', {
  state: () => ({
    reports: [],
  }),

  actions: {
    // Method to fetch all reports from Supabase
    async fetchReports() {
      const { data, error } = await supabase.from('pet_reports').select('*')
      if (error) {
        console.error('Error fetching reports:', error.message)
      } else {
        this.reports = data
      }
    },

    // Method to remove a report
    async removeReport(id, user_id, authStore) {
      if (authStore.userData?.id === user_id) {
        const { error } = await supabase.from('pet_reports').delete().eq('id', id)
        if (error) {
          console.error('Error removing report:', error.message)
        } else {
          this.reports = this.reports.filter((report) => report.id !== id)
        }
      } else {
        alert('You do not have permission to delete this report.')
      }
    },

    // Method to save changes to a report
    async saveReportChanges(updatedReport) {
      const { error } = await supabase
        .from('pet_reports')
        .update({
          description: updatedReport.description,
          contact_name: updatedReport.contact_name,
          contact_num: updatedReport.contact_num,
          contact_email: updatedReport.contact_email
        })
        .eq('id', updatedReport.id)

      if (error) {
        console.error('Error updating report:', error.message)
      } else {
        const index = this.reports.findIndex((r) => r.id === updatedReport.id)
        if (index !== -1) {
          this.reports[index] = updatedReport
        }
      }
    }
  }
})
