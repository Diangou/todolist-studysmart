import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/formulaire.css';

const TaskForm = ({ addTask, updateTask, editingTask, closeForm }) => {
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
      setDate(editingTask.date);
      setTime(editingTask.time);
    } else {
      setTaskName('');
      setDate('');
      setTime('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTask) {
      updateTask({ ...editingTask, name: taskName, date, time });
    } else {
      addTask({ name: taskName, date, time });
    }

    setTaskName('');
    setDate('');
    setTime('');
    closeForm();
  };

  return (
    <div className="task-form">
      <div className="form-header">
        <h2>{editingTask ? 'Modifier la tâche' : 'Ajouter une tâche'}</h2>
        <button onClick={closeForm} className="close-btn">
        <img src="./medias/croix.png" alt="Edit" style={{ width: '18px', height: '21px' }} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom de la tâche</label>
          <input
            type="text"
            placeholder="Nom de la tâche"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <span className="date-icon"></span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Heure</label>
          <span className="time-icon"></span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button-32">
          {editingTask ? 'Modifier la tâche' : 'Ajouter la tâche'}
        </button>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  editingTask: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  closeForm: PropTypes.func.isRequired,
};

export default TaskForm;
