import { useState } from 'react'

const Filter = ({search, handleSearch}) => {
  return (
    <div>
        filter shown with <input 
          value={search}
          onChange={handleSearch}
        />
      </div>
  )
}

const PersonForm = ({addPerson, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <h2>Add a new</h2>
        <div>
          name: <input
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
        number <input 
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({persons, search}) => {
  return (
    <ul>
        {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
    </ul>
  )  
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  )

}

export default App