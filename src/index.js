import config from './.env/conf.json';
import { store, persistor } from './app/store/store';
import { loading, whithAnimations, getLang } from "@customerjourney/cj-core"
import 'animate.css';
import '@customerjourney/cj-core/src/pageloader.css';
import { App } from './App';

loading({color:"is-dark", direction:"is-right-to-left"});

let currentValue = store.getState();
    let theme = currentValue?.context?.theme;
    if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

persistor.subscribe(()=>{
    const rehydratedState = store.getState();  
})
App.run();
whithAnimations();
