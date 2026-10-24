import { startApp } from './app';
import { requestPersistence } from './storage/store';

const root = document.getElementById('app');
if (!root) throw new Error('Missing #app root element');

startApp(root, {
  storage: localStorage,
  now: () => new Date(),
  makeId: () => crypto.randomUUID(),
  confirm: (message) => window.confirm(message),
});
void requestPersistence();
