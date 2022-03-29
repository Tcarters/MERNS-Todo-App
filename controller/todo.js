const  Todo  = require ('../models/todos');


const mongoose = require ('mongoose');

const readTodos = async(req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch(error) {
        res.status(200).json({ error: error.message })
    }
}

const createTodos = async(req, res) => {
    const todo = new Todo(req.body);
    try {
        await todo.save();
        res.status(201).json(todo);
    } catch(error) {
        res.status(409).json({ error: error.message })
    }
}

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const {title, content} = req.body;
    if (! mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`The id ${id} is not valid `);
    }
    const todo = { title, content, _id:id};
    await Todo.findByIdAndUpdate(id, todo,
        {new: true})
    res.json(todo);
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`The id ${id} is not valid `);
    }
    // const todo = { title, content, _id:id};
    await Todo.findByIdAndRemove(id); // , todo, {new:true})
    
    res.json({message: 'Todo deleted successfully'});

}

module.exports = { readTodos, createTodos, updateTodo, deleteTodo }