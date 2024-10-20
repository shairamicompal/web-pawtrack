<script setup>
import { requiredValidator, emailValidator, passwordValidator, confirmedValidator } from '@/utils/validators'
import { ref } from 'vue'

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const formData = ref({ ...formDataDefault })
const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
const refVForm = ref()

const onSubmit = () => {
  alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>


<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit()">
    <v-text-field
      label="Firstname"
      v-model="formData.firstname"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-text-field
      label="Lastname"
      v-model="formData.lastname"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-text-field
      label="Email"
      prepend-inner-icon="mdi-email-outline"
      v-model="formData.email"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      prepend-inner-icon="mdi-lock-outline"
      label="Password"
      v-model="formData.password"
      :type="isPasswordVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
      :rules="[requiredValidator, passwordValidator]"
    >
    </v-text-field>

    <v-text-field
      prepend-inner-icon="mdi-lock-outline"
      label="Confirm Password"
      v-model="formData.password_confirmation"
      :type="isPasswordConfirmVisible ? 'text' : 'password'"
      :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
      :rules="[requiredValidator, confirmedValidator(formData.password, formData.password_confirmation)]"
    >
    </v-text-field>

    <v-btn class="mt-2" type="submit" block color="primary" prepend-icon="mdi-account-plus">
      Register
    </v-btn>
  </v-form>
</template>