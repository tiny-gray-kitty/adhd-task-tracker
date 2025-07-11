// src/TaskTracker.js
import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Battery, BatteryLow, Shuffle, Plus } from 'lucide-react';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedEnergy, setSelectedEnergy] = useState('medium');
  const [randomTask, setRandomTask] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('adhd-tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('adhd-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const task = {
      id: Date.now(),
      title: newTaskTitle,
      energy: selectedEnergy,
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getRandomTask = () => {
    const filtered = tasks.filter(t => !t.completed && t.energy === selectedEnergy);
    if (filtered.length > 0) {
      const choice = filtered[Math.floor(Math.random() * filtered.length)];
      setRandomTask(choice);
    } else {
      alert(`No ${selectedEnergy} energy tasks!`);
    }
  };

  const energyLevels = {
    low: { icon: BatteryLow, label: 'Low Energy', color: '#3B82F6' },
    medium: { icon: Battery, label: 'Medium Energy', color: '#EAB308' },
    high: { icon: Zap, label: 'High Energy', color: '#EF4444' }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #C084FC, #EC4899, #FACC15)',
      padding: '16px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px'
    },
    energyButton: (isActive, color) => ({
      backgroundColor: isActive ? color : '#E5E7EB',
      color: isActive ? 'white' : '#111827',
      margin: '4px',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '999px'
    })
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={styles.header}>
          <h1 style={{ fontSize: '2rem' }}><Sparkles /> Task Tracker</h1>
          <p>Match your tasks to your energy!</p>
        </div>

        <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', marginBottom: '1rem' }}>
          <h2>🎲 Random Task Generator</h2>
          <div>
            {Object.entries(energyLevels).map(([key, val]) => {
              const Icon = val.icon;
              return (
                <button key={key} style={styles.energyButton(selectedEnergy === key, val.color)} onClick={() => setSelectedEnergy(key)}>
                  <Icon size={16} style={{ marginRight: 4 }} /> {val.label}
                </button>
              );
            })}
          </div>
          <button style={{ marginTop: '1rem' }} onClick={getRandomTask}>
            <Shuffle /> Give me a {selectedEnergy} task!
          </button>
          {randomTask && <p>Your task: {randomTask.title}</p>}
        </div>

        <button onClick={() => setShowAddTask(!showAddTask)}>
          <Plus /> Add New Task
        </button>

        {showAddTask && (
          <div style={{ marginTop: '1rem', background: 'white', padding: '1rem', borderRadius: '1rem' }}>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task description"
              style={{ width: '100%', padding: '0.5rem' }}
            />
            <button onClick={addTask} style={{ marginTop: '0.5rem' }}>Save Task</button>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ background: 'white', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <strong>{task.title}</strong>
              <button onClick={() => toggleTask(task.id)} style={{ marginLeft: '1rem' }}>Toggle</button>
              <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;
