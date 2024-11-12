<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import WelcomeWidget from '@/components/system/dashboard/WelcomeWidget.vue';
import MapWidget from '@/components/system/dashboard/MapWidget.vue';
// import { useAuthUserStore } from '@/stores/authUser'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// // Use Pinia Store
// const authStore = useAuthUserStore()

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Load Variables
// const isSuperAdmin = authStore.userRole === 'Super Administrator'
const isDrawerVisible = ref(mobile.value ? false : true)


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
      <v-container>
        <v-row>
          <v-col cols="12">
            <WelcomeWidget></WelcomeWidget>
          </v-col>
 
          
          <v-col cols="12">
                <MapWidget></MapWidget>
              </v-col>
          <!-- <v-col cols="12" md="8">
            <ProductsWidget></ProductsWidget>
          </v-col> -->
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>