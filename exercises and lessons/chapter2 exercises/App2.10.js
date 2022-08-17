import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <li>{name} {number}</li>
  )
}

const Filter = ({ newFilter, setNewFilter }) => {
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return(
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, setPersons, persons }) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addRecord = (event) => {
    event.preventDefault();
    const recordObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    // verify if record passed is already inside the phone book
    recordAlreadyExists(recordObject.name, recordObject.number) 
      ? alert(`409 Conflict! ${recordObject.name} ${recordObject.number} already exists`) 
      : setPersons(persons.concat(recordObject))
  }

  const recordAlreadyExists = (name, number) => {
    // check if number or name already exists
    return persons.find(value => value.name === name) 
    || persons.find(value => value.number === number) 
  }

  return(
    <form onSubmit={addRecord}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/> <br/>
      number: <input value={newNumber} onChange={handleNumberChange}/> <br/>
      <button type="submit">add</button>
    </div>
    </form>
  )
}

const Persons = ({ persons, newFilter }) => {
  const newPersonsList = persons.filter(value => 
    value.name.toUpperCase().includes(newFilter.toUpperCase()) || value.number.includes(newFilter)
  )
  return (
    <div>
      {newPersonsList.map(value => 
        <Person key={value.id} name={value.name} number={value.number} />
      )}
    </div>
  );
};

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


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>
      <h3>Add a new record</h3>
      <PersonForm 
        newName={newName} 
        setNewName={setNewName} 
        setNewNumber={setNewNumber} 
        setPersons={setPersons} 
        newNumber={newNumber} 
        persons={persons}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter}/>
    </div>
  )
}

export default App