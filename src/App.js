import React, { useEffect, useState } from "react";
import { readTodos, createTodos, deleteTodo, updateTodo } from "./functions";
import Preloader from "./components/Preloader";
// import { deleteTodo, updateTodo } from "./api";
// import { remove } from "../../server/models/todos";
// import { createTodos } from "./api";

const  App = ()  =>  {
    const [todo, setTodo] = useState({ title: '', content: '' });
    const [newtodo, setNewtodo] = useState(null);
    const [currentId, setCurrentid] = useState(0);
    

    useEffect( () => {
        let currentTodo  = currentId !== 0 ? newtodo.find(todo => todo._id === currentId) : {title: '', content: ''};
        setTodo(currentTodo);
    }, [currentId])

    useEffect ( () => {
        const fetchData = async () => {
            const result = await readTodos();
            // console.log('Ans read :',result);
            // setTodo(result);
            setNewtodo(result);
        }
        fetchData();
    }, [currentId]);

    const clear = () => {
        setCurrentid(0);
        setTodo({ title: '', content: '' });
    }

    useEffect( () => {
        const clearField = (e) => {
            if ( e.keyCode === 27 ){
                clear()
            } 
        }
        window.addEventListener('keydown', clearField)
        return () => window.removeEventListener('keydown', clearField)
    }, []);


    const onSubmitHandler = async(e) => {
        e.preventDefault();
        if (currentId === 0 ) {
            const result = await createTodos(todo)
            setNewtodo([...newtodo, result])
            clear();

            console.log(result);

        } else {
            await updateTodo(currentId, todo);
            clear();
        }

    }
    // console.log('content of newtodo', { todo})

    // create delete function
    const removeTodo = async(id) => {
        await deleteTodo(id);
        const result = await readTodos();
        setNewtodo(result);
        // const todosCopy = [...newtodo];
        // todosCopy.filter(todo => todo._id !== id);
        // setNewtodo(todosCopy);
    }

    
    return (
    <div className="container">
        <div className="row">
        {/* <pre>{JSON.stringify(todo)} </pre> // was used for testing */}
            <form className="col s12" onSubmit={onSubmitHandler}>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">title</i>
                        <input id="icon_prefix" type="text" className="validate"
                        value={todo.title}
                         onChange={ e => setTodo({ ...todo,
                         title: e.target.value})} />

                        <label htmlFor="icon_prefix">Title </label>
                    </div>
                    
                    <div className="input-field col s6">
                        <i className="material-icons prefix">description</i>
                        <input id="description" type="tel" className="validate" 
                        value={todo.content}
                        onChange={ e => setTodo({ ...todo,
                            content: e.target.value}) }/>
                        <label htmlFor="description">Content</label>
                    </div>
                </div> { /* // end row --> */}
                <div className="row right-align">
                     <button className="waves-effect waves-light btn">
                            Submit
                     </button>
                     
                </div>
            </form>
            {
                !newtodo ? <Preloader /> : newtodo.length > 0 ? <ul
                //<div>Loading Finish</div>
                  className="collection">
                    {newtodo.map (elemt => (
                        <li key = {elemt._id}
                            onClick={() => setCurrentid(elemt._id) }
                            className="collection-item">
                           <div> 
                               <h5>Title: {elemt.title}</h5>
                               <p>Content: {elemt.content}
                                    <a href='#!' 
                                        onClick={() => removeTodo(elemt._id) }
                                        className="secondary-content">
                                            
                                        <i className="material-icons">delete</i>
                                    </a> 
                               </p>
                            </div> 
                        </li>

                    ))}
                 </ul> : <div> 
                            <h5> Nothing to do</h5>
                        </div>
            }
            
        </div>
    </div>
    );
}

export default App;