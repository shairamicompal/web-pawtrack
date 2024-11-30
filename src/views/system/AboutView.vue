<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import AboutContent from '@/components/system/about/AboutContent.vue'
import AboutFaqs from '@/components/system/about/AboutFaqs.vue'
import AboutCounts from '@/components/system/about/AboutCounts.vue'

import { ref } from 'vue'
import { useDisplay } from 'vuetify'



// Utilize pre-defined vue functions
const { mobile } = useDisplay()

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
     <v-container fluid>
         <v-row>
            <v-col cols="12">
              <AboutContent></AboutContent>
            </v-col>
         </v-row>

         <v-row>
           <v-col cols="12">
              <AboutCounts></AboutCounts>
           </v-col>
         </v-row>

         <v-row>
           <v-col cols="12">
            <AboutFaqs></AboutFaqs>
           </v-col>
         </v-row>
              
         <v-row>

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