/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react';

beforeEach(() => {
    localStorage.clear();  // Очистка localStorage перед каждым тестом
});

test('добавляет задачу и отображает её', async () => {
    await act(async () => {
        render(<App />);
    });
    
    // Имитируем ввод задачи
    const input = screen.getByPlaceholderText(/введите новую задачу/i); 
    fireEvent.change(input, { target: { value: 'задача 1' } });
    
    const addButton = screen.getByText(/добавить/i);
    fireEvent.click(addButton);
    
    // Проверка, что задача отображается на экране
    const taskElement = await screen.findByText(/задача 1/i);
    expect(taskElement).toBeInTheDocument();
});

test('проверяет сообщение о отсутствии задач', () => {
    render(<App />);
    
    // Проверка, что сообщение об отсутствии задач отображается
    expect(screen.getByText(/нет задач по текущему фильтру/i)).toBeInTheDocument(); 
});
