// stores/mapFormStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapFormStore = defineStore('mapFormStore', () => {
  // Map and marker-related state
  const map = ref(null)
  const marker = ref(null)
  const isTrackingPause = ref(false)

  // Form data
  const formData = ref({
    report_type: '',
    pet_type: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    image_path: '',
    contact_name: '',
    contact_num: '',
    contact_email: '',
    latitude: 0,
    longitude: 0,
    user_id: null
  })

  const selectedFile = ref(null)

  // Toggle geolocation tracking
  const toggleTrackingPause = () => {
    isTrackingPause.value = !isTrackingPause.value
  }

  // Reset form data
  const resetForm = () => {
    formData.value = {
      report_type: '',
      pet_type: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      image_path: '',
      contact_name: '',
      contact_num: '',
      contact_email: '',
      latitude: 0,
      longitude: 0,
      user_id: null
    }
    selectedFile.value = null
  }

  return {
    map,
    marker,
    isTrackingPause,
    formData,
    selectedFile,
    toggleTrackingPause,
    resetForm
  }
})
