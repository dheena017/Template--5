const DB_NAME = 'aura-offline-queue';
const DB_VERSION = 1;
const STORE_NAME = 'requests';

const queue = [];
let isFlushing = false;
const listeners = new Set();

function notify(event) {
  listeners.forEach((listener) => {
    try {
      listener(event, queue.slice());
    } catch (err) {
      console.warn('[offlineQueue] Listener error:', err);
    }
  });
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putItem(item) {
  const db = await openDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function deleteItem(id) {
  const db = await openDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

async function getAllItems() {
  const db = await openDb();
  const items = await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
  db.close();
  return items;
}

function serializeFormData(formData) {
  const entries = [];
  formData.forEach((value, key) => {
    entries.push([key, value]);
  });
  return entries;
}

function deserializeFormData(entries = []) {
  const formData = new FormData();
  entries.forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

async function executeItem(item) {
  if (item.type !== 'fetch') {
    throw new Error('Unsupported queue item type');
  }

  const request = item.request || {};
  let body;

  if (request.bodyType === 'formData') {
    body = deserializeFormData(request.formDataEntries || []);
  } else if (request.bodyType === 'json') {
    body = JSON.stringify(request.jsonBody || {});
  }

  const res = await fetch(request.url, {
    method: request.method || 'POST',
    headers: request.headers || undefined,
    body,
  });

  if (!res.ok) {
    throw new Error(`Queued request failed: ${res.status}`);
  }

  return res;
}

export function getQueueSnapshot() {
  return queue.slice();
}

export function subscribeQueue(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function enqueueFetchRequest({ label, url, method = 'POST', headers = undefined, formData = null, jsonBody = null }) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const item = {
    id,
    createdAt: Date.now(),
    attempts: 0,
    type: 'fetch',
    label,
    request: {
      url,
      method,
      headers,
      bodyType: formData ? 'formData' : (jsonBody ? 'json' : 'none'),
      formDataEntries: formData ? serializeFormData(formData) : null,
      jsonBody: jsonBody || null,
    },
  };

  queue.push(item);
  await putItem(item);
  notify('enqueued');
}

export async function hydrateQueue() {
  try {
    const persisted = await getAllItems();
    queue.length = 0;
    persisted
      .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0))
      .forEach((item) => queue.push(item));
    notify('hydrated');
  } catch (err) {
    console.warn('[offlineQueue] Failed to hydrate queue:', err);
  }
}

export async function flushQueue() {
  if (isFlushing || queue.length === 0) return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return;

  isFlushing = true;
  try {
    for (let i = 0; i < queue.length; ) {
      const item = queue[i];
      try {
        item.attempts += 1;
        await putItem(item);
        await executeItem(item);
        queue.splice(i, 1);
        await deleteItem(item.id);
        notify('processed');
      } catch (err) {
        await putItem(item);
        i += 1;
      }
    }
  } finally {
    isFlushing = false;
  }
}

if (typeof window !== 'undefined') {
  hydrateQueue().then(() => {
    if (navigator.onLine) {
      flushQueue();
    }
  });

  window.addEventListener('online', () => {
    flushQueue();
  });
}
