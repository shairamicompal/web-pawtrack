<script setup>
import { reactive } from 'vue'

const contactForm = reactive({
  fullName: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  console.log('Submitted Data:', contactForm)

  // Reset form data
  contactForm.fullName = ''
  contactForm.email = ''
  contactForm.subject = ''
  contactForm.message = ''

  alert('Your message has been sent!')
}
</script>

<template>

    <div class="about-title-wrapper mt-5 ms-5">
        <v-icon class="icon">mdi-paw</v-icon>
        <h4 class="about-title">CONTACT</h4>
        <div class="line"></div>
      </div>
  <v-container fluid class="py-12">
    <v-row>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="pa-5">
        <h2 class="mb-6">Contact Us</h2>
        <v-form ref="contactForm" @submit.prevent="submitForm">
          <!-- Full Name and Email -->
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Full Name"
                v-model="contactForm.fullName"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Email Address"
                v-model="contactForm.email"
                outlined
                required
                type="email"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Subject -->
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Subject"
                v-model="contactForm.subject"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Message -->
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Message"
                v-model="contactForm.message"
                outlined
                required
                rows="4"
              ></v-textarea>
            </v-col>
          </v-row>

          <!-- Submit Button -->
          <v-row>
            <v-col cols="12">
              <v-btn color="brown-darken-3" block @click="submitForm"> Send Message </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <!-- Image Section -->
      <v-col cols="12" md="6" class="pa-5 d-flex justify-center">
        <v-img
          src="/images/dog-cat.jpg"
          alt="Contact Us"
          max-width="100%"
          class="rounded-lg"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h2 {
  font-weight: 600;
}

.v-btn {
  color: white;
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
