const Filter = ({ filter, handleFilter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleFilter} />
  </div>
)

export default Filter
