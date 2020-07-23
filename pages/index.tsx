import { Timer } from '../components';
import { useState } from 'react';

export default function Home() {
  const [config, setConfig] = useState({
    focusLength: 20,
    shortPause: 5,
    longPause: 10,
  });

  return (
    <>
      <section className="hero is-medium is-primary">
        <div className="hero-body">
          <h1 className="is-size-1 has-text-centered">Pomo!</h1>
        </div>
      </section>

      <div className="container mt-2">
        <main className="columns">
          <section className="column has-text-centered">
            <Timer length={config.focusLength} />
          </section>
        </main>
      </div>
    </>
  );
}
