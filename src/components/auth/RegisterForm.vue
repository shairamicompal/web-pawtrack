<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field label="Firstname" variant="outlined"></v-text-field>

    <v-text-field label="Lastname" variant="outlined"></v-text-field>

    <v-text-field label="Email" variant="outlined"></v-text-field>

    <v-text-field
      prepend-inner-icon="mdi-lock-outline"
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    >
    </v-text-field>

    <v-text-field
      prepend-inner-icon="mdi-lock-outline"
      label="Confirm Password"
      :type="isPasswordConfirmVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
    >
    </v-text-field>

    <v-btn class="mt-2" type="submit" block color="primary" prepend-icon="mdi-account-plus"
      >Register</v-btn
    >
  </v-form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const isPasswordConfirmVisible = ref(false)

    return {
      isPasswordVisible,
      isPasswordConfirmVisible
    }
  }
}
</script>
