<!-- src/views/ContactDetail.vue -->
<template>
  <div class="p-6">
    <div v-if="contact">
      <h2 class="text-xl font-bold mb-2">{{ contact.firstName }} {{ contact.lastName }}</h2>
      <p><strong>Email:</strong> {{ contact.email }}</p>

      <router-link :to="`/edit/${contact.id}`" class="btn mr-2">Edit</router-link>
      <button @click="remove" class="btn bg-red-500">Delete</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { getContacts, deleteContact } from '../utils/contacts'

const route = useRoute()
const router = useRouter()
const contact = ref(getContacts().find(c => c.id === route.params.id))

const remove = () => {
  deleteContact(contact.value.id)
  router.push('/')
}
</script>

<style scoped>
.btn {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
</style>
