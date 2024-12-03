<script setup>
import { ref } from 'vue'
import emailjs from 'emailjs-com' // Import EmailJS library

// Form data
const contactForm = ref({
  fullName: '',
  email: '',
  subject: '',
  message: ''
})

// Feedback messages
const formAction = ref({
  formProcess: false,
  formSuccessMessage: '',
  formErrorMessage: ''
})

// Email validation function
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// EmailJS send email function
const sendEmail = async () => {
  formAction.value.formProcess = true

  try {
    const response = await emailjs.send(
      'service_pi132y9', // Replace with your Service ID from EmailJS
      'template_7e12gc3', // Replace with your Template ID from EmailJS
      {
        from_name: contactForm.value.fullName,
        from_email: contactForm.value.email,
        subject: contactForm.value.subject,
        message: contactForm.value.message,
        to_email: 'micompalshaira@gmail.com' // Replace with your recipient email
      },
      '2urTe55aXb_aHZ5fR' // Replace with your User ID from EmailJS
    )

    formAction.value.formSuccessMessage = 'Message sent successfully!'
    contactForm.value = { fullName: '', email: '', subject: '', message: '' } // Reset form fields

    // Hide the success message after 5 seconds
    setTimeout(() => {
      formAction.value.formSuccessMessage = ''
    }, 5000)
  } catch (error) {
    formAction.value.formErrorMessage = 'Failed to send message. Please try again later.'
    console.error('EmailJS Error:', error) // Log error for debugging
  }

  formAction.value.formProcess = false
}

// Form submission handler
const onFormSubmit = () => {
  formAction.value.formErrorMessage = '' // Reset error message

  if (!contactForm.value.fullName || !contactForm.value.email || !contactForm.value.message) {
    formAction.value.formErrorMessage = 'Please fill in all required fields.'
    return
  }

  if (!isValidEmail(contactForm.value.email)) {
    formAction.value.formErrorMessage = 'Please enter a valid email address.'
    return
  }

  sendEmail()
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
      <!-- Feel Free to Message Section -->
      <v-col cols="12" class="mb-6">
        <div class="message-section">
          <h3 class="text-center">Feel Free to Reach Out!</h3>
          <p class="text-center">
            We’d love to hear from you. Whether you have a question, suggestion, or just want to say
            hello, don’t hesitate to send us a message. We're here to help!
          </p>
        </div>
      </v-col>

      <!-- Form Section -->
      <v-col cols="12" md="6" class="pa-5">
        <h2 class="mb-6">Contact Us</h2>
        <v-form @submit.prevent="onFormSubmit">
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

          <!-- Error and Success Messages -->
          <v-row>
            <v-col cols="12">
              <div v-if="formAction.formErrorMessage" class="text-red-500">
                {{ formAction.formErrorMessage }}
              </div>
              <div v-if="formAction.formSuccessMessage" class="success-message">
                {{ formAction.formSuccessMessage }}
              </div>
            </v-col>
          </v-row>

          <!-- Submit Button -->
          <v-row>
            <v-col cols="12" class="mb-10">
              <v-btn
                :loading="formAction.formProcess"
                color="brown-darken-3"
                block
                @click="onFormSubmit"
              >
                Send Message
              </v-btn>
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

    <!-- Our Team Section -->
    <v-row class="mt-12" justify="center">
      <v-col cols="12" class="text-center">
        <h2 class="team-title">Meet Our Team</h2>
        <p>
          Our dedicated team of frontend and backend experts is here to deliver the best experience.
        </p>
      </v-col>

      <v-col cols="12" md="5" class="pa-3">
        <v-card class="ma-10 pa-10">
          <v-img src="/images/mia.jpg" alt="System Analyst" class="team-img" height="250"></v-img>
          <v-card-title class="text-center">
            <h3 class="team-name">Mia Lolor</h3>
          </v-card-title>
          <v-card-subtitle class="text-center">System Analyst</v-card-subtitle>
          <v-card-actions class="justify-center mt-3">
            <a href="https://www.facebook.com/profile.php?id=100010559085954" target="_blank" class="social-icon">
              <v-icon>mdi-facebook</v-icon>
            </a>
            <a href="https://mialolor.github.io/" target="_blank" class="social-icon">
              <v-icon>mdi-github</v-icon>
            </a>
            <a href="https://github.com/mialolor" target="_blank" class="social-icon">
              <v-icon>mdi-web</v-icon>
            </a>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="5" class="pa-3">
        <v-card class="ma-10 pa-10">
          <v-img
            src="/images/shai.png"
            alt="Backend Developer"
            class="team-img"
            height="250"
          ></v-img>
          <v-card-title class="text-center">
            <h3 class="team-name">Shaira Micompal</h3>
          </v-card-title>
          <v-card-subtitle class="text-center">Backend Developer</v-card-subtitle>
          <v-card-actions class="justify-center mt-3">
            <a href="https://www.facebook.com/" target="_blank" class="social-icon">
              <v-icon>mdi-facebook</v-icon>
            </a>
            <a href="https://github.com/" target="_blank" class="social-icon">
              <v-icon>mdi-github</v-icon>
            </a>
            <a href="https://shairamicompal.github.io/index.html" target="_blank" class="social-icon">
              <v-icon>mdi-web</v-icon>
            </a>
          </v-card-actions>
        </v-card>
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
  flex-grow: 0.2;
  height: 2px; /* Adjust thickness */
  background-color: #d18f2c; /* Line color */
}

/* Success message styling */
.success-message {
  background-color: #28a745; /* Green background */
  color: white; /* White text */
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  width: 50%;
  text-align: center;
  margin-left: auto; /* Center horizontally using auto margin */
  margin-right: auto; /* Center horizontally using auto margin */
  margin-top: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Feel Free Section Styling */
.message-section h3 {
  font-size: 24px;
  font-weight: 600;
}

.message-section p {
  font-size: 17px;
  color: #bf8b4b;
  margin-top: 10px;
}

/* Our Team Section */
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Space between icons */
  margin-top: 10px; /* Space between the icon container and other content */
}

.social-icon {
  font-size: 2rem; /* Size of the icons */
  color: #6e390f; /* Default icon color */
  transition:
    color 0.3s ease,
    transform 0.3s ease; /* Smooth transition on hover */
}

.social-icon:hover {
  color: #c0914a; /* Change icon color on hover */
  transform: scale(1.1); /* Slightly enlarge icon on hover */
}

.v-card{
  background-color: #b9b5b0;
}
</style>
