export type Color = 'primary' | 'danger' | 'white';

export const getColorClass = (color: Color) => {
  return `is-${color}`;
};
