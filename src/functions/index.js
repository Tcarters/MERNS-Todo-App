import * as api from '../api'

export const readTodos = async () => {
    try {
        const { data } = await api.readTodos()
        return data    
    } catch (error) {
        console.log('Error read api data: ', error);
    }
}

export const createTodos = async (todo) => {
    try {
        const { data } = await api.createTodos( todo)
        return data;

    } catch (error) {
        console.log('Error create data: ', error);
    }
}

export const updateTodo = async (id, todo) => {
    try {
        const { data } = await api.updateTodo(id,todo)
        return data;

    } catch (error) {
        console.log('Error Updating data: ', error);
    }
}

export const deleteTodo = async (id) => {
    try {
        await api.deleteTodo(id)
        // return data;

    } catch (error) {
        console.log('Error while Deleting data: ', error);
    }
}