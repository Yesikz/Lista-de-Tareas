import React, { useState } from 'react';
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

function Task({ id, text, completed, completeTask, deleteTask, editTask }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleSaveEdit = () => {
    editTask(id, newText);
    setEditing(false);
  };

  const handleEditClick = () => {
    editTask(id, text);
  };

  return (
    <div className={completed ? 'task-container completed' : 'task-container'}>
      {editing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Guardar</button>
        </div>
      ) : (
        <div className='taskText' onClick={() => completeTask(id)}>
          {text}
        </div>
      )}
      <div className='taskIcons' onClick={() => deleteTask(id)}>
        <AiTwotoneDelete className='Icon' /> 
      </div>
      <div>
        <AiTwotoneEdit className='Icon' onClick={handleEditClick} />
      </div>
    </div>
  );
}

export default Task;