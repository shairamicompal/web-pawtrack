<script setup>
import { requiredValidator, emailValidator } from '@/utils/validators'
import { ref } from 'vue'

const isPasswordVisible = ref(false)
const refVForm = ref()

const formDataDefault = {
   email: '',
   password: '',
}

const formData = ref({
  ...formDataDefault
})


const onLogin = () => {
  // alert(formData.value.email)  // Corrected: display email in alert
}

const onFormSubmit = () => {
  const isValid = refVForm.value?.validate() // Validate returns a boolean
  if (isValid) {
    onLogin()
  }
}
</script>

<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-text-field 
      v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email-outline" 
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field 
      v-model="formData.password"
      prepend-inner-icon="mdi-lock-outline" 
      label="Password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :rules="[requiredValidator]"
    >
    </v-text-field>

    <v-btn class="mt-2" type="submit" block color="primary" prepend-icon="mdi-login">
      Login
    </v-btn>
  </v-form>
</template>


