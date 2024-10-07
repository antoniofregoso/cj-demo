import { bjRouter } from "@buyerjourney/router";
import { home } from "./app/pages";

export const App = new bjRouter();
App.on('/', home);