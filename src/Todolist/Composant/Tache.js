import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/tache.css';

const Task = ({ task, deleteTask, setEditingTask }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleCompletion = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={`task ${isCompleted ? 'completed' : ''}`}>
      <div className="task-checkbox checkbox-wrapper-26">
        <input
          type="checkbox"
          id={`checkbox-${task.id}`}
          checked={isCompleted}
          onChange={toggleCompletion}
        />
        <label htmlFor={`checkbox-${task.id}`}>
          <div className="tick_mark"></div>
        </label>
      </div>
      <div className="task-details">
        <h3>{task.name}</h3>
        <p>Date: {task.date}</p>
        <p>Heure: {task.time}</p>
      </div>
      <div className="task-actions">
        <button onClick={() => setEditingTask(task)}>
        <img src="./medias/testmofid.png" alt="Edit" />
        </button>
        <button onClick={() => deleteTask(task.id)}>
        <img src="./medias/supprimer.png" alt="Edit"  />
        </button>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  setEditingTask: PropTypes.func.isRequired,
};

export default Task;
