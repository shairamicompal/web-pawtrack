import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormDataStore = defineStore('formDataStore', () => {
  // Reactive state for form data
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
    user_id: ''
  })

  const selectedFile = ref(null)
  const isFormValid = ref(false)

  // Method to reset the form data
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
      user_id: ''
    }
    selectedFile.value = null
  }

  // Validation method (can be extended as needed)
  const validateForm = () => {
    isFormValid.value = formData.value.report_type && formData.value.pet_type && formData.value.description && formData.value.contact_name && formData.value.contact_num && formData.value.contact_email
    return isFormValid.value
  }

  return {
    formData,
    selectedFile,
    isFormValid,
    resetForm,
    validateForm
  }
})
