import { ref } from 'vue'
import { supabase } from '@/utils/supabase'
import leaflet from 'leaflet'
import { useSnackbar } from '@/components/system/dashboard/form-pet/useSnackbar'

export const useFormAction = () => {
  const formAction = ref({
    formSuccessMessage: '',
    formErrorMessage: '',
    formProcess: false,
  })

  const { snackbar, showSnackbar } = useSnackbar()

  const submitForm = async (formData, authStore, selectedFile, resetForm, map, petIcon) => {
    formAction.value.formProcess = true
    formAction.value.formSuccessMessage = ''
    formAction.value.formErrorMessage = ''

    try {
      if (!authStore.userData?.id) {
        throw new Error('You must be logged in to submit a report.')
      }

      const imagePath = selectedFile.value ? await uploadImage(selectedFile.value) : null
      if (imagePath) formData.value.image_path = imagePath

      const { error } = await supabase.from('pet_reports').insert([formData.value])
      if (error) throw new Error('Failed to submit report. Please try again.')

      showSnackbar('Report submitted successfully!', 'success')

      // Add a marker to the map for the new report
      leaflet
        .marker([formData.value.latitude, formData.value.longitude], { icon: petIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${formData.value.pet_type}</strong> - <strong>${formData.value.report_type}</strong>`
        )
        .openPopup()

      resetForm()
    } catch (err) {
      showSnackbar(err.message, 'error')
    } finally {
      formAction.value.formProcess = false
    }
  }

  const uploadImage = async (file) => {
    const fileName = `reports/${file.name}`

    const { data, error } = await supabase.storage.from('pawtrack').upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    })

    if (error) {
      console.error('Error uploading image:', error.message)
      return null
    }

    return data.path
  }

  return {
    formAction,
    submitForm,
  }
}
