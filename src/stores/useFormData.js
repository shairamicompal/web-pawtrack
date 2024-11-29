import { ref } from 'vue'

export const useFormData = (authStore) => {
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
    user_id: authStore.userData?.id || ''
  })

  const resetFormData = () => {
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
      user_id: authStore.userData?.id || ''
    }
  }

  return {
    formData,
    resetFormData
  }
}
