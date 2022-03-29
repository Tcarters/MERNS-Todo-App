import axios from 'axios';

const url = "https://mernstodo.herokuapp.com/todos" 
//"http://localhost:5000/todos";

export const readTodos = () => axios.get(url);
export const createTodos =  newTodo => axios.post(url , newTodo);
export const updateTodo = (id, updatedTodo ) => axios.patch(`${url}/${id}`, updatedTodo);

// create a delete funct
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);