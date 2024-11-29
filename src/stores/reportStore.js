// stores/reportStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import { requiredValidator, descriptionValidator, contactNumberValidator, emailValidator, imageValidator } from '@/utils/validators'

export const useReportStore = defineStore('report', () => {

  // Form Data and States
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
  const formProcess = ref(false)

  // Validate and Submit Form
  const validateAndSubmit = async () => {
    const isValid =
      requiredValidator(formData.value.report_type) &&
      requiredValidator(formData.value.pet_type) &&
      descriptionValidator(formData.value.description) &&
      requiredValidator(formData.value.contact_name) &&
      contactNumberValidator(formData.value.contact_num) &&
      emailValidator(formData.value.contact_email) &&
      imageValidator(selectedFile.value)

    if (isValid) {
      await submitReport()
    } else {
      showSnackbar('Please fill in all required fields.', 'error')
    }
  }

  // Submit the Report
  const submitReport = async () => {
    formProcess.value = true

    try {
      const imagePath = selectedFile.value ? await uploadImage(selectedFile.value) : null
      if (imagePath) formData.value.image_path = imagePath

      const { error } = await supabase.from('pet_reports').insert([formData.value])
      if (error) throw new Error('Failed to submit report. Please try again.')

      showSnackbar('Report submitted successfully!', 'success')
      resetForm()
    } catch (err) {
      showSnackbar(err.message, 'error')
    } finally {
      formProcess.value = false
    }
  }

  // Upload Image to Supabase Storage
  const uploadImage = async (file) => {
    const fileName = `reports/${file.name}`

    const { data, error } = await supabase.storage.from('pawtrack').upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    })

    if (error) {
      console.error('Error uploading image:', error.message)
      return null
    }

    return data.path
  }

  // Reset the Form Data
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

  return {
    formData,
    selectedFile,
    isFormValid,
    formProcess,
    validateAndSubmit
  }
})
