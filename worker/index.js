'use strict';
/* tslint:disable */
/* eslint:disable */

self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event);
  event.notification.close();

  if (event.action && event.action.length > 0) {
    console.log('Handling action', event.action);
    
    const [timerType, lengthStr] = event.action.split('|')
    const timerLength = parseInt(lengthStr, 10);
    
    event.waitUntil(
      clients.matchAll({
        type: 'window'
      }).then(function(clientList) {
        if (clientList && clientList.length) {
          clientList[0].postMessage({
            type: 'START_TIMER',
           timerType, timerLength
          })
        }
      })
    )
  }

  // This looks to see if the current is already open and
  // focuses if it is
  // clients is ordered by last focused
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          var url = new URL(client.url);
          if (url.pathname == '/') {
            return client.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow('/');
      }),
  );
});
