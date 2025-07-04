import config from './.env/conf.json';
import { store, persistor } from './app/store/store';
import { loading, whithAnimations, getLang } from "@customerjourney/cj-core"
import { setStage } from "./app/store/slices/homeSlice"
import 'animate.css';
import '@customerjourney/cj-core/src/pageloader.css';
import { App } from './App';

loading({color:"is-dark", direction:"is-right-to-left"});

persistor.subscribe(()=>{
    const rehydratedState = store.getState();   
    store.dispatch(setStage('start'));
    App.run();
    whithAnimations();
})
