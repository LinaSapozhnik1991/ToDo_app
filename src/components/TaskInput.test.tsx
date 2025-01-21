import { render, screen, fireEvent } from '@testing-library/react';
import TaskInput from './TaskInput';


test('добавляет новую задачу при вводе текста и нажатии кнопки', () => {
    const addTaskMock = jest.fn();
    render(<TaskInput addTask={addTaskMock} />);

    const input = screen.getByPlaceholderText(/введите новую задачу/i);
    fireEvent.change(input, { target: { value: 'Новая задача' } });

    const button = screen.getByText(/добавить/i);
    fireEvent.click(button);

    expect(addTaskMock).toHaveBeenCalledWith(expect.objectContaining({
        id: expect.any(Number),
        title: 'Новая задача',
        text: 'Новая задача',
        completed: false,
        date: expect.any(String)
    }));
});

test('показывает ошибку при добавлении пустой задачи', () => {
    const addTaskMock = jest.fn();
    render(<TaskInput addTask={addTaskMock} />);

    const button = screen.getByText(/добавить/i);
    fireEvent.click(button);

    const errorMessage = screen.getByText(/задача не может быть пустой!/i);
    expect(errorMessage).toBeInTheDocument();
});
