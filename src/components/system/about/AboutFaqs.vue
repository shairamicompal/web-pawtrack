<script setup>
import { ref } from 'vue';

const activeIndex = ref(null);

const faqs = [
  {
    question: "How do I report a lost pet?",
    answer:
      "To report a lost pet, go to the 'Lost Pets' section in our system and provide details such as pet's name, breed, color, and the location where it was last seen.",
  },
  {
    question: "How often are reports updated?",
    answer: "Reports are updated in real-time as users submit new entries.",
  },
  {
    question: "Can I search for found pets in a specific area?",
    answer:
      "Yes, you can search for found pets by location. Use the filters in the 'Found Pets' section to narrow down the results.",
  },
  {
    question: "What details should I include for a found pet report?",
    answer:
      "Include as much detail as possible, such as the pet's appearance, breed, estimated age, collar details, and the location where the pet was found.",
  },
];

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <v-container>
    <v-row>
      <!-- FAQ Section -->
      <v-col :cols="12" :md="6" :lg="6">
        <div class="faq-accordion">
          <h2>Frequently Asked Questions</h2>
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <div class="faq-question" @click="toggleAccordion(index)">
              <h3>{{ faq.question }}</h3>
              <span class="faq-toggle-icon">
                {{ activeIndex === index ? '-' : '+' }}
              </span>
            </div>
            <div v-if="activeIndex === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </v-col>

      <!-- Carousel Section -->
      <v-col :cols="12" :md="6" :lg="6" class="mt-15 car-sec">
        <v-container class="mt-2">
          <v-carousel cycle hide-delimiters height="300px">
            <v-carousel-item>
              <v-img src="/images/carousel-1.jpg" class="carousel-image" cover></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img src="/images/carousel-4.jpg" class="carousel-image" cover></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img src="/images/carousel-3.jpg" class="carousel-image" cover></v-img>
            </v-carousel-item>
            <v-carousel-item>
              <v-img src="/images/carousel-5.jpg" class="carousel-image" cover></v-img>
            </v-carousel-item>
          </v-carousel>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.faq-accordion {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.faq-item {
  border-bottom: 1px solid #9c791e;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  background: #966d20;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.2rem;
}

.faq-toggle-icon {
  font-size: 1.5rem;
}

.faq-answer {
  padding: 10px;
  background: #7b6a30;
  border-left: 3px solid #44423b;
  font-size: 1rem;
}

.carousel-image {
  border-radius: 8px;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
