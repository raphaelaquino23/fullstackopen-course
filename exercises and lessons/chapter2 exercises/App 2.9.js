import { useState } from 'react'

const App = () => {
  const initialNumbers = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

  const [persons, setPersons] = useState(initialNumbers);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const addRecord = (event) => {
    event.preventDefault();
    const recordObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    // verify if record passed is already inside the phone book
    recordAlreadyExists(recordObject.name, recordObject.number) 
      ? alert(`number: ${recordObject.name} ${recordObject.number} already added`) 
      : setPersons(persons.concat(recordObject))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const recordAlreadyExists = (name, number) => {
    // check if number or name already exists
    return persons.find(value => value.name === name) 
    || persons.find(value => value.number === number) 
  }
  const newPersonsList = persons.filter(value => 
    value.name.toUpperCase().includes(newFilter.toUpperCase()) || value.number.includes(newFilter)
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <hr/>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addRecord}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/> <br/>
          <button type="submit">add</button>
        </div>
      </form>
      <hr/>
      <h2>Numbers</h2>
      {newPersonsList.map(value => 
        <p key={value.id}> {value.name} {value.number} </p> 
      )}
    </div>
  )
}

export default App