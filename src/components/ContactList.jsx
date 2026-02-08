import React from 'react'
import styled from 'styled-components'

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  margin: 0;
`

const Contact = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 8px 12px;
  border-radius: 10px;
  background: #1a1a1a;
  color: #fff;
`

const Info = styled.p`
  margin: 0;
  font-size: 14px;
`

const Button = styled.button`
  padding: 4px 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;

  background: #ff5252;
  color: #000;
  font-size: 12px;
  font-weight: 600;

  &:hover {
    opacity: 0.85;
  }
`

export default function ContactList({ filter, contacts, onDelete }) {
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <List>
      {visibleContacts.map(contact => (
        <Contact key={contact.id}>
          <Info>{contact.name}: {contact.number}</Info>
          <Button onClick={() => onDelete(contact.id)}>Delete</Button>
        </Contact>
      ))}
    </List>
  )
}
