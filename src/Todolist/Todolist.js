import React, { useState, useEffect } from 'react';
import Task from './Composant/Tache';
import TaskForm from './Composant/Formulaire';
import './styles/tache.css';
import './styles/todolist.css';
import './styles/MiseEnPage.css';
import './styles/animationBubbles.scss';

const ToDoList = () => {
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles-container');
    particlesContainer.innerHTML = ''; // Nettoie les particules existantes

    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      particle.style.setProperty('--x-offset', `${Math.random() * 200 - 100}px`);
      particle.style.setProperty('--y-offset', `${Math.random() * 200 - 100}px`);

      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;

      particlesContainer.appendChild(particle);
    }
  }, []);

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [tasksByDay, setTasksByDay] = useState({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('jour');

  const getFormattedDate = (date) => {
    const options = { weekday: 'long', day: '2-digit', month: 'short' };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    }
    return formattedDate;
  };

  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek;
  };

  const getWeeklyDates = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      weekDates.push(currentDay);
    }
    return weekDates;
  };

  const addTask = (newTask) => {
    if (!newTask.date) return; // Validation de la date
    const taskDate = newTask.date;
    setTasksByDay((prevTasks) => ({
      ...prevTasks,
      [taskDate]: [...(prevTasks[taskDate] || []), { ...newTask, id: Date.now() }],
    }));
    setIsFormVisible(false);
  };

  const updateTask = (updatedTask) => {
    setTasksByDay((prevTasks) => {
      const newTasks = { ...prevTasks };

      // Supprimer la tâche de l'ancienne date si la date a changé
      const oldDate = editingTask.date; // Date avant modification
      const newDate = updatedTask.date; // Nouvelle date

      if (oldDate !== newDate) {
        // Supprimer de l'ancienne date
        if (newTasks[oldDate]) {
          newTasks[oldDate] = newTasks[oldDate].filter((task) => task.id !== updatedTask.id);
        }

        // Ajouter à la nouvelle date
        if (!newTasks[newDate]) {
          newTasks[newDate] = [];
        }
        newTasks[newDate].push(updatedTask);
      } else {
        // Sinon, simplement mettre à jour la tâche dans la liste existante
        newTasks[oldDate] = newTasks[oldDate].map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      }

      return newTasks;
    });

    // Réinitialiser l'état d'édition et fermer le formulaire
    setEditingTask(null);
    setIsFormVisible(false);
  };

  const deleteTask = (taskId, date) => {
    if (!tasksByDay[date]) return; // Vérifie si la date est valide
    setTasksByDay((prevTasks) => ({
      ...prevTasks,
      [date]: prevTasks[date].filter((task) => task.id !== taskId),
    }));
  };

  const goToNextDay = () => {
    setCurrentDate((prevDate) => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(prevDate.getDate() + 1);
      return nextDate;
    });
  };

  const goToPreviousDay = () => {
    setCurrentDate((prevDate) => {
      const prevDateObj = new Date(prevDate);
      prevDateObj.setDate(prevDate.getDate() - 1);
      return prevDateObj;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((prevDate) => {
      const nextWeek = new Date(prevDate);
      nextWeek.setDate(prevDate.getDate() + 7);
      return nextWeek;
    });
  };

  const goToPreviousWeek = () => {
    setCurrentDate((prevDate) => {
      const prevWeek = new Date(prevDate);
      prevWeek.setDate(prevDate.getDate() - 7);
      return prevWeek;
    });
  };

  const tasksForCurrentDay = tasksByDay[currentDate.toISOString().split('T')[0]] || [];

  return (
    <div className={`todo-list ${isFormVisible ? 'show-modal' : ''}`}>
      <div className="particles-container"></div>
      <div className="modal-overlay" onClick={() => setIsFormVisible(false)}></div>

      <h1 className="title">To do list</h1>
      <h2 className="subtitle">Commençons une journée productive, voici votre liste de tâches !</h2>
      <img src='./medias/rabbiticone.png' alt="Mascotte" className="mascotte-image" />

      <div className="radio-wrapper-19">
        <div className="radio-inputs-19">
          <label>
            <input
              type="radio"
              name="viewMode"
              value="jour"
              checked={viewMode === 'jour'}
              onChange={() => setViewMode('jour')}
            />
            <span className="name">Jour</span>
          </label>
          <label>
            <input
              type="radio"
              name="viewMode"
              value="semaine"
              checked={viewMode === 'semaine'}
              onChange={() => setViewMode('semaine')}
            />
            <span className="name">Semaine</span>
          </label>
        </div>
      </div>

      <div className="week-navigation">
  {viewMode === 'jour' ? (
    <>
      <button onClick={goToPreviousDay} className="nav-btn left">&#9664;</button>
      <h3>{getFormattedDate(currentDate)}</h3>
      <button onClick={goToNextDay} className="nav-btn right">&#9654;</button>
      <button onClick={() => setCurrentDate(today)} className="reset-btn" title="Revenir à aujourd'hui">&#8634;</button>
    </>
  ) : (
    <>
      <button onClick={goToPreviousWeek} className="nav-btn">&#9664;</button>
      <h3>{getFormattedDate(getStartOfWeek(currentDate))} - {getFormattedDate(getWeeklyDates()[6])}</h3>
      <button onClick={goToNextWeek} className="nav-btn">&#9654;</button>
      <button onClick={() => setCurrentDate(today)} className="reset-btn" title="Revenir à cette semaine">&#8634;</button>
    </>
  )}
</div>

      <div className="button-container">
        <button className="button-33" onClick={() => setIsFormVisible(true)}>Ajouter une tâche</button>
      </div>

      {isFormVisible && (
        <div className="task-form-container">
          <TaskForm
            addTask={addTask}
            updateTask={updateTask}
            editingTask={editingTask}
            closeForm={() => {
              setIsFormVisible(false);
              setEditingTask(null);
            }}
          />
        </div>
      )}

      {viewMode === 'jour' ? (
        <div className="day-view">
          <div className="tasks-for-day">
            {tasksForCurrentDay.map((task) => (
              <Task
                key={task.id}
                task={task}
                deleteTask={() => deleteTask(task.id, currentDate.toISOString().split('T')[0])}
                setEditingTask={(taskToEdit) => {
                  setEditingTask(taskToEdit);
                  setIsFormVisible(true);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="weekly-view">
          <div className="week-grid">
            {getWeeklyDates().map((date, index) => {
              const formattedDate = date.toISOString().split('T')[0];
              const tasksForDay = tasksByDay[formattedDate] || []; // Sécurise l'accès
              return (
                <div key={index} className="day-column">
                  <h3>{getFormattedDate(date)}</h3>
                  {tasksForDay.length === 0 ? (
                    <p>Aucune tâche</p>
                  ) : (
                    tasksForDay.map((task) => (
                      <Task
                        key={task.id}
                        task={task}
                        deleteTask={() => deleteTask(task.id, formattedDate)}
                        setEditingTask={(taskToEdit) => {
                          setEditingTask(taskToEdit);
                          setIsFormVisible(true);
                        }}
                      />
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
