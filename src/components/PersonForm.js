const PersonForm = ({
  newName,
  newNumber,
  handleName,
  handleNumber,
  handleSubmit
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm
