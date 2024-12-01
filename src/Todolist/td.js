import React, { useState } from 'react';
import Task from './Composant/Tache';
import TaskForm from './Composant/Formulaire';
import './styles/tache.css';
import './styles/todolist.css';
import './styles/MiseEnPage.css';

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const ToDoList = () => {
  const [tasksByDay, setTasksByDay] = useState({
    Lundi: [],
    Mardi: [],
    Mercredi: [],
    Jeudi: [],
    Vendredi: [],
    Samedi: [],
    Dimanche: []
  });
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // Index du jour actuel dans `daysOfWeek`
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    const dayInFrench = new Intl.DateTimeFormat('fr-FR', options).format(date);
    return dayInFrench.charAt(0).toUpperCase() + dayInFrench.slice(1); // Capitaliser
  };

  const addTask = (newTask) => {
    const dayFromDate = getDayFromDate(newTask.date); // Jour calculé à partir de la date

    if (editingTask) {
      setTasksByDay((prevTasks) => ({
        ...prevTasks,
        [dayFromDate]: prevTasks[dayFromDate].map((task) =>
          task.id === editingTask.id ? { ...task, ...newTask } : task
        )
      }));
      setEditingTask(null);
    } else {
      setTasksByDay((prevTasks) => ({
        ...prevTasks,
        [dayFromDate]: [...prevTasks[dayFromDate], { ...newTask, id: Date.now() }]
      }));
    }
    setIsFormVisible(false);
  };

  const deleteTask = (taskId, day) => {
    setTasksByDay((prevTasks) => ({
      ...prevTasks,
      [day]: prevTasks[day].filter((task) => task.id !== taskId)
    }));
  };

  const goToNextDay = () => {
    setCurrentDayIndex((currentDayIndex + 1) % daysOfWeek.length);
  };

  const goToPreviousDay = () => {
    setCurrentDayIndex((currentDayIndex - 1 + daysOfWeek.length) % daysOfWeek.length);
  };

  const currentDay = daysOfWeek[currentDayIndex];
  const tasksForCurrentDay = tasksByDay[currentDay] || [];

  return (
    <div className="todo-list">
      <h1 className="title">To do list</h1>
      <h2 className="subtitle">Commençons une journée productive, voici votre liste de tâches !</h2>

    
      <button className="add-task-btn" onClick={() => setIsFormVisible(true)}>Ajouter une tâche</button>

      {isFormVisible && (
        <TaskForm
          addTask={addTask}
          editingTask={editingTask}
          closeForm={() => {
            setIsFormVisible(false);
            setEditingTask(null);
          }}
        />
      )}

      <div className="week-navigation">
        <button onClick={goToPreviousDay} className="nav-btn">⬅️</button>
        <h3>{currentDay}</h3>
        <button onClick={goToNextDay} className="nav-btn">➡️</button>
      </div>

      <div className="tasks-for-day">
        {tasksForCurrentDay.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={() => deleteTask(task.id, currentDay)}
            setEditingTask={(taskToEdit) => {
              setEditingTask(taskToEdit);
              setIsFormVisible(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;

