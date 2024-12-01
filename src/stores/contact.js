import { defineStore } from 'pinia';

export const useContactStore = defineStore('contact', {
  state: () => ({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  }),
  actions: {
    resetForm() {
      this.fullName = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    },
  },
});
