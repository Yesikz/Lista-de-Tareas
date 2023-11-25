import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import Swal from 'sweetalert2';


const TaskList = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [taskEditing, setTaskEditing] = useState({ id: null, text: '' });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = task => {
    if (task.text.trim()) {
      task.text = task.text.trim();
      const updatedTasks = [task, ...tasks];
      setTasks(updatedTasks);
      Swal.fire('Tarea Creada');
    }
  };

  const deleteTask = (id, text) => {
    Swal.fire({
      text:  `¿Quieres eliminar la tarea?, recuerde que no podra recuperarla`,
      showCancelButton: true,
      confirmButtonColor: 'rgb(230, 140, 201)',
      cancelButtonColor: 'rgb(142, 45, 233)',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        Swal.fire('Tarea Eliminada');
      }
    });
  };

  const completeTask = (id, text) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
        if (task.completed) {
          Swal.fire(`Tarea Completa`);
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (id, text) => {
    Swal.fire({
      title: 'Editar Tarea',
      input: 'text',
      inputValue: text, 
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'rgb(216, 140, 201)',
      cancelButtonColor: 'rgb(142, 45, 233)',
      showLoaderOnConfirm: true,
      preConfirm: (newText) => {
        if (newText.trim() === '') {
          Swal.showValidationMessage('El Texto no puede estar en Blanco');
        }
        return newText;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newText = result.value;
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex].text = newText;
          setTasks(updatedTasks);
          Swal.fire('La tarea fue modificada');
        }
      }
    });
  };
  return (
    <div className='task-list'>
      <h2>Lista de Tareas</h2>
      <TaskForm onSubmit={addTask} />
      <div className='contLTareas'>
        {tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
            completeTask={completeTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;


