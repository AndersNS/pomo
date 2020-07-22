import Button from '../components/Button/Button';
import { useState, useEffect } from 'react';
import moment from 'moment';

const calculateTimeLeft = (expires: moment.Moment) => {
  const now = moment();

  const diff = expires.unix() - now.unix();
  const duration = moment.duration(diff * 1000, 'milliseconds');

  return duration;
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<moment.Duration>(null);
  const [expires, setExpires] = useState<moment.Moment>(null);

  useEffect(() => {
    setInterval(() => {
      if (expires) {
        const left = calculateTimeLeft(expires);
        setTimeLeft(left);
      }
    }, 250);
  });

  const startTimer = () => {
    const expires = moment().add(20, 'minutes');
    setExpires(expires);
    setTimeLeft(calculateTimeLeft(expires));
  };
  return (
    <>
      <section className="hero is-medium is-primary">
        <div className="hero-body">
          <h1 className="is-size-1 has-text-centered">
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </div>
      </section>

      <div className="container mt-2">
        <main className="columns">
          <section className="column has-text-centered">
            <Button
              rounded={true}
              size="large"
              text="Hello"
              color="primary"
              onClick={() => {
                startTimer();
              }}
            />
            {timeLeft ? <Timeleft timeLeft={timeLeft} /> : null}
          </section>
        </main>
      </div>
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
