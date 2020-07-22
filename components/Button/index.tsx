interface Props {
  text: string;
  color: 'primary' | 'secondary';
  size?: 'large' | 'normal';
  rounded?: boolean;
  onClick: Function;
}
export function Button({ text, color: style, size, rounded, onClick }: Props) {
  const s = size ? size : 'normal';
  const r = rounded ? 'is-rounded' : '';
  return (
    <button
      className={`button is-${style} is-${s} ${r}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
