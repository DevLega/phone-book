import { Component } from 'react'
import './App.css'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import ContactList from './components/ContactList'

class App extends Component {

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  }

  deleteContact = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter(contact => contact.id !== id)
    }))
  }


  createContact = (name, number) => {
    const normalizedName = name.toLowerCase()

    const isExist = this.state.contacts.some(
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
    this.setState((prev) => ({
      contacts: [...prev.contacts, newContact]
    }))
  }

  changeFilter = (value) => {
    this.setState({ filter: value })
  }

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.createContact} />

        <h2>Contacts</h2>
        <Filter onChange={this.changeFilter} />
        <ContactList filter={this.state.filter} contacts={this.state.contacts} onDelete={this.deleteContact} />
      </div>
    )
  }

}

export default App
