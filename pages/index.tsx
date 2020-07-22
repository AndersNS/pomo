import { Timer } from '../components';

export default function Home() {
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
            <Timer />
          </section>
        </main>
      </div>
    </>
  );
}
