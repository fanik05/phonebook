import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

    if (persons.map(person => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = persons.filter(person => person.name === newName)[0].id
        const updatedPersonObject = { name: newName, number: newNumber }

        return personService
          .updateOne(id, updatedPersonObject)
          .then(updatedPerson => {
            const index = persons.findIndex(person => person.id === id)
            const copyPersons = persons.slice()
            copyPersons[index] = updatedPerson
            setPersons(copyPersons)
            setNewName('')
            setNewNumber('')
          })
      }

      return
    }

    const personObject = { name: newName, number: newNumber }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson.data))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = id => {
    if (
      window.confirm(
        `Delete ${persons.filter(person => person.id === id)[0].name}`
      )
    ) {
      personService
        .deleteOne(id)
        .then(deletedPerson =>
          setPersons(persons.filter(person => person.id !== id))
        )
    }
  }

  const personsToShow = () => {
    return persons.filter(person => person.name.match(new RegExp(filter, 'i')))
      .length
      ? persons.filter(person => person.name.match(new RegExp(filter, 'i')))
      : []
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        persons={filter ? personsToShow() : persons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
