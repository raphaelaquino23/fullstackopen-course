import { useEffect, useState } from 'react'
import contactsService from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    contactsService.getAll().then((initializePersons) => {
      setPersons(initializePersons);
    });
  });

  const updateRecord = (name, number) => {
    const person = persons.find(person => person.name === name)
    const changedNote = { ...person, number: number}

    contactsService
      .update(person.id, changedNote)
      .then(returnedNote => {
        setPersons(persons.map(person => person.id !== person.id ? person : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${person.content}' was already deleted from server`
        )
        setPersons(persons.filter(n => n.id !== person.id))
      })
  }

  const addRecord = (event) => {
    event.preventDefault();
    const recordObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    recordAlreadyExists(recordObject.name, recordObject.number)
      ? window.confirm(
          `number: ${recordObject.name} already added to phonebook, replace old number with new one?`
        )
        ? updateRecord(recordObject.name, recordObject.number)
        : contactsService.create(recordObject).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewNumber("");
            setNewName("");
          })
      : contactsService.create(recordObject).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewNumber("");
          setNewName("");
        });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleDelete = ({ name, id }) => {
    window.confirm(`Delete ${name} ?`) ?
    contactsService.remove(id) : console.log('not deleting. . .')
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
      <hr />
      <div>
        filter shown with{" "}
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addRecord}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br />
          number: <input value={newNumber} onChange={handleNumberChange} />{" "}
          <br />
          <button type="submit">add</button>
        </div>
      </form>
      <hr />
      <h2>Numbers</h2>
      {newPersonsList.map((value) => (
        <li>
          {value.name} {value.number} {' '}
          <button onClick={() => handleDelete(value)}>delete</button>
        </li>
      ))}
    </div>
  );
}

export default App