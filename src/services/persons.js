import axios from "axios";

const base_url = "http://localhost:3001/persons";

const getAll = () => axios.get(base_url).then((response) => response.data);

const create = (newObject) =>
  axios.post(base_url, newObject).then((response) => response.data);

const personService = { getAll, create };

export default personService;
