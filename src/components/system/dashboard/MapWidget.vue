<script setup>
import leaflet from 'leaflet'
import { ref, onMounted, watchEffect, watch } from 'vue'
import { useGeolocation } from '@vueuse/core'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'

// Define reactive properties
const showAlert = ref(false) // Define the alert visibility state
const alertMessage = ref('') // Define the alert message
const alertType = ref('success') // Define the alert type (success, error, etc.)

// Use Pinia Store
const authStore = useAuthUserStore()

// Form action state
const formAction = ref({
  formSuccessMessage: '',
  formErrorMessage: '',
  formProcess: false
})

// Geolocation
const { coords, locatedAt, resume, pause } = useGeolocation({
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
})

// Variables
let map
let marker
const isSuperAdmin = authStore.userRole === 'Super Administrator'
const defaultLatLng = [8.95555279469484, 125.59780764933492]
const isTrackingPause = ref(false)

// Modal and Form Data
const showModal = ref(false)
const formData = ref({
  report_type: '',
  pet_type: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  image_path: '', // Updated field name
  contact_name: '',
  contact_num: '',
  contact_email: '',
  latitude: 0,
  longitude: 0,
  user_id: authStore.userData?.id || '' // Use auth store to get the user ID
})
const selectedFile = ref(null) // File for upload


// Define validation rules
const rules = {
  required: (value) => !!value || 'This field is required.',
  email: (value) =>
    /.+@.+\..+/.test(value) || 'E-mail must be valid.',
    phone: (value) =>
  /^[0-9]{11}$/.test(value) || 'Phone number must be exactly 11 digits.',
}
// Form validation state
const isFormValid = ref(false)
const reportForm = ref(null)

// Validate and submit the form
const validateAndSubmit = () => {
  if (reportForm.value.validate()) {
    submitReport()
  } else {
    showAlert.value = true
    alertType.value = 'error'
    alertMessage.value = 'Please fill in all required fields.'
  }
}

// Toggle Geolocation Tracking
const onTrackingPause = () => {
  isTrackingPause.value = !isTrackingPause.value

  if (isTrackingPause.value) {
    pause()
    map.setView(defaultLatLng, 15)
  } else {
    resume()
    setMapMarker()
  }
}

// Set marker on map
const setMapMarker = () => {
  const newLatLng = [coords.value.latitude, coords.value.longitude]

  if (coords.value.latitude && coords.value.longitude) {
    map.setView(newLatLng, 17)
    marker.setLatLng(newLatLng).openPopup()
  }
}

// Add pin on map click
const onMapClick = (e) => {
  formData.value.latitude = e.latlng.lat
  formData.value.longitude = e.latlng.lng
  showModal.value = true
}

// Handle file selection
const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

// Upload image to Supabase Storage
async function uploadImage(file) {
  const fileName = `reports/${file.name}`

  const { data, error } = await supabase.storage.from('pawtrack').upload(fileName, file, {
    cacheControl: '3600',
    upsert: true
  })

  if (error) {
    console.error('Error uploading image:', error.message)
    alert('Failed to upload image. Please try again.')
    return null
  }

  return data.path
}

const submitReport = async () => {
  formAction.value.formProcess = true
  formAction.value.formSuccessMessage = ''
  formAction.value.formErrorMessage = ''

  try {
    if (!authStore.userData || !authStore.userData.id) {
      formAction.value.formErrorMessage = 'You must be logged in to submit a report.'
      showAlert.value = true // Show the alert
      resetAlert() // Reset the alert after 3 seconds
      return
    }

    const imagePath = await uploadImage(selectedFile.value)
    if (imagePath) {
      formData.value.image_path = imagePath
    }

    const { data, error } = await supabase.from('pet_reports').insert([formData.value])

    if (error) {
      formAction.value.formErrorMessage = 'Failed to submit report. Please try again.'
      formAction.value.formSuccessMessage = ''
      showAlert.value = true // Show the alert
      resetAlert() // Reset the alert after 3 seconds
    } else {
      formAction.value.formSuccessMessage = 'Report submitted successfully!'
      formAction.value.formErrorMessage = ''
      showAlert.value = true // Show the alert
      resetAlert() // Reset the alert after 3 seconds

      leaflet
        .marker([formData.value.latitude, formData.value.longitude])
        .addTo(map)
        .bindPopup(`${formData.value.pet_type} - ${formData.value.report_type}`)
        .openPopup()

      formData.value = {
        report_type: '',
        pet_type: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        image_path: '',
        contact_name: '',
        contact_num: '',
        contact_email: '',
        latitude: 0,
        longitude: 0,
        user_id: authStore.userData?.id || ''
      }
      selectedFile.value = null
      showModal.value = false
    }
  } catch (err) {
    console.error('Unexpected error:', err)
    formAction.value.formErrorMessage = 'Unexpected error occurred. Please try again.'
    formAction.value.formSuccessMessage = ''
    showAlert.value = true // Show the alert
    resetAlert() // Reset the alert after 3 seconds
  } finally {
    formAction.value.formProcess = false
  }
}

// Reset alert after a short period (3 seconds)
const resetAlert = () => {
  setTimeout(() => {
    showAlert.value = false
    formAction.value.formSuccessMessage = ''
    formAction.value.formErrorMessage = ''
  }, 5000) // 3 seconds delay before resetting the alert
}

watchEffect(() => {
  if (
    coords.value.latitude !== Number.POSITIVE_INFINITY &&
    coords.value.longitude !== Number.POSITIVE_INFINITY
  )
    setMapMarker()
})

onMounted(() => {
  map = leaflet.map('map').setView(defaultLatLng, 15)

  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .addTo(map)

  marker = leaflet.marker(defaultLatLng).addTo(map).bindPopup('You are here!')

  map.on('click', onMapClick)
})
</script>
<template>
  <v-card class="pa-4" elevation="2">
    <v-card-title class="headline custom-title"> 📍 Current Location </v-card-title>

    <template #subtitle>
      <div class="text-wrap mt-3">
        <v-row align="center">
          <v-col>
            <v-icon color="primary" class="me-2" size="18">mdi-map-marker</v-icon>
            <span class="coords">{{ `LatLng: ${coords.latitude}, ${coords.longitude}` }}</span>
          </v-col>
          <v-col>
            <v-icon color="secondary" class="me-2" size="18">mdi-clock</v-icon>
            <span class="timestamp">{{
              `Date/Time: ${new Date(locatedAt).toLocaleString()}`
            }}</span>
          </v-col>
        </v-row>
      </div>
    </template>

    <template #append>
      <v-btn @click="onTrackingPause" variant="text" icon>
        <v-icon
          :icon="isTrackingPause ? 'mdi-refresh' : 'mdi-pause'"
          :color="isTrackingPause ? 'success' : 'error'"
          class="tracking-icon"
        ></v-icon>
        <v-tooltip
          activator="parent"
          location="top"
          color="secondary"
          content-class="custom-tooltip"
        >
          {{ isTrackingPause ? 'Resume Tracking' : 'Pause Tracking' }}
        </v-tooltip>
      </v-btn>
    </template>

    <v-card-text>
      <div id="map" :style="isSuperAdmin ? 'height: 225px' : 'height: 618px'"></div>
    </v-card-text>
  </v-card>

  <!-- Modal for Report Form -->
  <v-dialog v-model="showModal" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h6">Report a Pet</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="reportForm" v-model="isFormValid">
          <!-- Pet Details -->
          <v-row dense>
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.report_type"
                :items="['Lost', 'Found']"
                label="Report Type"
                prepend-icon="mdi-alert"
                required
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.pet_type"
                :items="['Dog', 'Cat']"
                label="Pet Type"
                prepend-icon="mdi-paw"
                required
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="12">
              <v-file-input
                v-model="selectedFile"
                @change="handleFileChange"
                label="Upload Photo"
                prepend-icon="mdi-camera"
                accept="image/*"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="formData.description"
                label="Description"
                rows="3"
                prepend-icon="mdi-comment-text-outline"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.date"
                label="Date"
                type="date"
                prepend-icon="mdi-calendar"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <!-- Contact Details -->
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.contact_name"
                label="Contact Name"
                prepend-icon="mdi-account"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.contact_num"
                label="Contact Number"
                type="tel"
                prepend-icon="mdi-phone"
                :rules="[rules.required, rules.phone]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.contact_email"
                label="Contact Email"
                type="email"
                prepend-icon="mdi-email"
                :rules="[rules.required, rules.email]"
              />
            </v-col>
          </v-row>
        </v-form>

        <!-- Display success or error messages inside the modal -->
        <v-alert
          v-if="showAlert"
          :type="formAction.formSuccessMessage ? 'success' : 'error'"
          dismissible
        >
          {{ formAction.formSuccessMessage || formAction.formErrorMessage }}
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="showModal = false">Cancel</v-btn>
        <v-btn
          color="primary"
          @click="validateAndSubmit"
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.text-wrap {
  padding: 10px;
  border-radius: 8px;
  background: rgba(237, 237, 233, 0.6);
}

/* Custom font and styles for the title */
.custom-title {
  font-family: 'Poppins', sans-serif; /* Use a clean and modern font */
  font-weight: bold;
  font-size: 24px;
  color: #d5ad84; /* Green for a nature-inspired feel */
  text-align: center;
}

/* Add spacing and adjust text styling */
.text-wrap {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
}

.coords,
.timestamp {
  font-style: italic;
  color: #757575; /* Subtle gray for less emphasis */
}

.tracking-icon {
  transition: transform 0.3s ease;
}

.tracking-icon:hover {
  transform: scale(1.2);
}

.custom-tooltip {
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}
</style>
