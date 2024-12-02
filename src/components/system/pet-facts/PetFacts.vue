
<script setup>
import { computed, ref } from 'vue'
import { usePetFactsStore } from '@/stores/petFacts'

// Access Pinia store
const petFactsStore = usePetFactsStore()

// Local search query to sync with the store
const search = ref(petFactsStore.searchQuery)

// Computed properties for filtered facts based on search query
const filteredFacts = computed(() => {
  return petFactsStore.filteredFacts.filter((fact) =>
    fact.fact.toLowerCase().includes(search.value.toLowerCase())
  )
})

// Update the search query in the store
const updateSearchQuery = () => {
  petFactsStore.setSearchQuery(search.value)
}

// Get dynamic icon color based on the fact
const getIconColor = (fact) => {
  return fact.toLowerCase().includes('cat') ? 'cat-icon' : 'dog-icon'
}
</script>

<template>
  <div class="about-title-wrapper mt-5 ms-5">
    <v-icon class="icon">mdi-paw</v-icon>
    <h4 class="about-title">PET FACTS</h4>
    <div class="line"></div>
  </div>
  <v-container fluid>
    <!-- Search Bar -->
    <v-row class="search-bar" justify="center" align="center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Search Dog & Cat Facts"
          outlined
          clearable
          prepend-inner-icon="mdi-magnify"
          append-icon="mdi-paw"
          @input="updateSearchQuery"
          class="search-field"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Facts Display (only shows if search is performed and results exist) -->
    <v-row class="facts-container" justify="center" v-if="filteredFacts.length > 0">
      <v-col cols="12" md="4" v-for="fact in filteredFacts" :key="fact.id">
        <v-card class="fact-card mb-4" elevation="3">
          <v-row no-gutters align="center">
            <!-- Dynamic Icon -->
            <v-col cols="3" class="icon-col">
              <v-icon large :class="getIconColor(fact.fact)">
                {{ fact.fact.toLowerCase().includes('cat') ? 'mdi-cat' : 'mdi-dog' }}
              </v-icon>
            </v-col>
            <v-col cols="9" class="text-col">
              <v-card-text>{{ fact.fact }}</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- No Results Message (only shows if no results match the search query) -->
    <v-row class="no-results-container" justify="center" v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="info" bordered color="brown-lighten-2">
          No facts found for "{{ search }}". Please try a different search.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Search Bar */
.search-bar {
  margin-top: 20px;
}

.search-field {
  background: linear-gradient(90deg, #faca71, #ffc069);
  border-radius: 16px;
  font-size: 16px;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 4px 8px;
}

.search-field .v-input__control {
  padding-left: 40px; /* Add padding for the inner icon */
  padding-right: 40px; /* Add padding for the append icon */
}

.search-field .v-input__prepend-inner {
  color: #854d0d; /* Dog icon color */
}

.search-field .v-input__append-inner {
  color: #f7990b; /* Cat icon color */
}

.search-field:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.search-field:focus-within {
  border: 2px solid #6c4811;
}

/* Facts Container */
.facts-container {
  margin-top: 20px;
}

/* No Results Container */
.no-results-container {
  margin-top: 20px;
}

/* Card Styles */
.fact-card {
  background-color: #fbeec3;
  border-radius: 12px;
  padding: 12px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
}

.fact-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Dynamic Icons */
.icon-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cat-icon {
  color: #f7990b; /* Red-orange for cats */
}

.dog-icon {
  color: #854d0d; /* Green for dogs */
}

.text-col {
  padding-left: 8px;
}

.v-card-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* Background */
body {
  background-color: #fffbf3;
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
