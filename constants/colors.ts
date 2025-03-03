// Color palette for the app
export const colors = {
  light: {
    background: '#FFFFFF',
    card: '#F8F5F2',
    text: '#2D2D2D',
    secondaryText: '#6E6E6E',
    primary: '#D48872', // Warm terracotta
    secondary: '#8AABBD', // Soft blue
    accent: '#E8B4BC', // Soft pink
    success: '#7FB069',
    error: '#E07A5F',
    border: '#E8E8E8',
    highlight: '#F9EAE1',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    background: '#1A1A1A',
    card: '#2D2D2D',
    text: '#F8F5F2',
    secondaryText: '#B8B8B8',
    primary: '#D48872', // Keeping the same primary for brand consistency
    secondary: '#8AABBD', // Soft blue
    accent: '#E8B4BC', // Soft pink
    success: '#7FB069',
    error: '#E07A5F',
    border: '#3D3D3D',
    highlight: '#3D2E29',
    overlay: 'rgba(0, 0, 0, 0.7)',
  }
};

// Book status colors
export const statusColors = {
  reading: '#D48872',
  completed: '#7FB069',
  toRead: '#8AABBD',
  dnf: '#E07A5F', // Did Not Finish
};

// Reading progress gradient colors
export const progressGradient = {
  start: '#D48872',
  end: '#E8B4BC',
};