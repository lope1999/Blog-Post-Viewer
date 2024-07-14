import '@testing-library/jest-dom';

Object.defineProperty(window, 'location', {
    value: {
      reload: jest.fn(),
    },
  });