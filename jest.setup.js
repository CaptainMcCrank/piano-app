import '@testing-library/jest-dom';

// Mock window.plausible
window.plausible = jest.fn();

// Mock AudioContext
window.AudioContext = jest.fn().mockImplementation(() => ({
  createOscillator: jest.fn().mockReturnValue({
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn()
  }),
  createGain: jest.fn().mockReturnValue({
    connect: jest.fn(),
    gain: { setValueAtTime: jest.fn() }
  })
})); 