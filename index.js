
const express = require("express")
const app = express()

const characters = [
  {
    id: 0,
    name: "Ezio Auditore",
    era: "Renaissance Italy",
    role: "Assassin"
  },
  {
    id: 1,
    name: "Altaïr Ibn-La'Ahad",
    era: "Third Crusade",
    role: "Assassin"
  },
  {
    id: 2,
    name: "Edward Kenway",
    era: "Golden Age of Piracy",
    role: "Pirate / Assassin"
  }
]

// 4. Logging Middleware
app.use((req, res, next) => {
  console.log(req.method + " " + req.path)
  next()
})

app.get("/", (req, res) => {
    res.status(200).send(`
    <h1>Assassin's Creed API</h1>
    <p>Welcome to the Assassin's Creed API server.</p>
    <p>Visit <a href="/docs">/docs</a> to see documentation.</p>
  `)
})

app.get("/docs", (req, res) => {
    res.status(200).send(`
        <h1>API Documentation</h1>
        <p>Available Endpoints:</p>
        <ul>
            <li>GET /characters -> Returns all characters</li>
            <li>GET /characters/:id -> Returns a specific character</li>
        </ul>
        `)
})

app.get("/characters", (req, res) =>{
    res.status(200).send(characters)
})

app.get("/characters/:id", (req, res)=>{
    const id = req.params.id
    const character = characters[id]

    if (character) {
       return res.send(200).send(character)
    } else {
        return res.send(404).send({error: "Character not found"})
    }
})

app.use((req, res) => {
    res.status(404).send(`
        <h1>404 - Page Not Found</h1>
        <p>The route you are looking for does not exist</p>`)
})


app.listen(3000, () => {
  console.log("Server running on port 3000")
})