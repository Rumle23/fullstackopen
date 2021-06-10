const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const fs = require('fs');
const cors = require('cors')

const MAXID = 1000000
const PORT = process.env.PORT || 3001

let rawdata = fs.readFileSync('db.json');
let persons = JSON.parse(rawdata).persons;

morgan.token('body', function (req, res) {
    if(req.body) {
        return JSON.stringify(req.body)
    }
    else {
        return ""
    }
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


const generateId = () => {
    let id = Math.floor(Math.random() * (MAXID + 1))
    while(persons.find(person => person.id === id)) {
        id = Math.floor(Math.random() * (MAXID + 1))
    }
    return id
}

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    response.send(`
    <div><span>Phonebook has info for ${persons.length} people </span></div>
    <span>${Date().toString()}</span>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)

    response.status(204).end()
})

app.post("/api/persons/", (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: "name or number missing"
        })
    }

    if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})