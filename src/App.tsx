import React, { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { TaskType } from './components/types';
import './App.css';

const App: React.FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete' | 'date'>('all');
    const [selectedDate, setSelectedDate] = useState<string>(''); 

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: TaskType) => {
        setTasks(prevTasks => [...prevTasks, task]);
    };

    const toggleTask = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const filteredTasks = () => {
        let result = tasks;
        switch (filter) {
            case 'completed':
                result = result.filter(task => task.completed);
                break;
            case 'incomplete':
                result = result.filter(task => !task.completed);
                break;
            case 'date':
                if (selectedDate) {
                    result = result.filter(task => 
                        new Date(task.date).toDateString() === new Date(selectedDate).toDateString()
                    );
                }
                break;
            default:
                break;
        }
        return result;
    };

    const visibleTasks = filteredTasks();

    return (
        <div className='App'>
            <h1>Список задач</h1>
            <TaskInput addTask={addTask} />
            <TaskFilter setFilter={setFilter} setSelectedDate={setSelectedDate}/>
            {tasks.length === 0 ? null : ( // Сначала проверяем, есть ли задачи
                visibleTasks.length === 0 ? (
                    <div className='no-tasks-message'>Нет задач по текущему фильтру</div>
                ) : (
                    <TaskList tasks={visibleTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
                )
            )}
        </div>
    );
};

export default App;