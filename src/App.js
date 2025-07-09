import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Battery, BatteryLow, RefreshCw, Plus, X, Shuffle } from 'lucide-react';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [randomTask, setRandomTask] = useState(null);
  const [selectedEnergy, setSelectedEnergy] = useState('medium');
  

// Add this line near the top where other useState lines are
const [isFirstLoad, setIsFirstLoad] = useState(true);

// Load tasks from localStorage on mount
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

// Save tasks to localStorage whenever they change (but not on first load)
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
      // Add animation effect
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

  // Styles
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
    },
    taskItem: (isHighlighted, isCompleted) => ({
      backgroundColor: isHighlighted ? '#FEF3C7' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      border: isHighlighted ? '4px solid #FBBF24' : 'none',
      opacity: isCompleted ? '0.5' : '1'
    }),
    badge: (color) => ({
      padding: '4px 8px',
      borderRadius: '999px',
      fontSize: '12px',
      color: 'white',
      backgroundColor: color,
      marginRight: '8px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    }),
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '2px solid #E5E7EB',
      fontSize: '16px',
      marginBottom: '16px',
      outline: 'none'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '2px solid #E5E7EB',
      fontSize: '14px',
      outline: 'none',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <Sparkles color="#FACC15" />
            ADHD Task Tracker
            <Sparkles color="#FACC15" />
          </h1>
          <p style={{ color: '#6B7280' }}>Match your tasks to your energy!</p>
        </div>

        {/* Random Task Selector */}
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

        {/* Add Task Button */}
        <button
          onClick={() => setShowAddTask(true)}
          style={styles.addButton}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <Plus size={24} />
          Add New Task
        </button>

        {/* Add Task Form */}
        {showAddTask && (
          <AddTaskForm 
            onAdd={addTask} 
            onCancel={() => setShowAddTask(false)}
            categories={categories}
            energyLevels={energyLevels}
            urgencyLevels={urgencyLevels}
            styles={styles}
          />
        )}

        {/* Tasks List */}
        <div>
          {tasks.filter(task => !task.completed).map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              categories={categories}
              energyLevels={energyLevels}
              urgencyLevels={urgencyLevels}
              isHighlighted={randomTask?.id === task.id}
              styles={styles}
            />
          ))}
        </div>

        {/* Completed Tasks */}
        {tasks.filter(task => task.completed).length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: 'white' }}>
              ✨ Completed Tasks
            </h3>
            <div style={{ opacity: '0.75' }}>
              {tasks.filter(task => task.completed).map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  categories={categories}
                  energyLevels={energyLevels}
                  urgencyLevels={urgencyLevels}
                  styles={styles}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TaskItem = ({ task, onToggle, onDelete, categories, energyLevels, urgencyLevels, isHighlighted, styles }) => {
  const category = categories.find(c => c.name === task.category);
  const EnergyIcon = energyLevels[task.energy].icon;
  
  return (
    <div 
      id={`task-${task.id}`}
      style={styles.taskItem(isHighlighted, task.completed)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontWeight: '600',
              color: '#1F2937',
              textDecoration: task.completed ? 'line-through' : 'none',
              marginBottom: '8px'
            }}>
              {task.title}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={styles.badge(category?.color || '#6B7280')}>
                {task.category}
              </span>
              <span style={styles.badge(energyLevels[task.energy].color)}>
                <EnergyIcon size={12} />
                {task.energy}
              </span>
              <span style={styles.badge(urgencyLevels[task.urgency].color)}>
                {urgencyLevels[task.urgency].label}
              </span>
              {task.recurring && (
                <span style={styles.badge('#3B82F6')}>
                  <RefreshCw size={12} />
                  Recurring
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          style={{
            marginLeft: '16px',
            color: '#EF4444',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

const AddTaskForm = ({ onAdd, onCancel, categories, energyLevels, urgencyLevels, styles }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [energy, setEnergy] = useState('medium');
  const [urgency, setUrgency] = useState('medium');
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd({ title, category, energy, urgency, recurring });
      setTitle('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#1F2937' }}>
        Add New Task
      </h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs doing?"
          style={styles.input}
          autoFocus
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              Category
            </label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={styles.select}
            >
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              Energy Level
            </label>
            <select 
              value={energy} 
              onChange={(e) => setEnergy(e.target.value)}
              style={styles.select}
            >
              {Object.entries(energyLevels).map(([level, info]) => (
                <option key={level} value={level}>{info.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              Urgency
            </label>
            <select 
              value={urgency} 
              onChange={(e) => setUrgency(e.target.value)}
              style={styles.select}
            >
              {Object.entries(urgencyLevels).map(([level, info]) => (
                <option key={level} value={level}>{info.label}</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id="recurring"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              style={{ width: '20px', height: '20px', marginRight: '8px', cursor: 'pointer' }}
            />
            <label htmlFor="recurring" style={{ fontSize: '14px', fontWeight: '600', color: '#374151', cursor: 'pointer' }}>
              Recurring Task
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              background: 'linear-gradient(to right, #10B981, #3B82F6)',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s'
            }}
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              backgroundColor: '#D1D5DB',
              color: '#374151',
              fontWeight: 'bold',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;