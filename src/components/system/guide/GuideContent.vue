<template>
  <div class="about-title-wrapper mt-5 ms-5">
    <v-icon class="icon">mdi-paw</v-icon>
    <h4 class="about-title">GUIDE</h4>
    <div class="line"></div>
  </div>
  <v-container fluid class="timeline-guide">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center mb-6">Lost & Found Pet System Guide</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-timeline>
        <v-timeline-item
          v-for="(step, index) in steps"
          :key="index"
          :color="step.color"
          :elevation="2"
          small
        >
          <template #opposite>
            <span class="step-label">{{ step.time }}</span>
          </template>
          <template #default>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <v-btn
              v-if="step.buttonLabel"
              class="mt-2"
              color="brown-lighten-4"
              @click="onStepAction(step.action)"
            >
              {{ step.buttonLabel }}
            </v-btn>
          </template>
        </v-timeline-item>
      </v-timeline>
    </v-row>
  </v-container>

  <br>
  <!-- Testimonials Section -->
  <h2 class="text-center mb-5">What Our Users Say</h2>
  <v-row justify="center">
    <v-col cols="12" md="4" v-for="(testimonial, index) in testimonials" :key="index">
      <v-card class="testimonial-card">
        <v-avatar size="80" class="mb-3 mx-auto">
          <img :src="testimonial.image" :alt="testimonial.name" />
        </v-avatar>
        <blockquote class="testimonial-text">"{{ testimonial.quote }}"</blockquote>
        <p class="testimonial-name">{{ testimonial.name }}</p>
        <p class="testimonial-role">{{ testimonial.role }}</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

const steps = ref([
  {
    time: 'Step 1',
    title: 'Pin a Location',
    description:
      'Navigate to the homepage map and click to drop a pin at the location of the lost or found pet.',
    buttonLabel: 'Homepage',
    color: 'primary',
    action: () => alert('Pinning instructions')
  },
  {
    time: 'Step 2',
    title: 'Fill Out the Report Form',
    description:
      'Provide details such as the report type (lost/found), pet type, description, and contact information. Attach a photo if available.',
    buttonLabel: 'Go to map for pinning',
    color: 'success',
    action: () => alert('Form details')
  },
  {
    time: 'Step 3',
    title: 'View Reports',
    description:
      'Visit the Reports page to explore other users’ submissions. You can search for specific reports or contact the user for assistance.',
    buttonLabel: 'Go to Reports',
    color: 'info',
    action: () => alert('Navigate to Reports Page')
  }
])

const testimonials = ref([
  {
    name: 'Sara Wilson',
    role: 'Pet Owner',
    quote: 'This system helped me reunite with my lost dog within a day!',
    image: '/images/t-1.jpg'
  },
  {
    name: 'John Doe',
    role: 'Animal Rescuer',
    quote: 'An amazing platform for finding and reporting lost pets! A big help.',
    image: '/images/t-2.jpg'
  },
  {
    name: 'Emily Johnson',
    role: 'Volunteer',
    quote: 'Efficient and easy to use! A must-have tool for every pet lover.',
    image: '/images/t-3.jpg'
  }
])

const onStepAction = (action) => {
  if (typeof action === 'function') action()
}
</script>

<style scoped>
.timeline-guide {
  padding: 20px;
  background: none;
  border-radius: 12px;
}

.text-center {
  text-align: center;
  font-weight: bold;
}

.v-timeline-item {
  margin-bottom: 40px;
}

.step-label {
  background: #f1a43f;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #2a2f4f;
  font-weight: bold;
}

.v-timeline-item h3 {
  font-size: 1.2rem;
}

.v-timeline-item p {
  color: #e38623;
  font-size: 1rem;
  line-height: 1.5;
}

.v-btn {
  font-size: 0.9rem;
  padding: 6px 16px;
  border-radius: 20px;
  transition: transform 0.2s ease;
}

.v-btn:hover {
  transform: scale(1.05);
}

.v-timeline-item::before {
  border-left: 2px dashed #a8510e;
}

.v-timeline-item:last-child::before {
  content: none;
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
  flex-grow: 0.2;
  height: 2px; /* Adjust thickness */
  background-color: #d18f2c; /* Line color */
}

.testimonials {
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.testimonial-card {
  text-align: center;
  padding: 20px;
  background: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.testimonial-text {
  font-style: italic;
  margin: 20px 0;
  color: #666;
}

.testimonial-name {
  font-weight: bold;
  color: #a8510e;
  margin-top: 10px;
}

.testimonial-role {
  color: #888888;
  font-size: 0.9rem;
}

.v-avatar img {
  object-fit: cover;
  width: 80px; /* Adjust the image size */
  height: 80px; /* Maintain the aspect ratio */
  
}

.v-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
