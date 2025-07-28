<template>
  <div>
    <!-- Navigation Bar -->
    <nav class="nav-bar">
      <router-link to="/" class="home-button">🏠 Home</router-link>
    </nav>

    <!-- Main Content -->
    <div class="container">
      <div class="card">
        <h1>Contact Book</h1>

        <!-- Add New Contact -->
        <div class="add-contact">
          <input v-model="name" type="text" placeholder="Enter name" />
          <input v-model="number" type="text" placeholder="Enter number" />
          <input v-model="email" type="email" placeholder="Enter email" />
          <input v-model="postalCode" type="text" placeholder="Enter postal code" />
          <input v-model="address" type="text" placeholder="Enter address" />
          <button @click="addContact">+ Add Contact</button>
        </div>

        <!-- Saved Contacts Grid -->
        <div class="saved-contacts" v-if="contacts.length">
          <h2>Saved Contacts</h2>
          <div class="contacts-grid">
            <div v-for="(contact, index) in contacts" :key="index" class="contact-card">
              <!-- Display mode -->
              <div v-if="editIndex !== index">
                <h3>{{ contact.name }}</h3>
                <p><strong>Number:</strong> {{ contact.number }}</p>
                <p><strong>Email:</strong> {{ contact.email }}</p>
                <p><strong>Postal Code:</strong> {{ contact.postalCode }}</p>
                <p><strong>Address:</strong> {{ contact.address }}</p>
                <div class="card-buttons">
                  <button @click="startEdit(index)" class="edit-btn">Edit</button>
                  <button @click="deleteContact(index)" class="delete-btn">Delete</button>
                </div>
              </div>

              <!-- Edit mode -->
              <div v-else class="edit-contact">
                <input v-model="editContact.name" type="text" placeholder="Name" />
                <input v-model="editContact.number" type="text" placeholder="Number" />
                <input v-model="editContact.email" type="email" placeholder="Email" />
                <input v-model="editContact.postalCode" type="text" placeholder="Postal Code" />
                <input v-model="editContact.address" type="text" placeholder="Address" />
                <div class="card-buttons">
                  <button @click="saveEdit(index)" class="save-btn">Save</button>
                  <button @click="cancelEdit" class="cancel-btn">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p v-else class="no-contacts">No contacts yet. Add some!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const name = ref('')
const number = ref('')
const email = ref('')
const postalCode = ref('')
const address = ref('')
const contacts = ref([])

const editIndex = ref(null)
const editContact = reactive({
  name: '',
  number: '',
  email: '',
  postalCode: '',
  address: '',
})

function addContact() {
  if (
    name.value.trim() &&
    number.value.trim() &&
    email.value.trim() &&
    postalCode.value.trim() &&
    address.value.trim()
  ) {
    contacts.value.push({
      name: name.value,
      number: number.value,
      email: email.value,
      postalCode: postalCode.value,
      address: address.value,
    })
    name.value = ''
    number.value = ''
    email.value = ''
    postalCode.value = ''
    address.value = ''
  } else {
    alert('Please fill in all fields before adding.')
  }
}

function startEdit(index) {
  editIndex.value = index
  const contact = contacts.value[index]
  editContact.name = contact.name
  editContact.number = contact.number
  editContact.email = contact.email
  editContact.postalCode = contact.postalCode
  editContact.address = contact.address
}

function saveEdit(index) {
  if (
    editContact.name.trim() &&
    editContact.number.trim() &&
    editContact.email.trim() &&
    editContact.postalCode.trim() &&
    editContact.address.trim()
  ) {
    contacts.value[index] = { ...editContact }
    editIndex.value = null
  } else {
    alert('Please fill in all fields before saving.')
  }
}

function cancelEdit() {
  editIndex.value = null
}

function deleteContact(index) {
  if (confirm('Are you sure you want to delete this contact?')) {
    contacts.value.splice(index, 1)
  }
}
</script>

<style scoped>
/* Navigation bar */
.nav-bar {
  background-color: #42b983;
  padding: 16px;
  text-align: left;
}

.home-button {
  background-color: #2c3e50;
  color: white;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 17px;
  transition: background-color 0.3s ease;
}

.home-button:hover {
  background-color: #1f2f3d;
}

.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background: white;
  padding: 30px 35px 45px;
  border-radius: 14px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
}

h1 {
  text-align: center;
  margin-bottom: 35px;
  font-weight: 700;
  color: #333;
}

.add-contact input {
  display: block;
  width: 100%;
  margin: 12px 0 18px;
  padding: 14px 16px;
  border-radius: 10px;
  border: 1.8px solid #ccc;
  font-size: 17px;
  transition: border-color 0.25s ease;
}

.add-contact input:focus {
  border-color: #42b983;
  outline: none;
}

.add-contact button {
  display: block;
  width: 100%;
  padding: 16px 0;
  background-color: #42b983;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.add-contact button:hover {
  background-color: #369f6b;
}

.saved-contacts {
  margin-top: 50px;
}

.saved-contacts h2 {
  margin-bottom: 25px;
  color: #2e4c48;
  font-weight: 700;
  font-size: 28px;
  border-bottom: 3px solid #42b983;
  padding-bottom: 8px;
}

.contacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.contact-card {
  background-color: #f9faf9;
  border-radius: 16px;
  padding: 20px 25px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 230px;
  transition: transform 0.25s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
}

.contact-card h3 {
  margin: 0 0 15px;
  color: #2c3e50;
  font-weight: 700;
  font-size: 1.3em;
}

.contact-card p {
  margin: 6px 0;
  font-size: 1.05em;
  color: #444;
  line-height: 1.3;
}

.card-buttons {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.card-buttons button {
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9em;
  color: white;
}

.edit-btn {
  background-color: #3498db;
}

.edit-btn:hover {
  background-color: #2c80b4;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #b33225;
}

.edit-contact input {
  margin: 8px 0;
  padding: 10px 14px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  border: 1.8px solid #bbb;
  font-size: 16px;
}

.edit-contact .card-buttons {
  margin-top: 16px;
  justify-content: flex-start;
}

.save-btn {
  background-color: #2ecc71;
  margin-right: 12px;
}

.save-btn:hover {
  background-color: #27ae60;
}

.cancel-btn {
  background-color: #40c0c9;
}

.cancel-btn:hover {
  background-color: #606f70;
}

.no-contacts {
  margin-top: 50px;
  font-style: italic;
  text-align: center;
  color: #666;
  font-size: 1.2em;
}
</style>
