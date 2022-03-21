import axios from 'axios'

const base_url = '/api/persons'

const getAll = () => axios.get(base_url).then(response => response.data)

const create = newObject =>
  axios.post(base_url, newObject).then(response => response.data)

const deleteOne = id => axios.delete(`${base_url}/${id}`)

const updateOne = (id, newObject) =>
  axios.put(`${base_url}/${id}`, newObject).then(response => response.data)

const personService = { getAll, create, deleteOne, updateOne }

export default personService
