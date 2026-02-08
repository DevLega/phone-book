import React, { Component } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  max-width: 320px;

  border-radius: 12px;
  background: #111;
  color: #fff;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h3 {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
  }

  input {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #333;
    background: #1a1a1a;
    color: #fff;

    &:focus {
      outline: none;
      border-color: #4caf50;
    }
  }
`

const Button = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  background: #4caf50;
  color: #000;
  font-weight: 600;

  transition: transform 0.1s ease, opacity 0.1s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.97);
  }
`

export default class ContactForm extends Component {
  state = {
    name: '',
    number: ''
  }

  handleSubmit = (e) => {
    const { name, number } = this.state
    e.preventDefault()

    if (!name.trim() || !number.trim()) return

    this.props.onSubmit(name, number)

    this.setState({
      name: '',
      number: '',
    })
  }

  render() {
    const { name, number } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>
          <h3>Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </Label>

        <Label>
          <h3>Number</h3>
          <input
            type="text"
            value={number}
            onChange={(e) => this.setState({ number: e.target.value })}
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </Form>
    )
  }
}