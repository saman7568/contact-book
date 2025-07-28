const STORAGE_KEY = 'contacts'

export function getContacts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

export function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

export function addContact(contact) {
  const contacts = getContacts()
  contacts.push(contact)
  saveContacts(contacts)
}

export function deleteContact(id) {
  const contacts = getContacts().filter(c => c.id !== id)
  saveContacts(contacts)
}
