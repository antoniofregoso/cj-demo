import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner, TextSection, CtaBanner } from "@customerjourney/cj-components";
import { setStage, setBreadcrumb } from "../store/slices/homeSlice";
import { setLanguaje, setTheme } from "../store/slices/contextSlice"
import { store } from "../store/store";
import { byeUpdater } from "./updaters/byeUpdater";
import data from "../data/bye.json";

export function bye(req, router){

    let counter = {atention:0, interest:0, desire:0, action:0, leavingapp:0, leavedapp:0 }

    let template =`
    <page-header id="header"></page-header>
    <hero-banner id="hero"></hero-banner>
    <text-section id="message"></text-section>
    <page-footer id="footer"></page-footer>
    `;
    
    let currentValue = store.getState();
    data.context = currentValue.context;
    document.documentElement.setAttribute('data-theme', data.context.theme);
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
            }
        }

    function handleChange(){
            let previousValue = currentValue;
            currentValue = store.getState();
            if (previousValue !== currentValue) {
                byeUpdater(previousValue, currentValue);
              }
        }

    page.eventsToListen(["user:select-lang","user:select-theme"], pageEvents)

    store.subscribe(handleChange);
}