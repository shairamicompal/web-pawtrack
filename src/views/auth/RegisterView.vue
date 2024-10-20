<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue';
import { useDisplay } from 'vuetify'
import LoginForm from '@/components/auth/LoginForm.vue';

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row>
        <v-col cols="12" md="6" class="mx-auto">
          <v-card class="mx-auto" elevation="24">
            <v-card-title class="text-center">
              <v-img
                class="mx-auto"
                src="/images/logo-favicon.jpg"
                :width="mobile ? '75%' : '25%'"
              ></v-img>
              <h2 class="font-weight-black text-yellow-darken-3">PawTrack</h2>
              <h6 class="text-brown-darken-3">Registration Form</h6>
            </v-card-title>

            <v-card-text class="bg-surface-light pt-4">

              <v-divider class="my-5"></v-divider>
                <RegisterForm></RegisterForm>
              <v-divider class="my-5"></v-divider>

              <h5 class="text-center">
                Don't have account?
                <router-link class="text-primary" to="/">Click here to Login</router-link>
              </h5>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
