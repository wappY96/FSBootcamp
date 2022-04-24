import { useState,useEffect } from 'react'
import personServices from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

let CONTADOR = 4

const App = () => {
  
  const [persons, setPersons] = useState([ ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const updatePerson = (person) => {
    if(window.confirm(`${person.name} is already added to phonebook, replace the old one number with a new one?`))
      personServices.updatePerson(person.id,person)      
      window.location.reload()
  }

  const createPerson = (person) => {
    personServices
    .createPerson(person)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: ++CONTADOR,
      name: newName,
      number: newNumber,
    }
    persons.map(person => person.name).includes(newName) ? 
      updatePerson(personObject) : 
      createPerson(personObject)      
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App