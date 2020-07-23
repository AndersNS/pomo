import moment from 'moment';
import { useState, useEffect } from 'react';
import { Button } from '..';

const calculateTimeLeft = (expires: moment.Moment) => {
  const now = moment();

  const diff = expires.unix() - now.unix();
  const duration = moment.duration(diff * 1000, 'milliseconds');

  return duration;
};
export function Timer() {
  const [timeLeft, setTimeLeft] = useState<moment.Duration>(null);
  const [expires, setExpires] = useState<moment.Moment>(null);

  const timerStarted = expires !== null;

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (expires) {
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
  }, [expires]);

  const startTimer = () => {
    const expires = moment().add(19, 'minutes').add(59, 'seconds');
    setExpires(expires);
    setTimeLeft(calculateTimeLeft(expires));
  };
  return (
    <>
      <Button
        rounded={true}
        size="large"
        text={timerStarted ? 'Restart' : 'Start'}
        color="primary"
        onClick={() => {
          startTimer();
        }}
      />
      {timeLeft ? <Timeleft timeLeft={timeLeft} /> : null}
    </>
  );
}
const Timeleft = ({ timeLeft }: { timeLeft: moment.Duration }) => {
  return (
    <p>
      {timeLeft.minutes()}minutes {timeLeft.seconds()}seconds
    </p>
  );
};
