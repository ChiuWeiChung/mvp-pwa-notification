self.addEventListener('push', async (e) => {
  const {
    message,
    body,
    dest,
    // 提供多個尺寸的圖示選項，包括 iOS 所需的尺寸
    icon = '/icons/icon-192x192.png',
    badge = '/icons/icon-96x96.png', // 新增 badge 圖示
  } = JSON.parse(e.data.text());

  if (e.data) {
    const data = e.data.json();
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage(data);
      });
    });

    // Set or the badge.
    if (navigator.setAppBadge) {
      navigator.setAppBadge(1);
    }

    e.waitUntil(
      self.registration.showNotification(message, {
        body,
        data: { dest },
        icon,
        badge, // 新增 badge 屬性
      }),
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  // This looks to see if the current window is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then((clientList) => {
        for (const client of clientList) {
          console.log('==========');
          console.log('event.notification.data', event.notification.data);
          console.log('==========');
          // if (client.url === '/' && 'focus' in client) return client.focus();
          if (client.url.includes('localhost:5487') && 'focus' in client) {
            return client.focus();
          }
        }
        // todo: 根據 event 的 url 進行導向
        if (clients.openWindow) return clients.openWindow('/');
      }),
  );
});
