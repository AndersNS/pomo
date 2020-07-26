import '../styles/style.scss';
import { AppHead, Modal, Button } from '../components';
import { useEffect, useState } from 'react';

const getWorkbox = () => {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    window.workbox !== undefined
  ) {
    return window.workbox;
  }
  return null;
};

export default function MyApp({ Component, pageProps }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);

  useEffect(() => {
    const wb = getWorkbox();
    if (wb) {
      const promptNewVersionAvailable = (_event: any) => {
        // Skip the install
        if (process.env.NODE_ENV !== 'production') {
          return;
        }

        wb.addEventListener('controlling', (_event) => {
          window.location.reload();
        });
        setShowUpdateModal(true);
      };

      wb.addEventListener('waiting', promptNewVersionAvailable);
      wb.addEventListener('externalwaiting', promptNewVersionAvailable);

      wb.register();
    }
  });

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission((res) => {
        console.log('Notification permission request result', res);
      });
    }
  });

  const onUpdate = () => {
    const wb = getWorkbox();
    if (!wb) {
      return;
    }

    // Send a message to the waiting service worker, instructing it to activate.
    wb.messageSW({ type: 'SKIP_WAITING' });
    setShowUpdateModal(false);
  };

  const onIgnoreUpdate = () => {
    console.log(
      'User rejected to reload the web app, keep using old verion. New verion will be automatically load when user open the app next time.',
    );

    setShowUpdateModal(false);
  };

  return (
    <>
      <Modal isActive={showUpdateModal} onClose={onIgnoreUpdate}>
        <div className="box is-4by3">
          <p className="has-text-black">
            A new update for Pomo! is available! Do you want to update now?
          </p>
          <div className="has-text-centered mt-4">
            <Button
              text="Update now!"
              className={updateClicked ? 'is-loading' : ''}
              color="primary"
              onClick={() => {
                setUpdateClicked(true);
                onUpdate();
              }}
            />
            <Button
              className="ml-2 is-outlined has-text-black"
              text="Ignore"
              color="danger"
              onClick={() => {
                onIgnoreUpdate();
              }}
            />
          </div>
        </div>
      </Modal>
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
