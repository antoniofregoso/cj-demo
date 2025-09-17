import config from './.env/conf.json';
import { store, persistor } from './app/store/store';
import { loading, whithAnimations } from "@customerjourney/cj-core"
import 'animate.css';
import '@customerjourney/cj-core/src/pageloader.css';
import { App } from './App';
/**
 * Set Loading element before app run
 */
loading({color:"is-dark", direction:"is-right-to-left"});

/**
 * Get current value from store and set theme
 */
let currentValue = store.getState();
    let theme = currentValue?.context?.theme;
    if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
/**
 * Subscribe to store changes
 */
persistor.subscribe(()=>{
    const rehydratedState = store.getState();  
})
/**
 * Run App
 */
App.run();
/**
 * Set animation observer
 */
whithAnimations();
