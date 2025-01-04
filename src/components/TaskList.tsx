import React from 'react';
import Task from './Task';
import { TaskType } from './types';
import './styles.css'

interface TaskListProps {
    tasks: TaskType[];
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask, deleteTask }) => {
    return (
        <ul className='task_list'>
            {tasks.map(task => (
                <Task key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
            ))}
        </ul>
    );
};

export default TaskList;
