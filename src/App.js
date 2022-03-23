import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(
    () =>
      personService.getAll().then(initialPersons => setPersons(initialPersons)),
    []
  )

  const handleName = event => setNewName(event.target.value)

  const handleNumber = event => setNewNumber(event.target.value)

  const handleFilter = event => setFilter(event.target.value)

  const handleSubmit = event => {
    event.preventDefault()

    const personObject = { name: newName, number: newNumber }
    const personNames = persons.map(person => person.name)

    if (personNames.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = persons.filter(person => person.name === newName)[0].id

        return personService
          .updateOne(id, personObject)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== id ? person : returnedPerson
              )
            )
            setNewName('')
            setNewNumber('')
          })
      }

      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setSuccessMessage(null), 5000)
      })
      .catch(error => {
        if (error.response.data.error.includes('minimum allowed length')) {
          setErrorMessage('minimum length of name should be 3')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      })
  }

  const deletePerson = id => {
    const name = persons.filter(person => person.id === id)[0].name
    const deletePerson = persons.filter(person => person.id !== id)

    if (window.confirm(`Delete ${name}`)) {
      personService
        .deleteOne(id)
        .then(deletedPerson => setPersons(deletePerson))
        .catch(error => {
          setErrorMessage(
            `Information of '${name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(deletePerson)
        })
    }
  }

  const filetedPersons = persons.filter(person =>
    person.name.match(new RegExp(filter, 'i'))
  )
  const personsToShow = filetedPersons.length ? filetedPersons : []

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success={successMessage} error={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filter ? personsToShow : persons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
