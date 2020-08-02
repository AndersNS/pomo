interface Props {
  isActive: boolean;
  onClose: Function;
  children: React.ReactNode;
}

export function Modal({ isActive, children, onClose }: Props) {
  return (
    <div className={` modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">{children}</div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => onClose()}
      ></button>
    </div>
  );
}
