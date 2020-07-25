import { Color, getColorClass } from '../../utils';

interface Props {
  text: string;
  color: Color;
  size?: 'large' | 'normal';
  width?: string;
  rounded?: boolean;
  onClick: Function;
  className?: string;
}
export function Button({
  text,
  color,
  size,
  rounded,
  onClick,
  className,
  width,
}: Props) {
  const s = size ? size : 'normal';
  const r = rounded ? 'is-rounded' : '';
  const w = width ? { width: width } : { width: 'auto' };
  return (
    <button
      style={{ ...w }}
      className={`button ${getColorClass(color)} is-${s} ${r} ${className}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
