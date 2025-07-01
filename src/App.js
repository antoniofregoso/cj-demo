import { Router } from "@customerjourney/cj-router";
import { home } from "./app/pages";

export const App = new Router();
App.on('/', home);