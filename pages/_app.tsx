import "../styles/style.scss";
import AppHead from "../components/AppHead";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppHead />
      <div className="wrapper">
        <main className="site-content">
          <Component {...pageProps} />
        </main>
      </div>
      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .site-content {
          flex: 1;
        }
      `}</style>
    </>
  );
}
