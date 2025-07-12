import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Battery, BatteryLow, RefreshCw, Plus, X, Shuffle, Check } from 'lucide-react';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [randomTask, setRandomTask] = useState(null);
  const [selectedEnergy, setSelectedEnergy] = useState('medium');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [celebrateComplete, setCelebrateComplete] = useState(null);
  
  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('adhd-tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        setTasks(parsed);
        console.log('Loaded tasks:', parsed);
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
    setIsFirstLoad(false);
  }, []);
  
  // Save tasks to localStorage whenever they change (but not on first load)
  useEffect(() => {
    if (!isFirstLoad && tasks.length >= 0) {
      try {
        localStorage.setItem('adhd-tasks', JSON.stringify(tasks));
        console.log('Saved tasks:', tasks);
      } catch (error) {
        console.error('LocalStorage error:', error);
      }
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
    { name: 'Work', color: '#A855F7', emoji: '💼' },
    { name: 'Home', color: '#EC4899', emoji: '🏠' },
    { name: 'Health', color: '#22C55E', emoji: '💪' },
    { name: 'Creative', color: '#6366F1', emoji: '🎨' },
    { name: 'Admin', color: '#6B7280', emoji: '📋' },
    { name: 'Social', color: '#14B8A6', emoji: '👥' }
  ];

  const addTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, task]);
    setShowAddTask(false);
  };

  const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task.completed) {
      setCelebrateComplete(id);
      setTimeout(() => setCelebrateComplete(null), 1000);
    }
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (randomTask?.id === id) {
      setRandomTask(null);
    }
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
      alert(`No ${energyLevels[selectedEnergy].label.toLowerCase()} tasks available! Add some tasks or try a different energy level.`);
    }
  };

  // Styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #fbb6ce 75%, #ffeaa7 100%)',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(0)',
      transition: 'transform 0.3s ease'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    },
    randomBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '28px',
      marginBottom: '24px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(0)',
      transition: 'all 0.3s ease'
    },
    energyButton: (isSelected, color) => ({
      padding: '10px 20px',
      borderRadius: '999px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: isSelected ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
      backgroundColor: isSelected ? color : '#E5E7EB',
      color: isSelected ? 'white' : '#374151',
      boxShadow: isSelected ? `0 10px 20px ${color}40` : 'none',
      margin: '4px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    }),
    randomButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontWeight: 'bold',
      padding: '16px',
      borderRadius: '999px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 15px 30px rgba(102, 126, 234, 0.4)',
      transition: 'all 0.3s ease',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px'
    },
    addButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      color: 'white',
      fontWeight: 'bold',
      padding: '20px',
      borderRadius: '20px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 15px 30px rgba(17, 153, 142, 0.3)',
      transition: 'all 0.3s ease',
      fontSize: '20px',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    taskItem: (isHighlighted, isCompleted, isCelebrating) => ({
      backgroundColor: isHighlighted ? '#FEF3C7' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: isHighlighted ? '0 20px 40px rgba(251, 191, 36, 0.3)' : '0 10px 25px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      border: isHighlighted ? '3px solid #FBBF24' : '3px solid transparent',
      opacity: isCompleted && !isCelebrating ? '0.6' : '1',
      transform: isCelebrating ? 'scale(1.05)' : isHighlighted ? 'scale(1.02)' : 'scale(1)',
      animation: isCelebrating ? 'celebrate 0.5s ease' : 'none'
    }),
    badge: (color) => ({
      padding: '6px 12px',
      borderRadius: '999px',
      fontSize: '13px',
      fontWeight: '600',
      color: 'white',
      backgroundColor: color,
      marginRight: '8px',
      marginTop: '4px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      boxShadow: `0 4px 10px ${color}30`
    }),
    deleteButton: {
      padding: '8px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#EF4444',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes celebrate {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(5deg); }
            100% { transform: scale(1) rotate(0deg); }
          }
          
          button:hover {
            transform: translateY(-2px);
          }
          
          input:focus, select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
        `}
      </style>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <Sparkles size={48} color="#FACC15" />
            ADHD Task Tracker
            <Sparkles size={48} color="#FACC15" />
          </h1>
          <p style={{ color: '#6B7280', fontSize: '18px' }}>
            Turn chaos into clarity, one task at a time! 🚀
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              {tasks.filter(t => !t.completed).length}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Active</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22C55E' }}>
              {tasks.filter(t => t.completed).length}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Done</div>
          </div>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '16px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F59E0B' }}>
              {tasks.length}
            </div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Total</div>
          </div>
        </div>

        {/* Random Task Selector */}
        <div style={styles.randomBox}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1F2937' }}>
            🎲 Random Task Generator
          </h2>
          <p style={{ color: '#6B7280', marginBottom: '16px' }}>
            Can't decide what to do? Let fate decide! Select your energy level:
          </p>
          <div style={{ marginBottom: '16px' }}>
            {Object.entries(energyLevels).map(([level, info]) => {
              const Icon = info.icon;
              return (
                <button
                  key={level}
                  onClick={() => setSelectedEnergy(level)}
                  style={styles.energyButton(selectedEnergy === level, info.color)}
                >
                  <Icon size={18} />
                  {info.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={getRandomTask}
            style={styles.randomButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
            }}
          >
            <Shuffle size={24} />
            Give me a {energyLevels[selectedEnergy].label.toLowerCase()} task!
          </button>
          {randomTask && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              backgroundColor: '#FEF3C7',
              borderRadius: '12px',
              border: '2px solid #FBBF24',
              animation: 'celebrate 0.5s ease'
            }}>
              <p style={{ fontWeight: '600', color: '#92400E', marginBottom: '8px' }}>
                ✨ Your random task:
              </p>
              <p style={{ fontSize: '18px', color: '#1F2937', fontWeight: '500' }}>
                {randomTask.title}
              </p>
            </div>
          )}
        </div>

        {/* Add Task Button */}
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          style={styles.addButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(17, 153, 142, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(17, 153, 142, 0.3)';
          }}
        >
          <Plus size={28} />
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

        {/* Active Tasks */}
        {tasks.filter(task => !task.completed).length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '16px', 
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              🎯 Active Tasks
            </h3>
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
                isCelebrating={celebrateComplete === task.id}
                styles={styles}
              />
            ))}
          </div>
        )}

        {/* Completed Tasks */}
        {tasks.filter(task => task.completed).length > 0 && (
          <div>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '16px', 
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              ✅ Completed Tasks
            </h3>
            <div style={{ opacity: '0.8' }}>
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

        {/* Empty State */}
        {tasks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            marginTop: '32px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌟</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '8px' }}>
              Ready to start fresh!
            </h3>
            <p style={{ color: '#6B7280', fontSize: '16px' }}>
              Add your first task and let's make today productive!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const TaskItem = ({ task, onToggle, onDelete, categories, energyLevels, urgencyLevels, isHighlighted, isCelebrating, styles }) => {
  const category = categories.find(c => c.name === task.category) || categories[0];
  const EnergyIcon = energyLevels[task.energy].icon;
  
  return (
    <div 
      id={`task-${task.id}`}
      style={styles.taskItem(isHighlighted, task.completed, isCelebrating)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <button
          onClick={() => onToggle(task.id)}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            border: task.completed ? 'none' : '2px solid #E5E7EB',
            backgroundColor: task.completed ? '#22C55E' : 'white',
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          {task.completed && <Check size={18} color="white" />}
        </button>
        
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontWeight: '600',
            fontSize: '18px',
            color: '#1F2937',
            textDecoration: task.completed ? 'line-through' : 'none',
            marginBottom: '8px',
            lineHeight: '1.4'
          }}>
            {task.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <span style={styles.badge(category.color)}>
              {category.emoji} {task.category}
            </span>
            <span style={styles.badge(energyLevels[task.energy].color)}>
              <EnergyIcon size={14} />
              {energyLevels[task.energy].label}
            </span>
            <span style={styles.badge(urgencyLevels[task.urgency].color)}>
              {urgencyLevels[task.urgency].label}
            </span>
            {task.recurring && (
              <span style={styles.badge('#3B82F6')}>
                <RefreshCw size={14} />
                Recurring
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          style={styles.deleteButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FEE2E2';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
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
      onAdd({ title: title.trim(), category, energy, urgency, recurring });
      setTitle('');
      setCategory('Work');
      setEnergy('medium');
      setUrgency('medium');
      setRecurring(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #E5E7EB',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    backgroundColor: 'white'
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '28px',
      marginBottom: '24px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      animation: 'slideIn 0.3s ease'
    }}>
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1F2937' }}>
        ✨ Add New Task
      </h2>
      
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
          What needs to be done?
        </label>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Review flashcards for 15 minutes"
          style={{
            ...inputStyle,
            minHeight: '80px',
            resize: 'vertical',
            marginBottom: '20px'
          }}
          autoFocus
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              Category
            </label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={selectStyle}
            >
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>
                  {cat.emoji} {cat.name}
                </option>
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
              style={selectStyle}
            >
              {Object.entries(energyLevels).map(([level, info]) => (
                <option key={level} value={level}>{info.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
              Urgency
            </label>
            <select 
              value={urgency} 
              onChange={(e) => setUrgency(e.target.value)}
              style={selectStyle}
            >
              {Object.entries(urgencyLevels).map(([level, info]) => (
                <option key={level} value={level}>{info.label}</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '32px' }}>
            <input
              type="checkbox"
              id="recurring"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              style={{ 
                width: '20px', 
                height: '20px', 
                marginRight: '12px', 
                cursor: 'pointer',
                accentColor: '#667eea'
              }}
            />
            <label 
              htmlFor="recurring" 
              style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              🔄 Recurring Task
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            style={{
              flex: 1,
              background: title.trim() 
                ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' 
                : '#E5E7EB',
              color: title.trim() ? 'white' : '#9CA3AF',
              fontWeight: 'bold',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              cursor: title.trim() ? 'pointer' : 'not-allowed',
              boxShadow: title.trim() ? '0 10px 20px rgba(17, 153, 142, 0.3)' : 'none',
              transition: 'all 0.3s ease',
              fontSize: '16px'
            }}
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '14px 28px',
              backgroundColor: '#F3F4F6',
              color: '#374151',
              fontWeight: 'bold',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;