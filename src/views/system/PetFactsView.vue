<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import PetContent from '@/components/system/pet-facts/PetContent.vue'
import PetFacts from '@/components/system/pet-facts/PetFacts.vue'


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

          
           <v-col cols="12">
              <PetContent></PetContent>
           </v-col>
         

         <v-row>
            <v-col cols="12">
                <PetFacts></PetFacts>
            </v-col>
         </v-row>

         <!-- <v-row>
           <v-col cols="12">
              <AboutCounts></AboutCounts>
           </v-col>
         </v-row>

         <v-row>
           <v-col cols="12">
            <AboutFaqs></AboutFaqs>
           </v-col>
         </v-row> -->
              
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