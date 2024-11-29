<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useGeolocation } from '@vueuse/core'
import { useAuthUserStore } from '@/stores/authUser'
import { useSnackbar } from './form-pet/useSnackbar'
import { useSupabaseStore } from '@/stores/supabaseStore'
import {
  requiredValidator,
  emailValidator,
  contactNumberValidator,
  imageValidator,
  descriptionValidator
} from '@/utils/validators'
import { useFormData } from '@/stores/useFormData'
import leaflet from 'leaflet'
import { dogIcon, catIcon, userLocationIcon } from './form-pet/leafletIcons'

// Supabase store
const { fetchReports, uploadImage, insertReport } = useSupabaseStore()

const showAlert = ref(false)
const { snackbar, showSnackbar } = useSnackbar()
const authStore = useAuthUserStore()

// Use the formData composable
const { formData, resetFormData } = useFormData(authStore)

const showModal = ref(false)
const selectedFile = ref(null)
const isFormValid = ref(false)
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

// Map setup
let map
let marker
const isSuperAdmin = authStore.userRole === 'Super Administrator'
const defaultLatLng = [8.95555279469484, 125.59780764933492]
const isTrackingPause = ref(false)

// Handle file selection
const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0]
}

const setMapMarker = () => {
  const newLatLng = [coords.value.latitude, coords.value.longitude]
  if (coords.value.latitude && coords.value.longitude) {
    map.setView(newLatLng, 17)
    marker.setLatLng(newLatLng).openPopup()
  }
}

const onMapClick = (e) => {
  formData.value.latitude = e.latlng.lat
  formData.value.longitude = e.latlng.lng
  showModal.value = true
}

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

// Submit validation
const validateAndSubmit = async () => {
  const isValid =
    requiredValidator(formData.value.report_type) &&
    requiredValidator(formData.value.pet_type) &&
    descriptionValidator(formData.value.description) &&
    requiredValidator(formData.value.contact_name) &&
    contactNumberValidator(formData.value.contact_num) &&
    emailValidator(formData.value.contact_email) &&
    imageValidator(selectedFile.value)

  if (isValid) {
    try {
      formAction.value.formProcess = true
      const imagePath = selectedFile.value ? await uploadImage(selectedFile.value) : null
      if (imagePath) formData.value.image_path = imagePath

      await insertReport(formData.value)

      showSnackbar('Report submitted successfully!', 'success')
      leaflet
        .marker([formData.value.latitude, formData.value.longitude], {
          icon: formData.value.pet_type === 'Dog' ? dogIcon : catIcon
        })
        .addTo(map)
        .bindPopup(
          `<strong>${formData.value.pet_type}</strong> - <strong>${formData.value.report_type}</strong>`
        )
        .openPopup()
      resetForm()
    } catch (err) {
      showSnackbar(err.message, 'error')
    } finally {
      formAction.value.formProcess = false
    }
  } else {
    showSnackbar('Please fill in all required fields.', 'error')
  }
}

const resetForm = () => {
  resetFormData()
  selectedFile.value = null
  showModal.value = false
}

onMounted(async () => {
  // Initialize the map
  map = leaflet.map('map').setView(defaultLatLng, 15)

  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .addTo(map)

  marker = leaflet
    .marker(defaultLatLng, { icon: userLocationIcon })
    .addTo(map)
    .bindPopup('You are here!')

  map.on('click', onMapClick)

  // Fetch and display existing reports
  try {
    const reports = await fetchReports()
    reports.forEach((report) => {
      const petIcon = report.pet_type === 'Dog' ? dogIcon : catIcon
      leaflet
        .marker([report.latitude, report.longitude], { icon: petIcon })
        .addTo(map)
        .bindPopup(
          `<strong>${report.pet_type}</strong> - <strong>${report.report_type}</strong><br>${report.description}`
        )
    })
  } catch (err) {
    console.error('Error fetching reports:', err.message)
  }
})

watchEffect(() => {
  if (
    coords.value.latitude !== Number.POSITIVE_INFINITY &&
    coords.value.longitude !== Number.POSITIVE_INFINITY
  )
    setMapMarker()
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

  <!-- Snackbar for feedback -->
  <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="3000">
    {{ snackbar.message }}
  </v-snackbar>

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
                :rules="[requiredValidator]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.pet_type"
                :items="['Dog', 'Cat']"
                label="Pet Type"
                prepend-icon="mdi-paw"
                required
                :rules="[requiredValidator]"
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
                :rules="[requiredValidator, imageValidator]"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="formData.description"
                label="Description"
                rows="3"
                prepend-icon="mdi-comment-text-outline"
                :rules="[requiredValidator, descriptionValidator]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.date"
                label="Date"
                type="date"
                prepend-icon="mdi-calendar"
                :rules="[requiredValidator]"
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
                :rules="[requiredValidator]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.contact_num"
                label="Contact Number"
                type="tel"
                prepend-icon="mdi-phone"
                :rules="[requiredValidator, contactNumberValidator]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="formData.contact_email"
                label="Contact Email"
                type="email"
                prepend-icon="mdi-email"
                :rules="[requiredValidator, emailValidator]"
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
