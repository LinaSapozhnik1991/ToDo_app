import React, { useState } from 'react';
import { TaskType } from './types';
import './styles.css';

interface TaskInputProps {
    addTask: (task: TaskType) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
    const [taskText, setTaskText] = useState('');
    const [error, setError] = useState(''); 

    const handleAddTask = () => {
        if (taskText.trim()) {
            const newTask: TaskType = {
                id: Date.now(),
                text: taskText,
                title: taskText,
                completed: false,
                date:new Date().toISOString().split('T')[0]
            };
            addTask(newTask);
            setTaskText('');
            setError(''); 
        } else {
            setError('Задача не может быть пустой!'); 
        }
    };

    return (
        <>
        <div className='task-add'>
            <input
                className='task_new'
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Введите новую задачу ..."
            />
            <button className='task_new-btn btn' onClick={handleAddTask}>Добавить</button>
      
        </div>
              {error && <div className="error-message">{error}</div>} 
              </>
    );
};

export default TaskInput;