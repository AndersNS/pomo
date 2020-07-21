import "../styles/style.scss";
import AppHead from "../components/AppHead";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppHead />
      <Component {...pageProps} />
    </>
  );
}
