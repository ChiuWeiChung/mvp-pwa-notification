self.addEventListener('push', async (e) => {
  const { message, body, dest, unreadCount } = JSON.parse(e.data.text());

  if (e.data) {
    const data = e.data.json();
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage(data);
      });
    });

    // Note: process.env.NEXT_PUBLIC_BASE_PATH 若沒有提供，會出錯
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const icon = `${basePath}/icons/icon-192x192.png`;
    const badge = `${basePath}/icons/icon-96x96.png`;

    if (navigator.setAppBadge) {
      if (unreadCount && unreadCount > 0) {
        navigator.setAppBadge(unreadCount);
      } else {
        navigator.clearAppBadge();
      }
    }

    e.waitUntil(
      self.registration.showNotification(message, {
        body,
        data: { dest },
        icon, // 新增 icon 屬性
        badge, // 新增 badge 屬性
      }),
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  /** if the current window is already open and focuses if it is */
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true, // Add this to include uncontrolled clients
      })
      .then((clientList) => {
        // Check if we have any clients
        if (clientList.length > 0) {
          // Try to focus existing window
          for (const client of clientList) {
            if ('focus' in client) return client.focus();
          }
        }
        // If no existing window found, open new one
        if (clients.openWindow) {
          const dest = event.notification.data?.dest || '/';
          return clients.openWindow(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/${dest}`);
        }
      }),
  );
});
