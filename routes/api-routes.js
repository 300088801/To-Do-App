const router = require('express').Router()
const { getConnection, ObjectId} = require('../ToDo-db')

// GET /api/todos
router.get('/', async (request,response) => {
	const collection = await getConnection('todo-api', 'todos')
	const todos =  await collection.find().toArray()
	console.log(todos)
	response.json(todos)
})

// POST /api/todos
router.post('/', async (request,response) => {
	const { item } = request.body
	const complete = false;
	const newToDo = { complete, item}
	const collection = await getConnection('todo-api', 'todos')
	await collection.insertOne(newToDo)
	console.log(request)
	response.json({ message : "New Todo Added!" })
})


// PUT /api/todos/:id
router.put('/:id', async (request,response,) => {
	
	const { body, params } = request
	const { id } = params

	const collection = await getConnection('todo-api', 'todos')
	const todo = await collection.findOne({ _id: new ObjectId(id) })
	const complete = !todo.complete
	const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })

	response.json(result)

})

module.exports = router