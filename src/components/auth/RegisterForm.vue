<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator
} from '@/utils/validators'
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const formDataDefault = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: ''
}

const formData = ref({
  ...formDataDefault
})

const formAction = ref({
  ...formActionDefault
})

const isPasswordVisible = ref(false)
const isPasswordConfirmVisible = ref(false)
const refVForm = ref()

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        is_admin: false // Just turn to true if admin account
        // role: 'Administrator' // If role based; just change the string based on role
      }
    }
  })

  if (error) {
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered Account.'
    // Add here more actions if you want
    router.replace('/dashboard')
  }

  refVForm.value?.reset()

  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <alert-notification
  v-if="formAction.formSuccessMessage || formAction.formErrorMessage"
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></alert-notification>

  <v-form class="mt-5" ref="refVForm" @submit.prevent="onFormSubmit()">
    <v-row dense class="text-amber-darken-4">
      <v-col cols="12" md="6">
        <v-text-field
          label="Firstname"
          v-model="formData.firstname"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          label="Lastname"
          v-model="formData.lastname"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field
          label="Email"
          prepend-inner-icon="mdi-email-outline"
          v-model="formData.email"
          :rules="[requiredValidator, emailValidator]"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
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
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          prepend-inner-icon="mdi-lock-outline"
          label="Password Confirmation"
          v-model="formData.password_confirmation"
          :type="isPasswordConfirmVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordConfirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="isPasswordConfirmVisible = !isPasswordConfirmVisible"
          :rules="[
            requiredValidator,
            confirmedValidator(formData.password, formData.password_confirmation)
          ]"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-btn
      class="mt-2"
      type="submit"
      color="brown-darken-1"
      prepend-icon="mdi-account-plus"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
      block
    >
      Register
    </v-btn>
  </v-form>
</template>
