// src/composables/useSnackbar.js

import { ref } from 'vue'

export const useSnackbar = () => {
  const snackbar = ref({
    visible: false,
    message: '',
    color: 'success',
    timeout: 3000
  })

  const showSnackbar = (message, color = 'success', timeout = 3000) => {
    snackbar.value = { visible: true, message, color, timeout }
    setTimeout(() => {
      snackbar.value.visible = false
    }, timeout)
  }

  return {
    snackbar,
    showSnackbar
  }
}
