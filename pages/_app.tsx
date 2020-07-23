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
  useEffect(() => {
    const wb = getWorkbox();
    if (wb) {
      // add event listeners to handle any of PWA lifecycle event
      // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
      wb.addEventListener('installed', (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener('controlling', (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener('activated', (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      // NOTE: MUST set skipWaiting to false in next.config.js pwa object
      // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
      const promptNewVersionAvailable = (_event: any) => {
        // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
        // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.
        if (process.env.NODE_ENV !== 'production') {
          return;
        }

        wb.addEventListener('controlling', (_event) => {
          console.log('Event controlling is triggered, reloading');
          window.location.reload();
        });
        setShowUpdateModal(true);
      };

      wb.addEventListener('waiting', promptNewVersionAvailable);
      wb.addEventListener('externalwaiting', promptNewVersionAvailable);

      wb.register();
    }
  });

  const onUpdate = () => {
    const wb = getWorkbox();
    if (!wb) {
      console.log('Could not get workbox in onUpdate');
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
          <p>A new update for Pomo! is available! Do you want to update now?</p>
          <div className="has-text-centered mt-4">
            <Button
              text="Update now!"
              color="primary"
              onClick={() => {
                onUpdate();
              }}
            />
            <Button
              className="ml-2"
              text="Ignore"
              color="secondary"
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
