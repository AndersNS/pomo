interface Props {
  text: string;
  color: 'primary' | 'secondary';
  size?: 'large' | 'normal';
  rounded?: boolean;
  onClick: Function;
  className?: string;
}
export function Button({
  text,
  color: style,
  size,
  rounded,
  onClick,
  className,
}: Props) {
  const s = size ? size : 'normal';
  const r = rounded ? 'is-rounded' : '';
  return (
    <button
      className={`button is-${style} is-${s} ${r} ${className}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
