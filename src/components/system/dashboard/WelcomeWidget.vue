<script setup>
import { useAuthUserStore } from '@/stores/authUser'
import { useDisplay } from 'vuetify'

// Use Pinia Store
const authStore = useAuthUserStore()

// Utilize pre-defined vue functions
const { mdAndDown } = useDisplay()
</script>

<template>
  <v-card class="custom-card" theme="light">
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="4" :class="mdAndDown ? 'd-flex align-center' : ''">
          <v-img
            :class="!mdAndDown ? 'mx-auto' : ''"
            src="/images/pawtrack-logo.png"
            :width="mdAndDown ? '48%' : '48%'"
          ></v-img>
        </v-col>

        <v-col cols="12" sm="8">
          <h1 class="mb-5">
            Welcome Aboard,
            <span class="font-weight-black">
              {{ authStore.userData.firstname + ' ' + authStore.userData.lastname }}!
            </span>
          </h1>

          <h4 class="text-justify">
            Welcome to PawTrack! Our system is designed to help you easily report and locate lost or
            found pets in your community. Here, you can share information about a missing or found pet, including descriptions,
            photos, and the last known location. PawTrack makes it simple to reunite lost pets with
            their families. Thank you for choosing us to help bring pets back home—because every pet
            deserves to be found.
          </h4>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.custom-card {
  background-color:#f2e7d1; /* Yellow lighten-4 */
}
</style>