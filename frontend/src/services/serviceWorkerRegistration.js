export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.info('[SW] Registered:', registration.scope);
    } catch (err) {
      console.warn('[SW] Registration failed:', err);
    }
  });
}
