import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  
  // Use findByText for asynchronous rendering (waiting for the element to appear)
  const linkElement = await screen.findByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});





// import { render, screen } from '@testing-library/react';
// import { act } from 'react'; // Update this import
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
