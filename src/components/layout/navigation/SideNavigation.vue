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
<!-- 
       <v-list-group :key="i" v-for="([title, icon], i) in mainNav">
        <template #activator="{ props }">
          <v-list-item v-bind="props" :prepend-icon="icon" :title="title"></v-list-item>
        </template>

        <template v-if="title === 'About'">
          <v-list-item
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-if="title === 'Reports'">
          <v-list-item
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-if="title === 'Pet Facts'">
          <v-list-item
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-if="title === 'Help and FAQS'">
          <v-list-item
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>

        <template v-if="title === 'Contact Us'">
          <v-list-item
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :subtitle="subtitle ?? undefined"
            :to="to ?? undefined"
          ></v-list-item>
        </template>
      </v-list-group>  -->

      <v-list-item
      v-for="([title, icon], i) in mainNav"
      :key="i"
      :prepend-icon="icon"
      :title="title"
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
    /* background-color: #f5f5f5; */
    transform: scale(1.05); /* Slightly enlarge the item to create the pop effect */
  }

  /* Optional: Add a "pop-out" effect when hover ends */
  .v-list-item:not(:hover) {
    transform: scale(1); /* Reset the size when not hovered */
  }
</style>
