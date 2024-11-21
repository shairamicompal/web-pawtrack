<script setup>
import { useRouter } from "vue-router";
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'

import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const router = useRouter();


// Utilize pre-defined vue functions
const { mobile } = useDisplay()

const isDrawerVisible = ref(mobile.value ? false : true)

// Go back to the previous page
const goBack = () => {
  router.back();
};
</script>


<template>
   <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>

    <template #content>
      <v-container class="py-5">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title class="text-h5">About Pet Management System</v-card-title>
            <v-card-text>
              <p>
                Welcome to the **Pet Management System**, your go-to solution for helping pet owners reunite with their lost pets. Our platform is dedicated to connecting people who have lost pets with those who have found them, creating a seamless process for managing and resolving such situations.
              </p>
  
              <h3 class="text-h6">Key Features:</h3>
              <ul>
                <li><strong>Lost & Found Management:</strong> Post a report about a lost or found pet, including details and pictures.</li>
                <li><strong>Pet Information:</strong> Keep track of important details about your pets, including their health and identification records.</li>
                <li><strong>Community Support:</strong> Collaborate with a network of pet lovers to reunite families with their pets.</li>
                <li><strong>Easy Reporting:</strong> Easily report sightings of lost pets or submit details for pets you have found.</li>
              </ul>
  
              <p>
                Our mission is to provide a reliable, user-friendly system to ensure that lost pets can find their way back home as quickly as possible. Together, we can make a difference in the lives of pets and their families.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="goBack">Go Back</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </template>
   </AppLayout>
  </template>
  

  <style scoped>
.text-h5 {
  font-weight: bold;
  text-align: center;
}

.text-h6 {
  font-weight: bold;
  margin-top: 20px;
}
</style>