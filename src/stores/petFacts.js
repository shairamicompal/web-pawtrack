import { defineStore } from 'pinia';

export const usePetFactsStore = defineStore('petFacts', {
  state: () => ({
    facts: [
      // Cat Facts
      { id: 1, fact: 'Cats sleep for 70% of their lives.' },
      { id: 2, fact: 'Cats can jump up to six times their body length.' },
      { id: 3, fact: 'Cats use their whiskers to detect objects and navigate tight spaces.' },
      { id: 4, fact: 'Cats have five toes on their front paws but only four on their back paws.' },
      { id: 5, fact: 'Cats purr at a frequency that promotes healing in bones and tissues.' },
      { id: 6, fact: 'Cats can rotate their ears 180 degrees.' },
      { id: 7, fact: 'A group of cats is called a clowder.' },
      { id: 8, fact: 'Cats have a third eyelid called the haw.' },
      { id: 9, fact: 'Each cat’s nose print is unique, like a human fingerprint.' },
      { id: 10, fact: 'Cats can make over 100 different sounds.' },

      // Dog Facts
      { id: 11, fact: 'Dogs have a sense of smell that is 40 times better than humans.' },
      { id: 12, fact: 'Dogs can learn more than 1,000 words.' },
      { id: 13, fact: 'A dog’s nose print is as unique as a human fingerprint.' },
      { id: 14, fact: 'Dogs dream just like humans, often about activities they do during the day.' },
      { id: 15, fact: 'A dog’s hearing is four times more sensitive than a human’s.' },
      { id: 16, fact: 'Dogs have three eyelids, including one to keep their eyes moist.' },
      { id: 17, fact: 'The Basenji dog is known as the “barkless dog” because it doesn’t bark.' },
      { id: 18, fact: 'Dogs sweat through their paw pads.' },
      { id: 19, fact: 'A Greyhound can run up to 45 miles per hour.' },
      { id: 20, fact: 'Puppies are born blind, deaf, and toothless.' },

      // Bonus Unique Facts
      { id: 21, fact: 'The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.' },
      { id: 22, fact: 'Dogs are as intelligent as a two-year-old child and can understand about 250 words.' },
      { id: 23, fact: 'Cats can’t taste sweetness due to a genetic deficiency.' },
      { id: 24, fact: 'Dalmatian puppies are born completely white and develop their spots as they grow.' },
    ],
    searchQuery: '',
  }),
  getters: {
    filteredFacts(state) {
      return state.searchQuery
        ? state.facts.filter((fact) =>
            fact.fact.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
        : state.facts;
    },
  },
  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },
  },
});
