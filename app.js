
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))

const todos = [
	{ id: 1, item: 'Learn JavaScript', complete: false },
	{ id: 2, item: 'Learn Express', complete: false },
	{ id: 3, item: 'Build a To Do App', complete: false }
]

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})



// GET /api/todos

app.get('/api/todos', (request,response) => {
	
})

// POST /api/todos

// PUT /api/todos/:id



const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))