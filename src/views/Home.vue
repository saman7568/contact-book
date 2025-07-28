<!-- src/views/Home.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Contact Book</h1>
    <input
      v-model="search"
      placeholder="Search by name..."
      class="p-2 border rounded w-full mb-4"
    />

    <div v-for="contact in filteredContacts" :key="contact.id" class="mb-2">
      <router-link :to="`/contact/${contact.id}`" class="text-blue-500 hover:underline">
        {{ contact.lastName }}, {{ contact.firstName }}
      </router-link>
    </div>

    <router-link to="/add" class="inline-block mt-6 px-4 py-2 bg-green-500 text-white rounded">
      + Add Contact
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getContacts } from '../utils/contacts'

const search = ref('')
const contacts = ref(getContacts())

const filteredContacts = computed(() => {
  return contacts.value
    .filter(c =>
      (c.firstName + ' ' + c.lastName).toLowerCase().includes(search.value.toLowerCase())
    )
    .sort((a, b) => a.lastName.localeCompare(b.lastName))
})
</script>
