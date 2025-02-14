self.addEventListener('push', async (e) => {
  const {
    message,
    body,
    dest,
    // 提供多個尺寸的圖示選項，包括 iOS 所需的尺寸
    icon = `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/icon-192x192.png`,
    badge = `${process.env.NEXT_PUBLIC_BASE_PATH}/icons/icon-96x96.png`, // 新增 badge 圖示
  } = JSON.parse(e.data.text());

  if (e.data) {
    const data = e.data.json();
    self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage(data);
      });
    });

    // test unread count (Note: this is for testing purpose, unread count should be from DB)
    const unreadCount = 10;

    if (navigator.setAppBadge) {
      if (unreadCount && unreadCount > 0) {
        navigator.setAppBadge(unreadCount);
      } else {
        navigator.clearAppBadge();
      }
    }

    console.log('====icon====', icon);
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
          return clients.openWindow(`${process.env.NEXT_PUBLIC_BASE_PATH}/${dest}`);
        }
      }),
  );
});
