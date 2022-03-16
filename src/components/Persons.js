const Persons = ({ persons }) => (
  <div>
    {persons.length ? (
      persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))
    ) : (
      <div>No contact found!</div>
    )}
  </div>
);

export default Persons;
