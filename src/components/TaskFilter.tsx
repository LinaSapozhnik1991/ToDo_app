import React from 'react';
import './styles.css'
interface TaskFilterProps {
    setFilter: (filter: 'all' | 'completed' | 'incomplete' | 'date') => void;
    setSelectedDate: (date: string) => void; 
}

const TaskFilter: React.FC<TaskFilterProps> = ({ setFilter, setSelectedDate })  => {
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        setFilter('date'); // меняем фильтр на дату
    }
    return (
        <div className='filter'>
            <button className='filter_btn btn' onClick={() => {setFilter('all'); setSelectedDate(''); }}>Все</button>
            <button className='filter_btn btn' onClick={() => {setFilter('completed'); setSelectedDate('');}}>Выполненные</button>
            <button className='filter_btn btn' onClick={() => {setFilter('incomplete'); setSelectedDate('');}}>Невыполненные</button>
            <input className='btn' type="date" onChange={handleDateChange} />
        </div>
    );
};

export default TaskFilter;
