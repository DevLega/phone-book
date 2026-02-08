import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 16px 0;

  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.8;
    color: #000000;
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

export default function Filter({ onChange }) {
  return (
    <Container>
      <p>Find contacts by name</p>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
      />
    </Container>
  )
}
