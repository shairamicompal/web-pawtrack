<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify';

const theme = ref('light')

// Utilize predefined vue functions
const { mobile } = useDisplay()

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        :color="theme === 'light' ? 'brown-lighten-3' : 'brown-darken-2'"
        border
      >
        <v-spacer></v-spacer>                           

        <v-btn
          :icon="theme.value === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="elevated"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
          <slot name="content"></slot>
      </v-main> 

      <<v-footer
        class="font-weight-bold"
        :class="mobile ? 'text-caption' : ''"
        :color="theme === 'light' ? 'brown-lighten-1' : 'brown-darken-4'"
        border
        app
      >
        <div :class="mobile ? 'w-100 text-center' : ''">
          Copyright © 2024 - PawTrack | All Rights Reserved
        </div>
      </v-footer>
    </v-app>
  </v-responsive>
</template>
