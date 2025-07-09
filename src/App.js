import { Router } from "@customerjourney/cj-router";
import { home, bye } from "./app/pages";

export const App = new Router({ hashSensitive:true});
App.on('/', home);
App.on('/#thanks', bye).setName("bye");