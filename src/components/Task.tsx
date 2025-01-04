import React from 'react';
import { TaskType } from './types';
import './styles.css'

interface TaskProps {
    task: TaskType;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, toggleTask, deleteTask }) => {
    return (
        <li className={`task ${task.completed ? 'completed' : ''}`}>
            <input className='task_item'
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
            />
               <span className={task.completed ? 'task-text completed' : 'task-text'}> {task.text} </span>
            <button className='task_btn' onClick={() => deleteTask(task.id)}>Удалить</button>
        </li>
    );
};

export default Task;
