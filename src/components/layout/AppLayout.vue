<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar
        class="px-3"
        :color="theme === 'light' ? 'grey-lighten-1' : 'grey-darken-3'"
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
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-main>

      <!-- Corrected color value -->
      <v-footer
      class="font-weight-bold"
        :color="theme.value === 'light' ? 'grey-lighten-1' : 'grey-darken-3'"
        elevation="24"
        border
        app
      >
        2024 - PawTrack
      </v-footer>
    </v-app>
  </v-responsive>
</template>
