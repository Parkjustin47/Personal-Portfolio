/**
 * Utility functions for project status styling
 * Shared across SliderCard and ProjectDetail components
 */

export const getStatusColor = (color) => {
  switch (color) {
    case 'green': return 'bg-green-500';
    case 'blue': return 'bg-blue-500';
    case 'yellow': return 'bg-yellow-500';
    case 'purple': return 'bg-purple-500';
    case 'red': return 'bg-red-500';
    default: return 'bg-green-500';
  }
};

export const getStatusTextColor = (color) => {
  switch (color) {
    case 'green': return 'text-green-500';
    case 'blue': return 'text-blue-500';
    case 'yellow': return 'text-yellow-500';
    case 'purple': return 'text-purple-500';
    case 'red': return 'text-red-500';
    default: return 'text-green-500';
  }
};