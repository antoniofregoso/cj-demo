import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner, ImageText, TextColumns, ImageBanner, CtaBanner } from "@customerjourney/cj-components";
import { FormAppoinment } from "@customerjourney/cj-forms";
import { MultiSlider } from "../components/cj-sliders/src/components/MultiSlider";
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
    <multi-slider id="slider"></multi-slider>
    <page-footer id="footer"></page-footer>
    <form-appoinment id="appoinment"></form-appoinment>
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
                case 'app-click':
                    switch (e.detail.source){
                        case "appoinment-button":
                             store.dispatch(setStage('action/open'));
                            break;
                    break;
                    }
                case 'date-selected':
                    let calendar = data.props.components.find(el => el.id === 'appoinment').calendar;
                    if (e.detail.date) {
                        let options = getSchedules(e.detail.date, calendar);
                        let appoinment = page.querySelector('#appoinment');
                        appoinment.enableTimes(options);
                        }
                    break;
                case 'submitappoinment':
                    console.log(e.detail.click)
                    if (e.detail.click==='cancel-lead'){
                        store.dispatch(setStage('action/close'));
                    }
                    if (e.detail.click==='appoinment-form'){
                        console.log("Submitting appoinment form", e.detail.lead);
                        store.dispatch(setStage('action/appoinment'));                        
                        window.location.href = router.pathFor("bye");   
                        
                    }
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
        "leavingapp", "leavedapp", "app-click","date-selected","submitappoinment"], pageEvents)

    store.subscribe(handleChange);
}