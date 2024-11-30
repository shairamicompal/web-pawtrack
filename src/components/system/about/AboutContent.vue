<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      typedText: '',
      typingTexts: ['PawTrack?', 'Us?', 'this platform?'],
      typingIndex: 0,
      charIndex: 0,
      typingDelay: 100,
      erasingDelay: 50,
      pauseBetweenTexts: 1500
    }
  },
  mounted() {
    this.typeText()
  },
  methods: {
    typeText() {
      if (this.charIndex < this.typingTexts[this.typingIndex].length) {
        // Add next character
        this.typedText += this.typingTexts[this.typingIndex].charAt(this.charIndex)
        this.charIndex++
        setTimeout(this.typeText, this.typingDelay)
      } else {
        // Wait and then erase
        setTimeout(this.eraseText, this.pauseBetweenTexts)
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        // Remove last character
        this.typedText = this.typedText.slice(0, -1)
        this.charIndex--
        setTimeout(this.eraseText, this.erasingDelay)
      } else {
        // Move to the next text
        this.typingIndex = (this.typingIndex + 1) % this.typingTexts.length
        setTimeout(this.typeText, this.typingDelay)
      }
    }
  }
}
</script>

<template>
 <v-container fluid>
  <v-row>
    <!-- Left Column for Desktop -->
    <v-col cols="12" md="6" lg="6">
      <div class="about-title-wrapper">
        <v-icon class="icon">mdi-paw</v-icon>
        <h3 class="about-title">ABOUT</h3>
        <div class="line"></div>
      </div>
      <v-img
        src="/images/pet.png"
        class="about-image move-up"
        alt="Background Image"
        cover
      ></v-img>
    </v-col>

    <!-- Right Column -->
    <v-col cols="12" md="6" lg="6">
      <h2 class="text-center mt-10">
        Why choose <span class="typed-text">{{ typedText }}</span>
      </h2>

      <v-row class="text-center mt-8">
        <v-col cols="12" sm="6">
          <v-avatar color="#4E342E" size="56" class="icon-about">
            <v-icon size="30" color="white" class="text-center">mdi-map-marker-radius</v-icon>
          </v-avatar>
          <v-card-title class="mt-2">Pin Location of Pets</v-card-title>
          <v-card-text>
            Easily pin the exact location where you found or lost your pet.
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="6">
          <v-avatar color="#4E342E" size="56" class="icon-about">
            <v-icon size="30" color="white">mdi-camera</v-icon>
          </v-avatar>
          <v-card-title class="mt-2">Photo Sharing</v-card-title>
          <v-card-text>
            Upload photos of found or lost pets to help identify them and share crucial details.
          </v-card-text>
        </v-col>
      </v-row>

      <v-row class="text-center">
        <v-col cols="12" sm="6">
          <v-avatar color="#4E342E" size="56" class="icon-about">
            <v-icon size="30" color="white">mdi-account-circle</v-icon>
          </v-avatar>
          <v-card-title class="mt-2">User Profiles</v-card-title>
          <v-card-text>
            Create a profile to connect with other users and easily manage your pet sightings and posts.
          </v-card-text>
        </v-col>
        <v-col cols="12" sm="6">
          <v-avatar color="#4E342E" size="56" class="icon-about">
            <v-icon size="30" color="white">mdi-dog</v-icon>
          </v-avatar>
          <v-card-title class="mt-2">Reunite Pets</v-card-title>
          <v-card-text>
            Help reunite lost pets with their families by posting accurate location information and descriptions.
          </v-card-text>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</v-container>

</template>


<style scoped>
.move-up {
  margin-top: -60px; /* Adjust this value as needed */
}

.about-title-wrapper {
  display: flex;
  align-items: center;
}

.icon {
  font-size: 30px; /* Adjust icon size */
  color: #ab8333; /* Icon color */
  margin-right: 3px; /* Space between icon and text */
}

.about-title {
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
}

.line {
  flex-grow: 0.5;
  height: 2px; /* Adjust thickness */
  background-color: #d18f2c; /* Line color */
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Adjust the height of the floating effect */
  }
}

.icon-about {
  animation: float 5s ease-in-out infinite; /* Floating animation for the avatar */
}

.typed-text {
  font-weight: bold;
  color: #dbb116;
  border-right: 2px solid #4E342E; /* Simulate a typing cursor */
  animation: blink-cursor 0.7s steps(2, start) infinite;
}

@keyframes blink-cursor {
  0%, 100% {
    border-color: transparent;
  }
  50% {
    border-color: #42270b;
  }
}

</style>
