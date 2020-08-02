import { Modal, Button } from '..';

interface Props {
  isActive: boolean;
  onClose: () => void;
}

export function AboutModal({ isActive, onClose }: Props) {
  return (
    <Modal isActive={isActive} onClose={onClose}>
      <div className="box is-4by3">
        <p className="has-text-black">
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo in the late 1980s.
        </p>
        <p className="mt-2 has-text-black">
          The technique uses a timer to break down work into intervals,
          traditionally 25 minutes in length, separated by short breaks.
        </p>
        <p className="mt-2 has-text-black">
          Each interval is known as a pomodoro, from the Italian word for
          'tomato', after the tomato-shaped kitchen timer that Cirillo used as a
          university student.
        </p>
        <div className="has-text-centered mt-4">
          <Button
            className="is-outlined has-text-black"
            text="Close"
            color="info"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}
