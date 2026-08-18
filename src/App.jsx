import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import { addContact, deleteContact, fetchContacts } from './redux/operations'
import {
  setFilter,
  selectContacts,
  selectFilteredContacts,
  selectFilter,
  selectStatus,
  selectError,
} from './redux/contactsSlice'

function App() {
  const dispatch = useDispatch()

  const contacts = useSelector(selectContacts)
  const visibleContacts = useSelector(selectFilteredContacts)
  const filter = useSelector(selectFilter)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  const handleCreate = (name, number) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    )
    if (isExist) {
      alert(`${name} is already in contacts`)
      return
    }
    dispatch(addContact({ name, number }))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleCreate} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={(value) => dispatch(setFilter(value))} />

      {status === 'loading' && <p>Loading contacts...</p>}
      {status === 'failed' && <p>Failed to load contacts: {error}</p>}
      {status === 'succeeded' && visibleContacts.length === 0 && (
        <p>No contacts found.</p>
      )}

      <ContactList
        contacts={visibleContacts}
        onDelete={(id) => dispatch(deleteContact(id))}
      />
    </div>
  )
}

export default App
