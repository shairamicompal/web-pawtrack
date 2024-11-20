<script setup>
// import {
//   mainNav,
//   menuItemsNav1,
//   menuItemsNav2,
//   menuItemsNav3,
//   menuItemsNav4,
//   menuItemsNav5
// } from './sideNavigation'
import { mainNav } from './sideNavigation'

import { useDisplay } from 'vuetify'
import { ref, watch } from 'vue'

const props = defineProps(['isDrawerVisible'])

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

// Load Variables
const isDrawerVisible = ref(props.isDrawerVisible)
watch(props, () => {
  isDrawerVisible.value = props.isDrawerVisible
})

// Function to generate valid routes dynamically
function generateRoute(title) {
  if (!title) return null
  return `/${title.replace(/\s+/g, '-').toLowerCase()}`
}
</script>

<template>
  <v-navigation-drawer
    v-model="isDrawerVisible"
    :temporary="mobile"
    :permanent="!mobile"
    width="325"
  >
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        to="/dashboard"
      ></v-list-item>

      <v-divider></v-divider>

      <!-- Replace the dropdown groups with single list items -->
      <v-list-item
        v-for="([title, icon], i) in mainNav"
        :key="i"
        :prepend-icon="icon"
        :title="title"
        :to="`/${title.replace(/\s+/g, '-').toLowerCase()}`"
      ></v-list-item>

      <v-divider></v-divider>

      <v-list-item
        prepend-icon="mdi-wrench"
        title="Account Settings"
        to="/account/settings"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
  .v-list-item {
    transition: transform 0.3s ease; /* Smooth transition for scaling */
  }

  .v-list-item:hover {
    transform: scale(1.05); /* Slightly enlarge the item to create the pop effect */
  }

  .v-list-item:not(:hover) {
    transform: scale(1); /* Reset the size when not hovered */
  }
</style>
