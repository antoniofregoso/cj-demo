import config from './.env/conf.json';
import { store, persistor } from './app/store/store';
import { loading, whithAnimations, withGoogleAnalytics, getLang } from  "@buyerjourney/bj-core";
import { setLanguaje } from './app/store/slices/homeSlice';
import 'animate.css';
import '@buyerjourney/bj-core/src/bj.css';
import { App } from './App';

loading({color:"is-dark", direction:"is-right-to-left"});

persistor.subscribe(()=>{
    const rehydratedState = store.getState();   
    if (rehydratedState.context.lang==='none'){
        store.dispatch(setLanguaje({lang:getLang()}));
    }
    withGoogleAnalytics(config.google.gtag);
    App.run();
    whithAnimations();
})
