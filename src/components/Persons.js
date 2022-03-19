const Persons = ({ persons, deletePerson }) => {
  console.log(persons)
  return (
    <div>
      {persons ? (
        persons.map(person => (
          <div key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
        ))
      ) : (
        <div>No contact found!</div>
      )}
    </div>
  )
}

export default Persons
