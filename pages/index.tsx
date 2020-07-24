import { Timer } from '../components';
import { useState } from 'react';
import { TimerConfig } from '../models';

const showNotification = (message: string) => {
  console.log('Showing notification');
  navigator.serviceWorker.ready.then((reg) => {
    reg.showNotification(message);
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
        <div className="hero-body">
          <h1 className="is-size-1 has-text-centered has-text-white">Pomo!</h1>
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
