import React, { useState } from 'react';

function TaskForm(props) {


  const [input, setInput] = useState('');
  const [nextId, setNextId] = useState(1);

 
  const handleChange = e => {
    setInput(e.target.value);
  };


  const handleSubmit = e => {
    e.preventDefault();

    const newTask = {
      id: nextId,
      text: input,
      completed: false
    }

    setNextId(nextId + 1);
    props.onSubmit(newTask);
    setInput('');
  }

  return (
    <div className='taskform'> 
    
      <form
        className=''
        onSubmit={handleSubmit}
      >
        <input
          className='taskinput'
          type='text'
          placeholder='Escriba la Tarea'
          name='text'
          value={input}
          onChange={handleChange}
        />
        <button className='buttont'>
          Crear Tarea
        </button>
      </form>
    </div>
  );
}

export default TaskForm;