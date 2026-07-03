import { Router } from '@customerjourney/cj-router';
import { home, bye } from './app/pages';

export const App = new Router();
App.on('/', home);
App.on('/thanks', bye).setName("bye");