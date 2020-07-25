export type Color = 'primary' | 'danger' | 'white' | 'info';

export const getColorClass = (color: Color) => {
  return `is-${color}`;
};
