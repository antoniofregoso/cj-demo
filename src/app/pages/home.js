import { AppPage, PageHeader, PageFooter } from "@buyerjourney/bj-core";
import { HeroBanner } from "@buyerjourney/bj-components";
import { setLanguaje, setTheme } from "../store/slices/homeSlice";
import { store } from "../store/store";
import { homeUpdater } from "./updaters/homeUpdater";
import data from "../data/home.json";

export function home(req, router){

    let template =`
    <page-header id="header"></page-header>
    <hero-banner id="attention"></hero-banner>
    <page-footer id="footer"></page-footer>
    `;
    
    let currentValue = store.getState();
    data.context = context = currentValue.context;
    page =  new AppPage(data, template);

    const pageEvents = {
        handleEvent: (e) => {
            switch(e.type){
                case 'user:select-lang':
                    store.dispatch(setLanguaje(e.detail));
                    break;
                case 'user:select-theme':
                    store.dispatch(setTheme(e.detail));
                    break;

            }
        }}

    function handleChange(){
            let previousValue = currentValue;
            currentValue = store.getState();
            if (previousValue !== currentValue) {
                homeUpdater(previousValue, currentValue);
              }
        }

    page.eventsToListen(["user:select-lang","user:select-theme"], pageEvents)

    store.subscribe(handleChange);
}