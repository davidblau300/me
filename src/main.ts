import '@fontsource/pacifico/400.css';
import '@fontsource/varela-round/400.css';
import '@fontsource/playpen-sans-hebrew/400.css';
import '@fontsource/playpen-sans-hebrew/500.css';
import './styles.css';
import { startApp } from './app';
import { requestPersistence, resolveStorage } from './storage/store';

const root = document.getElementById('app');
if (!root) throw new Error('Missing #app root element');

startApp(root, {
  storage: resolveStorage(() => window.localStorage),
  now: () => new Date(),
  makeId: () => crypto.randomUUID(),
  confirm: (message) => window.confirm(message),
});
void requestPersistence();
