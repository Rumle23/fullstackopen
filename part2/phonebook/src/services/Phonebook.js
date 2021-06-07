import axios from "axios";
let baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = person => {
    return axios.post(baseUrl, person).then(response => response.data)
}

const deletePerson = person => {
    return axios.delete(`${baseUrl}/${person.id}`).then(response => response.data)
}

const update = person => {
    return axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)
}

export default {
  getAll,
  create,
  deletePerson,
  update,
}
