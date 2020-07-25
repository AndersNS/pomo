import moment from 'moment';
import { useState, useEffect } from 'react';
import { Button, Timeleft } from '..';
import * as workerTimers from 'worker-timers';
import { TimerConfig } from '../../models';

interface Props {
  onTimerEnd: (timer: TimerConfig) => void;
  timers: TimerConfig[];
}

const timerColor = (type: string) => (type === 'focus' ? 'primary' : 'info');

const calculateTimeLeft = (expires: moment.Moment) => {
  const now = moment();

  const diff = expires.unix() - now.unix();
  const duration = moment.duration(diff * 1000, 'milliseconds');

  return duration;
};

export function Timer({ timers, onTimerEnd }: Props) {
  const [previousTimer, setPreviousTimer] = useState<TimerConfig>(null);
  const [timeLeft, setTimeLeft] = useState<moment.Duration>(null);
  const [expires, setExpires] = useState<moment.Moment>(null);
  const [paused, setPaused] = useState(false);
  const [currentTimer, setCurrentTimer] = useState<TimerConfig>(null);

  useEffect(() => {
    let timerInterval: number;
    if (expires && !paused) {
      timerInterval = workerTimers.setInterval(() => {
        if (timeLeft && expires.isSameOrBefore(moment())) {
          setTimeLeft(null);
          setExpires(null);
          setPreviousTimer(currentTimer);
          setCurrentTimer(null);
          onTimerEnd(currentTimer);
        } else {
          const left = calculateTimeLeft(expires);
          setTimeLeft(left);
        }
      }, 1000);
    }

    return () => {
      if (timerInterval) {
        workerTimers.clearInterval(timerInterval);
      }
    };
  }, [expires, paused]);

  const startTimer = (timer: TimerConfig) => {
    const expires = moment().add(timer.length, 'minutes').subtract(1, 'second');

    setExpires(expires);
    setTimeLeft(calculateTimeLeft(expires));
    setCurrentTimer(timer);
  };

  const focusTimers = timers
    .filter((t) => t.type === 'focus')
    .sort((a, b) => a.length - b.length);

  const breakTimers = timers
    .filter((t) => t.type === 'break')
    .sort((a, b) => a.length - b.length);

  return (
    <>
      {previousTimer || currentTimer ? (
        <>
          {timeLeft && currentTimer ? (
            <>
              <div className="mt-3 pb-3">
                <Timeleft
                  color={timerColor(currentTimer.type)}
                  timeLeft={timeLeft}
                  lengthDuration={moment.duration(
                    currentTimer.length,
                    'minutes',
                  )}
                />
                <div className="mt-3 ">
                  <Button
                    rounded={true}
                    width="80%"
                    size="normal"
                    text={paused ? 'Unpause' : 'Pause'}
                    color="white"
                    onClick={() => {
                      if (paused) {
                        // Update expires time after pause
                        setExpires(moment().add(timeLeft));
                      }
                      setPaused(!paused);
                    }}
                  />
                </div>
              </div>
            </>
          ) : null}

          {focusTimers.map((t) => (
            <div key={t.id} className="mt-3">
              <Button
                width="80%"
                rounded={true}
                size="large"
                text={`${t.length} minute focus`}
                color={timerColor(t.type)}
                onClick={() => {
                  startTimer(t);
                }}
              />
            </div>
          ))}
          {breakTimers.map((t) => (
            <div key={t.id} className="mt-2">
              <Button
                width="80%"
                rounded={true}
                size="large"
                text={`${t.length} minute break`}
                color={timerColor(t.type)}
                onClick={() => {
                  startTimer(t);
                }}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          {focusTimers.map((t) => (
            <Button
              key={t.id}
              className="mt-5"
              rounded={true}
              size="large"
              text={`${t.length} minute focus`}
              color={timerColor(t.type)}
              onClick={() => {
                startTimer(t);
              }}
            />
          ))}
        </>
      )}
    </>
  );
}
