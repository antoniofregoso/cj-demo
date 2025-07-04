import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner, ImageText, TextColumns, ImageBanner, CtaBanner } from "@customerjourney/cj-components";
import { FormAppoinment } from "../components/cj-forms/src/components/FormAppoiment";
import { setStage, setBreadcrumb } from "../store/slices/homeSlice";
import { setLanguaje, setTheme } from "../store/slices/contextSlice"
import { store } from "../store/store";
import { homeUpdater } from "./updaters/homeUpdater";
import data from "../data/home.json";
import { getSchedules } from '../components/appoinments'

export function home(req, router){

    let counter = {atention:0, interest:0, desire:0, action:0, leavingapp:0, leavedapp:0 }

    let template =`
    <page-header id="header"></page-header>
    <hero-banner id="attention"></hero-banner>
    <image-text id="interest"></image-text>
    <text-columns id="desire"></text-columns>
    <image-banner id="action"></image-banner>
    <cta-banner id="cta"></cta-banner>
    <page-footer id="footer"></page-footer>
    <form-appoinment id="appoinment"></form-appoinment>
    `;
    
    let currentValue = store.getState();
    data.context = context = currentValue.context;
    page =  new AppPage(data, template);

    const pageEvents = {
        handleEvent: (e) => {
            console.log(e)
            switch(e.type){
                case 'user:select-lang':
                    store.dispatch(setLanguaje(e.detail));
                    break;
                case 'user:select-theme':
                    store.dispatch(setTheme(e.detail));
                    break;
                case 'app-click':
                    switch (e.detail.source){
                        case "appoinment-button":
                             store.dispatch(setStage('action/open'));
                            break;
                    break;
                    }
                case 'date-selected':
                    let calendar = data.props.components.find(el => el.id === 'appoinment').calendar;
                    let options = getSchedules(e.detail.date, calendar)
                    break;
                }
            }
        }

    function handleChange(){
            let previousValue = currentValue;
            currentValue = store.getState();
            if (previousValue !== currentValue) {
                homeUpdater(previousValue, currentValue);
              }
        }

    page.eventsToListen(["user:select-lang","user:select-theme", "viewedelement", 
        "leavingapp", "leavedapp", "app-click","date-selected"], pageEvents)

    store.subscribe(handleChange);
}