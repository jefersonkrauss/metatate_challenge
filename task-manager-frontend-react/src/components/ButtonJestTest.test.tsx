// import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonJestTest from './ButtonJestTest.tsx';

test('renders the button with the correct label', () => {
    render(<ButtonJestTest label="Click me" />);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
});
