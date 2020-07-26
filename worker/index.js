'use strict';

self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        console.log('clients', clientList);
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          console.log(client);
          var url = new URL(client.url);
          console.log('url is', url);
          if (url.pathname == '/') {
            console.log('Focusing client' + client.id);
            return client.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow('/');
      }),
  );
});
