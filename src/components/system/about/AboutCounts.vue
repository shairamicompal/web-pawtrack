<script setup>
import { ref, onMounted } from 'vue';
import { fetchReportCounts } from '@/utils/supabase'; // Adjust path if needed

// Reactive state variables for the stats
const total = ref(0);
const dogs = ref(0);
const cats = ref(0);

// Fetch the report counts when the component is mounted
onMounted(async () => {
  try {
    const { total: totalCount, dogs: dogCount, cats: catCount } = await fetchReportCounts();
    total.value = totalCount;
    dogs.value = dogCount;
    cats.value = catCount;
  } catch (error) {
    console.error('Error fetching report counts:', error);
  }
});
</script>

<template>
  <v-container fluid>
    <v-row justify="space-around" class="stats-section">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="stat-card" outlined>
          <v-card-text>
            <div class="icon-circle">
              <v-icon class="icon">mdi-chart-bar</v-icon>
            </div>
            <h2>{{ total }}</h2>
            <p>Total Reports</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="stat-card" outlined>
          <v-card-text>
            <div class="icon-circle">
              <v-icon class="icon">mdi-dog</v-icon>
            </div>
            <h2>{{ dogs }}</h2>
            <p>Dog Reports</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="stat-card" outlined>
          <v-card-text>
            <div class="icon-circle">
              <v-icon class="icon">mdi-cat</v-icon>
            </div>
            <h2>{{ cats }}</h2>
            <p>Cat Reports</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Section styling */
.stats-section {
  background-color: none;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

/* Card styling */
.stat-card {
  background-color: #e1c4a1; /* Soft beige background */
  color: #6d430f; /* Dark text for readability */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px); /* Lift effect on hover */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* More pronounced shadow */
}

/* Icon circle styling */
.icon-circle {
  width: 80px;
  height: 80px;
  background-color: #6d430f; /* Circle background */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px; /* Center and add spacing below */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Subtle shadow */
}

/* Icon styling */
.icon {
  font-size: 3em; /* Large size for prominence */
  color: white; /* Contrast against circle */
}

/* Text styling */
h2 {
  font-size: 2.5em;
  font-weight: bold;
}

p {
  font-size: 1.2em;
  margin-top: 5px;
  font-style: italic; /* Stylized descriptions */
}

/* Adjust text and card size for smaller screens */
@media (max-width: 960px) {
  h2 {
    font-size: 2em; /* Slightly smaller font size */
  }

  p {
    font-size: 1.1em; /* Adjust description font size */
  }

  .icon-circle {
    width: 70px;
    height: 70px;
  }

  .icon {
    font-size: 2.5em; /* Adjust icon size */
  }
}

@media (max-width: 600px) {
  h2 {
    font-size: 1.8em; /* Smaller font size for mobile */
  }

  p {
    font-size: 1em; /* Smaller description font */
  }

  .icon-circle {
    width: 60px;
    height: 60px;
  }

  .icon {
    font-size: 2em; /* Adjust icon size further */
  }
}
</style>
