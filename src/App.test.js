// App.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders App component', () => {
    render(<App />);
    const headerElement = screen.getByText(/My favorite animals/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders a search form', () => {
    render(<App />);
    const formElement = screen.getByRole('search');
    expect(formElement).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
  });

  test('renders a list of favorite animals', () => {
    render(<App />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });
});
