import { Timer } from '../components';
import { useState } from 'react';
import { TimerConfig } from '../models';

const showNotification = (timer: TimerConfig) => {
  navigator.serviceWorker.ready.then((reg) => {
    reg.showNotification(`${timer.type} ended, time to get going again!`, {
      icon: '/icons/icon-72x72.png',
      body: `Let's go`,
    });
  });
};

export default function Home() {
  const [configs, setConfigs] = useState<TimerConfig[]>([
    {
      id: '1',
      length: 20,
      type: 'focus',
    },
    {
      id: '2',
      length: 5,
      type: 'break',
    },
    { id: '3', length: 10, type: 'break' },
  ]);

  return (
    <>
      <section className="hero is-medium is-primary">
        <div className="hero-body ">
          <div className="columns is-centered is-vcentered is-mobile">
            <div className="column is-narrow has-text-centered">
              <figure
                style={{ display: 'inline-block' }}
                className="image is-64x64"
              >
                <img className="is-rounded" src="/icons/icon-128x128.png" />
              </figure>
              <h1
                style={{ display: 'inline-block' }}
                className="content is-size-1 has-text-white"
              >
                Pomo!
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-2">
        <main className="columns">
          <section className="column has-text-centered">
            <Timer
              timers={configs}
              onTimerEnd={(message) => showNotification(message)}
            />
          </section>
        </main>
      </div>
    </>
  );
}
