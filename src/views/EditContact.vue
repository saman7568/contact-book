<!-- src/views/EditContact.vue -->
<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Edit Contact</h2>
    <form @submit.prevent="submit">
      <input v-model="firstName" required class="input" />
      <input v-model="lastName" required class="input" />
      <input v-model="email" type="email" required class="input" />
      <button type="submit" class="btn">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getContacts, saveContacts } from '../utils/contacts'

const route = useRoute()
const router = useRouter()

const contacts = getContacts()
const contact = contacts.find(c => c.id === route.params.id)

const firstName = ref(contact.firstName)
const lastName = ref(contact.lastName)
const email = ref(contact.email)

const submit = () => {
  contact.firstName = firstName.value
  contact.lastName = lastName.value
  contact.email = email.value
  saveContacts(contacts)
  router.push(`/contact/${contact.id}`)
}
</script>

<style scoped>
.input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  background: #4ade80;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
</style>
