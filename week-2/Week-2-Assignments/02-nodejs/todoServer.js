const express = require('express');
const bodyParser = require('body-parser');
const { map } = require('./solutions/todoServer.solution.simple');
const app = express();
const port = 3001
app.use(express.json());



var TodoArray = [{
  "title": "ccBuys groceries",
  "completed":false,
  "description": "I should buy groceries",
  "id":555
},
{
  "title": "ccBuys groceries",
  "completed":false,
  "description": "I should buy groceries",
  "id":111
}]


function CheckAvailableList (req){
  const FindItem = TodoArray.find(item => item.title === req.body.title)
  return FindItem;
}

// Add Items in Array
app.post('/todos',(req,res)=>{
  // console.log("Finnnnn",CheckAvailableList(req))
  if (!CheckAvailableList(req)){
    TodoArray.push( {...req.body,id: Math.floor(Math.random()*1000) })
    res.status(200).send({message : "Added", array: TodoArray})
  }
  else{
    res.status(400).send("Item Already Present")
  }
})

// Get Items from array
app.get('/todos',(req, res)=>{
  res.status(200).send(TodoArray)
})

// Update Array
app.put('/todos/:id', async(req, res) => {
  const id = req.params.id
  const ItemIndex = TodoArray.findIndex((obj => obj.id == req.params.id))
  // const updatedData = req.body; // Assuming you're sending JSON data in the request body
  TodoArray[ItemIndex].title = req.body.title,
  TodoArray[ItemIndex].description = req.body.description,
  TodoArray[ItemIndex].completed = req.body.completed,


  // Your update logic here
  res.status(200).send({message:"Data Updated",Array: TodoArray});
});

// Delete Array 
app.delete('/todos/:id', (req, res) => {
  TodoArray = TodoArray.filter((obj => obj.id != req.params.id))
  res.status(200).send({message: "Deleted Successfully", Array: TodoArray})
})

/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */


// app.use(bodyParser.json());

// module.exports = app;

function Started(){
  console.log(`Server Started on ${port}`)
}

app.listen(port, Started)