<template>
  <div class="about-title-wrapper mt-5 ms-5">
    <v-icon class="icon">mdi-paw</v-icon>
    <h4 class="about-title">PET FACTS</h4>
    <div class="line"></div>
  </div>
  <br>
  <br>
  <v-containe fluid>
    <!-- Title/Description Section -->
    <v-row>
      <v-col cols="12">
        <v-heading level="1" class="text-center">How to Properly Take Care of Your Pets</v-heading>
        <v-subheading class="text-center">
          Watch these videos to learn essential tips on keeping your pets safe, healthy, and happy.
        </v-subheading>
      </v-col>
    </v-row>

    <v-row>
      <!-- Loop through the videos and create a card for each -->
      <v-col v-for="video in videos" :key="video.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ video.title }}</v-card-title>
          <v-card-text>
            <iframe
              width="100%"
              height="315"
              :src="video.url"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-containe>
</template>

<script setup>
import { ref } from 'vue'

// List of YouTube videos
const videos = ref([
  {
    id: 'video1',
    title: 'Pet Health Tips',
    url: 'https://www.youtube.com/embed/FA4R9TBWOIU?si=lCJQHH9qydsDmgN_'
  },
  {
    id: 'video2',
    title: 'Pet Nutrition Tips',
    url: 'https://www.youtube.com/embed/ppkBktPF6FI?si=AFj5xAHe2L_HVTvw'
  },
  {
    id: 'video3',
    title: 'Tips to find your Pet',
    url: 'https://www.youtube.com/embed/U0HiyO0GeYY?si=33UjMGqhgZJAo3Ey'
  },
  {
    id: 'video4',
    title: 'Pet Education',
    url: 'https://www.youtube.com/embed/CF3sRUqvIjM?si=BNDhEOmY-jr_UUnW'
  },
  {
    id: 'video5',
    title: 'Training Your Dog',
    url: 'https://www.youtube.com/embed/jFMA5ggFsXU?si=YVeFeMD_XVsHDZCT'
  },
  {
    id: 'video6',
    title: 'Guide',
    url: 'https://www.youtube.com/embed/zPOAaDUzVDY?si=EhKL7cXSQG2zAAGt'
  }
  // Add more videos as needed
])
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}

iframe {
  border-radius: 8px;
}

/* Title/Description Styling */
.v-heading {
  margin-bottom: 20px;
}

.v-subheading {
  margin-bottom: 40px;
  color: #555;
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
  flex-grow: 0.20;
  height: 2px; /* Adjust thickness */
  background-color: #d18f2c; /* Line color */
}
</style>
