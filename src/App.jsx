import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import { addContact, deleteContact, setFilter } from './redux/actions'
import { selectContacts, selectFilter } from './redux/selector'

function App() {
  const dispatch = useDispatch()
  const contacts = useSelector(selectContacts)
  const filter = useSelector(selectFilter)

  const handleCreate = (name, number) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    )
    if (isExist) {
      alert(`${name} is already in contacts`)
      return
    }
    dispatch(addContact(name, number))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleCreate} />

      <h2>Contacts</h2>
      <Filter onChange={(value) => dispatch(setFilter(value))} />
      <ContactList
        filter={filter}
        contacts={contacts}
        onDelete={(id) => dispatch(deleteContact(id))}
      />
    </div>
  )
}

export default App