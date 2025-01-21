/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react'; // Не забудьте импортировать React
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; // Обновленный импорт
import TaskFilter from './TaskFilter';

describe('TaskFilter', () => {
    const setFilterMock = jest.fn();
    const setSelectedDateMock = jest.fn();

    beforeEach(() => {
        // Используем act для обертки рендеринга, если это необходимо
        act(() => {
            render(<TaskFilter setFilter={setFilterMock} setSelectedDate={setSelectedDateMock} />);
        });
    });

    test('меняет фильтр на "все"', () => {
        const button = screen.getByText(/все/i);
        fireEvent.click(button);
        expect(setFilterMock).toHaveBeenCalledWith('all');
        expect(setSelectedDateMock).toHaveBeenCalledWith(''); // Проверяем, что дата очищается
    });

    test('меняет фильтр на "выполненные"', () => {
        const button = screen.getAllByText(/выполненные/i);
        fireEvent.click(button[0]);
        expect(setFilterMock).toHaveBeenCalledWith('completed');
        expect(setSelectedDateMock).toHaveBeenCalledWith(''); // Проверяем, что дата очищается
    });

    test('меняет фильтр на "невыполненные"', () => {
        const button = screen.getByText(/невыполненные/i);
        fireEvent.click(button);
        expect(setFilterMock).toHaveBeenCalledWith('incomplete');
        expect(setSelectedDateMock).toHaveBeenCalledWith(''); // Проверяем, что дата очищается
    });
});
