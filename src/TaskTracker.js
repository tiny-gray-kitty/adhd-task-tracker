// src/TaskTracker.js
import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Battery, BatteryLow, RefreshCw, Plus, X, Shuffle } from 'lucide-react';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [randomTask, setRandomTask] = useState(null);
  const [selectedEnergy, setSelectedEnergy] = useState('medium');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem('adhd-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
        console.log('Loaded tasks:', JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
    setIsFirstLoad(false);
  }, []);

  useEffect(() => {
    if (!isFirstLoad) {
      localStorage.setItem('adhd-tasks', JSON.stringify(tasks));
      console.log('Saved tasks:', tasks);
    }
  }, [tasks, isFirstLoad]);

  const energyLevels = {
    low: { icon: BatteryLow, color: '#3B82F6', label: 'Low Energy' },
    medium: { icon: Battery, color: '#EAB308', label: 'Medium Energy' },
    high: { icon: Zap, color: '#EF4444', label: 'High Energy' }
  };

  const urgencyLevels = {
    low: { color: '#4ADE80', label: 'Chill' },
    medium: { color: '#FB923C', label: 'Soon-ish' },
    high: { color: '#F87171', label: 'Urgent!' }
  };

  const categories = [
    { name: 'Work', color: '#A855F7' },
    { name: 'Home', color: '#EC4899' },
    { name: 'Health', color: '#22C55E' },
    { name: 'Creative', color: '#6366F1' },
    { name: 'Admin', color: '#6B7280' },
    { name: 'Social', color: '#14B8A6' }
  ];

  const addTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, task]);
    setShowAddTask(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getRandomTask = () => {
    const filteredTasks = tasks.filter(task => 
      !task.completed && task.energy === selectedEnergy
    );
    
    if (filteredTasks.length > 0) {
      const random = filteredTasks[Math.floor(Math.random() * filteredTasks.length)];
      setRandomTask(random);
      setTimeout(() => {
        document.getElementById(`task-${random.id}`)?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    } else {
      setRandomTask(null);
      alert(`No ${selectedEnergy} energy tasks available!`);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #C084FC, #EC4899, #FACC15)',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1F2937',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    randomBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    energyButton: (isSelected, color) => ({
      padding: '8px 16px',
      borderRadius: '999px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s',
      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
      backgroundColor: isSelected ? color : '#E5E7EB',
      color: isSelected ? 'white' : '#374151',
      boxShadow: isSelected ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 'none',
      marginRight: '8px',
      marginBottom: '8px'
    }),
    randomButton: {
      width: '100%',
      background: 'linear-gradient(to right, #A855F7, #EC4899)',
      color: 'white',
      fontWeight: 'bold',
      padding: '12px',
      borderRadius: '999px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    addButton: {
      width: '100%',
      background: 'linear-gradient(to right, #10B981, #3B82F6)',
      color: 'white',
      fontWeight: 'bold',
      padding: '16px',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      fontSize: '18px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <Sparkles color="#FACC15" />
            Task Tracker
            <Sparkles color="#FACC15" />
          </h1>
          <p style={{ color: '#6B7280' }}>Match your tasks to your energy!</p>
        </div>

        <div style={styles.randomBox}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#1F2937' }}>
            🎲 Random Task Generator
          </h2>
          <div style={{ marginBottom: '16px' }}>
            {Object.entries(energyLevels).map(([level, info]) => {
              const Icon = info.icon;
              return (
                <button
                  key={level}
                  onClick={() => setSelectedEnergy(level)}
                  style={styles.energyButton(selectedEnergy === level, info.color)}
                >
                  <Icon size={16} style={{ display: 'inline', marginRight: '4px' }} />
                  {info.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={getRandomTask}
            style={styles.randomButton}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Shuffle size={20} />
            Give me a {selectedEnergy} energy task!
          </button>
          {randomTask && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#FEF3C7',
              borderRadius: '12px',
              border: '2px solid #FBBF24'
            }}>
              <p style={{ fontWeight: '600', color: '#1F2937' }}>Your random task:</p>
              <p style={{ fontSize: '18px', color: '#1F2937' }}>{randomTask.title}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowAddTask(true)}
          style={styles.addButton}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <Plus size={24} />
          Add New Task
        </button>

        {showAddTask && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            {/* Add Task Form UI Here */}
            <p>Form goes here</p>
          </div>
        )}

        {tasks.filter(task => !task.completed).map(task => (
          <div key={task.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
            <strong>{task.title}</strong>
            <button onClick={() => toggleTask(task.id)} style={{ marginLeft: '1rem' }}>Toggle</button>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTracker;