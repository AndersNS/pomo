import { Timer } from '../components';
import { useState } from 'react';
import { TimerConfig } from '../models';

const getMessageBody = (timer: TimerConfig) => {
  if (timer.type === 'focus') {
    return 'Well done!! Consider taking a short break before starting on a new session!';
  }
  if (timer.type === 'break') {
    return "Hope you had a nice break! Now, let's get back to it. ";
  }
};

const getMessageTitle = (timer: TimerConfig) => {
  if (timer.type === 'focus') {
    return `Your ${timer.length} minute focus session is over!`;
  }
  if (timer.type === 'break') {
    return `${timer.length} minute break is over!`;
  }
};

const getActions = (
  timer: TimerConfig,
  configs: TimerConfig[],
): NotificationAction[] => {
  return configs
    .filter((c) => c.type !== timer.type)
    .map((t) => {
      return {
        action: `${t.type}|${t.length}`,
        title: `${t.length} minute ${t.type}`,
      };
    });
};

const showNotification = (timer: TimerConfig, configs: TimerConfig[]) => {
  navigator.serviceWorker.ready.then((reg) => {
    reg.showNotification(getMessageTitle(timer), {
      icon: '/icons/icon-512x512-t.png',
      body: getMessageBody(timer),
      actions: getActions(timer, configs),
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
                <img className="is-rounded" src="/icons/icon-72x72.png" />
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
              onTimerEnd={(timer) => showNotification(timer, configs)}
            />
          </section>
        </main>
      </div>
    </>
  );
}
