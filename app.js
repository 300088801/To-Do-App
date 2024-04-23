
const express = require('express')
const app = express()
const { getConnection, ObjectId} = require('./ToDo-db')

const port = process.env.PORT || 3005

app.use(express.json())
app.use(express.static('public'))

const todos = [
	{ id: 1, item: 'Learn JavaScript', complete: false },
	{ id: 2, item: 'Learn Express', complete: false },
	{ id: 3, item: 'Build a To Do App', complete: false }]

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})



// GET /api/todos

app.get('/api/todos', async (request,response) => {
	const collection = await getConnection('todo-api', 'todos')
	const todos =  await collection.find().toArray()
	console.log(todos)
	response.json(todos)
})

// POST /api/todos
app.post('/api/todos', async (request,response) => {
	const { item } = request.body
	const complete = false;
	const newToDo = { complete, item}
	const collection = await getConnection('todo-api', 'todos')
	await collection.insertOne(newToDo)
	console.log(request)
	response.json({ message : "New Todo Added!" })
})


// PUT /api/todos/:id
app.put('/api/todos/:id', async (request,response,) => {
	
	const { body, params } = request
	const { id } = params

	const collection = await getConnection('todo-api', 'todos')
	const todo = await collection.findOne({ _id: new ObjectId(id) })
	const complete = !todo.complete
	const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })

	response.json(result)

})


const message = `Server running: http://localhost:${port}`
app.listen(port, () => console.log(message))