import { Modal, Button } from '..';
import { useTimerConfigs, useTimerConfigDispatch } from '../../state';
import { useState } from 'react';
import { TimerConfig } from '../../models';

interface Props {
  isActive: boolean;
  onClose: () => void;
}

type TimerConfigInput = Omit<TimerConfig, 'length'> &
  Partial<Pick<TimerConfig, 'length'>>;

const toTimerConfig = (input: TimerConfigInput) => {
  return { ...input, length: input.length };
};

export function SettingsModal({ isActive, onClose }: Props) {
  const configs = useTimerConfigs();
  const dispatch = useTimerConfigDispatch();

  const [configInputs, setConfigInputs] = useState<TimerConfigInput[]>(configs);
  const [errors, setErrors] = useState([]);

  return (
    <Modal isActive={isActive} onClose={onClose}>
      <div className="box is-4by3">
        {configInputs.map((config) => (
          <div key={config.id} className="field">
            <div className="field-label">
              <label className="label has-text-black ">
                <span className="is-capitalized">{config.type} </span>(minutes)
              </label>
            </div>
            <div className="control">
              <input
                className="input is-normal has-text-black"
                type="number"
                placeholder="Medium input"
                value={config.length ? config.length : ''}
                size={2}
                max={60}
                onChange={(e) => {
                  setConfigInputs(
                    configInputs.map((v) => {
                      if (v.id !== config.id) return v;
                      if (!e.target.value) return { ...v, length: null };
                      return { ...v, length: parseInt(e.target.value, 10) };
                    }),
                  );
                }}
              />
            </div>
            {errors.find((e) => e === config.id) ? (
              <p className="help is-danger">
                Timers must be non-zero and less than 60 minutes
              </p>
            ) : null}
          </div>
        ))}
        <div className="has-text-centered mt-4">
          <Button
            text="Save"
            color="primary"
            onClick={() => {
              const errors = configInputs
                .filter((c) => c.length && (c.length > 60 || c.length <= 0))
                .map((c) => {
                  return c.id;
                });
              if (errors.length !== 0) {
                setErrors(errors);
                return;
              }
              dispatch({
                type: 'update',
                configs: configInputs.map(toTimerConfig),
              });
              onClose();
            }}
          />
          <Button
            className="ml-2 is-outlined has-text-black"
            text="Close"
            color="info"
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}
