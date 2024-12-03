<script setup>
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import SideNavigation from '@/components/layout/navigation/SideNavigation.vue'
import { ref, onMounted, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'
import { useReportsStore } from '@/stores/useReportsStore'

const router = useRouter()

const { mobile } = useDisplay()
const isDrawerVisible = ref(mobile.value ? false : true)
const successMessageVisible = ref(false)

const reportsStore = useReportsStore() // Use the reports store
const authStore = useAuthUserStore()

const reports = computed(() => reportsStore.reports) // Get reports from the store
const selectedFilter = ref('ALL')
const isLoading = ref(true)
const isEditModalVisible = ref(false)
const editingReport = ref(null)

const user = computed(() => authStore.userData)

// Add formAction to track form processing state
const formAction = ref({
  formProcess: false // Track the process state of the form (disabled or loading)
})

const getImageUrl = (path) => {
  return supabase.storage.from('pawtrack').getPublicUrl(path).data.publicUrl
}

const filteredReports = computed(() => {
  if (selectedFilter.value === 'ALL') {
    return reports.value
  }
  return reports.value.filter(
    (report) => report.pet_type?.trim().toUpperCase() === selectedFilter.value
  )
})

onMounted(async () => {
  await reportsStore.fetchReports() // Fetch reports from the store
  isLoading.value = false
})

const removeReport = async (id, user_id) => {
  await reportsStore.removeReport(id, user_id, authStore) // Use store method to remove report
}

const openEditModal = (report) => {
  editingReport.value = { ...report }
  isEditModalVisible.value = true
}

const saveReportChanges = async () => {
  // Start the form process (disable the button and show loading spinner)
  formAction.value.formProcess = true

  await reportsStore.saveReportChanges(editingReport.value) // Use store method to save changes

  // After saving, show success message and reset the form process state
  successMessageVisible.value = true
  isEditModalVisible.value = false
  formAction.value.formProcess = false // Stop the form process (re-enable the button)
}
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
      <div class="about-title-wrapper mt-10 ms-10">
        <v-icon class="icon">mdi-paw</v-icon>
        <h4 class="about-title">REPORTS</h4>
        <div class="line"></div>
      </div>
      <v-container>
        <v-row>
          <v-col cols="12" lg="12" class="text-center mb-4">
            <v-btn
              v-for="filter in ['ALL', 'DOG', 'CAT']"
              :key="filter"
              class="ma-2"
              :color="selectedFilter === filter ? 'blue-grey-darken-3' : 'blue-grey-lighten-1'"
              @click="selectedFilter = filter"
            >
              {{ filter === 'ALL' ? 'All Reports' : `${filter} Reports` }}
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-if="isLoading">
          <v-col cols="12" sm="4" md="4" v-for="index in 6" :key="index">
            <v-skeleton-loader type="card" class="ma-4"></v-skeleton-loader>
          </v-col>
        </v-row>

        <v-row v-else v-if="filteredReports.length === 0">
          <v-col cols="12" class="text-center">
            <v-alert type="info" border="left" color="blue lighten-4">
              No reports available at the moment.
            </v-alert>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col cols="12" sm="4" md="4" v-for="report in filteredReports" :key="report.id">
            <v-card class="mx-auto" max-width="400" outlined elevation="10" hover>
              <v-img
                :src="getImageUrl(report.image_path)"
                height="250px"
                contain
                class="rounded-lg"
              />
              <v-card-title class="text-h5 font-weight-bold text-center">
                {{ report.pet_type }} - {{ report.report_type }}
              </v-card-title>
              <v-card-subtitle
                class="text-body-2 text-uppercase font-weight-bold"
                color="amber-lighten-2"
              >
                {{ report.date }}
              </v-card-subtitle>
              <v-card-text>
                <p><strong>Description:</strong> {{ report.description }}</p>
                <p><strong>Contact Name:</strong> {{ report.contact_name }}</p>
                <p><strong>Contact Number:</strong> {{ report.contact_num }}</p>
                <p><strong>Email:</strong> {{ report.contact_email }}</p>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  v-if="authStore.userData?.id === report.user_id"
                  color="red"
                  @click="removeReport(report.id, report.user_id)"
                  icon
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>

                <v-btn
                  v-if="authStore.userData?.id === report.user_id"
                  color="blue"
                  @click="openEditModal(report)"
                  icon
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog v-model="isEditModalVisible" persistent max-width="600">
          <v-card class="elevation-12 rounded-lg" tile>
            <v-card-title class="text-h5 font-weight-bold"> Edit Report </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="editingReport.description"
                label="Description"
                prepend-icon="mdi-comment-text-outline"
                outlined
                dense
                class="mb-3"
              ></v-text-field>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editingReport.contact_name"
                    label="Contact Name"
                    prepend-icon="mdi-account"
                    outlined
                    dense
                    class="mb-3"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="editingReport.contact_num"
                    label="Contact Number"
                    prepend-icon="mdi-phone"
                    outlined
                    dense
                    class="mb-3"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="editingReport.contact_email"
                label="Contact Email"
                prepend-icon="mdi-email"
                outlined
                dense
                class="mb-3"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="saveReportChanges"
                class="rounded-lg"
                :disabled="formAction.formProcess"
                :loading="formAction.formProcess"
              >
                Save
              </v-btn>
              <v-btn color="grey" @click="isEditModalVisible = false" class="rounded-lg">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Success Message (Snackbar) -->
        <v-snackbar
          v-model="successMessageVisible"
          color="green"
          timeout="3000"
          top
          right
          class="rounded-lg"
        >
          Report updated successfully!
          <template v-slot:action>
            <v-btn color="green" text @click="successMessageVisible = false" class="rounded-lg">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.v-row {
  display: flex;
  flex-wrap: wrap;
}

.v-col {
  display: flex;
}

.v-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* Ensure cards take the full height */
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  color: #333;
  font-size: 18px;
}

.v-card-subtitle {
  color: #007bff;
  font-size: 14px;
}

.v-card-actions {
  margin-top: auto; /* Push actions to the bottom */
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
