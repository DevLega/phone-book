import { useState, useEffect } from 'react'
import './App.css'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'

const STORAGE_KEY = 'contacts'

function App() {

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem(STORAGE_KEY)

    if (savedContacts) {
      return JSON.parse(savedContacts)
    }

    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  })

  const [filter, setFilter] = useState('')


  useEffect(() => {
    const savedContacts = localStorage.getItem(STORAGE_KEY)

    if (savedContacts) {
      setContacts(JSON.parse(savedContacts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(contacts)
    )
  }, [contacts])

  const deleteContact = (id) => {
    setContacts(prev =>
      prev.filter(contact => contact.id !== id)
    )
  }

  const createContact = (name, number) => {
    const normalizedName = name.toLowerCase()

    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    )

    if (isExist) {
      alert(`${name} is already in contacts`)
      return
    }

    const newContact = {
      id: Date.now(),
      name,
      number
    }

    setContacts(prev => [...prev, newContact])
  }

  const changeFilter = (value) => {
    setFilter(value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={createContact} />

      <h2>Contacts</h2>
      <Filter onChange={changeFilter} />
      <ContactList
        filter={filter}
        contacts={contacts}
        onDelete={deleteContact}
      />
    </div>
  )
}

export default App
