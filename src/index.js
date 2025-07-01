import config from './.env/conf.json';
import { store, persistor } from './app/store/store';
import { loading, whithAnimations, getLang } from "@customerjourney/cj-core"
import { setLanguaje } from './app/store/slices/contextSlice';
import 'animate.css';
import '@customerjourney/cj-core/src/pageloader.css';
import { App } from './App';

loading({color:"is-dark", direction:"is-right-to-left"});

persistor.subscribe(()=>{
    const rehydratedState = store.getState();   
    if (rehydratedState.context.lang==='none'){
        store.dispatch(setLanguaje({lang:getLang()}));
    }
    App.run();
    whithAnimations();
})
