<!-- src/views/AddContact.vue -->
<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Add New Contact</h2>
    <form @submit.prevent="submit">
      <input v-model="firstName" placeholder="First Name" required class="input" />
      <input v-model="lastName" placeholder="Last Name" required class="input" />
      <input v-model="email" type="email" placeholder="Email" required class="input" />
      <button type="submit" class="btn">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addContact } from '../utils/contacts'

const router = useRouter()
const firstName = ref('')
const lastName = ref('')
const email = ref('')

const submit = () => {
  const newContact = {
    id: Date.now().toString(),
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  }
  addContact(newContact)
  router.push(`/contact/${newContact.id}`)
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
