import moment from 'moment';
import { useState, useEffect } from 'react';
import { Button } from '..';

interface Props {
  length: number;
}

const calculateTimeLeft = (expires: moment.Moment) => {
  const now = moment();

  const diff = expires.unix() - now.unix();
  const duration = moment.duration(diff * 1000, 'milliseconds');

  return duration;
};

export function Timer({ length }: Props) {
  const [timeLeft, setTimeLeft] = useState<moment.Duration>(null);
  const [expires, setExpires] = useState<moment.Moment>(null);
  const [paused, setPaused] = useState(false);

  const timerStarted = timeLeft !== null;

  const lengthDuration = moment.duration(length, 'minutes');

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (expires && !paused) {
        if (expires.isSameOrBefore(moment())) {
          setTimeLeft(null);
        } else {
          const left = calculateTimeLeft(expires);
          setTimeLeft(left);
        }
      }
    }, 500);

    return () => {
      clearInterval(timerInterval);
    };
  }, [expires, paused]);

  const startTimer = () => {
    const expires = moment().add(lengthDuration).subtract(1, 'second');

    setExpires(expires);
    setTimeLeft(calculateTimeLeft(expires));
  };
  return (
    <>
      {timerStarted ? (
        <>
          <Timeleft timeLeft={timeLeft} lengthDuration={lengthDuration} />
          <div>
            <Button
              width="60%"
              rounded={true}
              size="large"
              text="Restart"
              color="primary"
              onClick={() => {
                startTimer();
              }}
            />
          </div>
          <div>
            <Button
              width="60%"
              className="mt-2"
              rounded={true}
              size="large"
              text={paused ? 'Unpause' : 'Pause'}
              color="secondary"
              onClick={() => {
                setPaused(!paused);
              }}
            />
          </div>
        </>
      ) : (
        <Button
          className="mt-5"
          rounded={true}
          size="large"
          text={`${length} minute focus`}
          color="primary"
          onClick={() => {
            startTimer();
          }}
        />
      )}
    </>
  );
}

const Timeleft = ({
  timeLeft,
  lengthDuration,
}: {
  timeLeft: moment.Duration;
  lengthDuration: moment.Duration;
}) => {
  const percentage =
    (timeLeft.asMilliseconds() / lengthDuration.asMilliseconds()) * 100;

  return (
    <>
      <div className="level">
        <div className="level-item">
          <progress
            style={{ width: '90%' }}
            className="progress is-medium"
            value={percentage}
            max="100"
          >
            {percentage.toString()}%
          </progress>
        </div>
      </div>
      <div className="level">
        <div className="level-item">
          <h5 className="is-size-4">
            <strong>{timeLeft.minutes()}</strong>minutes {timeLeft.seconds()}
            seconds
          </h5>
        </div>
      </div>
    </>
  );
};
