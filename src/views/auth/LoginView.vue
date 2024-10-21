<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid>
        <v-row>
          <!-- Left Column for Desktop (hidden on mobile) -->
          <v-col cols="12" lg="8" class="bg-surface-light h-screen" v-if="!mobile">
            <!-- <v-img
              src="/images/bg-card.jpg"
              class="fill-height"
              alt="Background Image"
              cover
            ></v-img> -->
          </v-col>

          <!-- Right Column for Login Form -->
          <v-col cols="12" lg="4" :class="mobile ? '' : 'pt-16'">
            <v-card class="mx-auto" elevation="0" max-width="600">
              <!-- Card Title with Logo -->
              <v-card-title class="text-center pb-0">
                <v-img
                  class="mx-auto"
                  src="/images/pawt-favicon.png"
                  :width="mobile ? '75%' : '40%'"
                ></v-img>
                <h1 class="text-yellow-darken-3 mb-8">PawTrack</h1>
                <p>Login</p>
              </v-card-title>

              <v-card-text class="pt-0">
                <!-- Form Divider -->
                <v-divider class="my-5"></v-divider>

                <!-- Login Form Component -->
                <LoginForm class="text-amber-darken-4"></LoginForm>

                <!-- Another Divider -->
                <v-divider class="my-5"></v-divider>

                <!-- Register Link -->
                <h4 class="text-center">
                  Don't have an account?
                  <router-link class="text-amber-accent-4 font-weight-black" to="/register">
                    Click here to Register
                  </router-link>
                </h4>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
