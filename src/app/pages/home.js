import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner, LevelCentered, MediaList, CardsList, ModalBox } from "@customerjourney/cj-components";
import { setStage, setBreadcrumb } from "../store/slices/homeSlice";
import { setLanguaje, setTheme } from "../store/slices/contextSlice"
import { store } from "../store/store";
import { homeUpdater } from "./updaters/homeUpdater";
import data from "../data/demo.json";

export function home(req, router){

    let go = Date.now();

    let counter = {go:go, time:0, atention:0, interest:0, desire:0, action:0, conversion:0, leavingapp:0, leavedapp:0 }

    let template =`
    <page-header id="header"></page-header>
    <hero-banner id="atention"></hero-banner>
    <cards-list id="interest"></cards-list>
    <media-list id="desire"></media-list>
    <cards-list id="action"></cards-list>
    <page-footer id="footer"></page-footer>
    <modal-box id="message"></modal-box>
    `;
    
    let currentValue = store.getState();
    store.dispatch(setStage('start'));
    data.context = currentValue;    ;
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
                            counter.leavingapp++; 
                            store.dispatch(setStage('action/open'));
                            break;
                        case "landing-button":
                            store.dispatch(setStage('landing/click'));
                            break;
                    }
                    break;
                case 'viewedelement':
                    switch (e.detail.source){
                        case 'landing':
                            if (counter.landing===0) {
                                store.dispatch(setStage('landing/viewed'));
                                counter.landing++;
                            }
                            break;
                        case 'attention':
                            if (counter.atention===0) {
                                store.dispatch(setStage('attention/viewed'));
                                counter.atention++;
                            }
                            break;
                        case 'interest':
                            if (counter.interest===0) {
                                store.dispatch(setStage('interest/viewed'));
                                counter.interest++;
                            }
                            break;
                        case 'desire':
                            if (counter.desire===0) {
                                store.dispatch(setStage('desire/viewed'));
                                counter.desire++;
                            }
                            break;
                        case 'action':
                            if (counter.action===0) {
                                store.dispatch(setStage('action/viewed'));
                                counter.action++;
                            }
                            break;
                        case 'conversion':
                            if (counter.conversion===0) {
                                store.dispatch(setStage('conversion/viewed'));
                                counter.conversion++;
                            }
                            break;
                        }
                    break;
                case 'unviewedelement':
                    switch (e.detail.source){
                        case 'landing':
                            if (counter.landing>0) {
                                store.dispatch(setStage('landing/unviewed'));
                            }
                            break;
                        case 'attention':
                            if (counter.atention>0) {
                                store.dispatch(setStage('attention/unviewed'));
                            }
                            break;
                        case 'interest':
                            if (counter.interest>0) {
                                store.dispatch(setStage('interest/unviewed'));
                            }
                            break;
                        case 'desire':
                            if (counter.desire>0) {
                                store.dispatch(setStage('desire/unviewed'));
                            }
                            break;
                        case 'action':
                            if (counter.action>0) {
                                store.dispatch(setStage('action/unviewed'));
                            }
                            break;
                        }
                    break;
                case 'leavingapp':
                    if (counter.leavingapp===0)
                        {
                            store.dispatch(setStage('escape'));
                            document.getElementById("message").setAttribute("active", "")
                            counter.leavingapp++;
                        };
                    break;
                case 'leavedapp':
                    counter.leavedapp++;
                    counter.time = Math.round((Date.now() - go) / 1000);
                    store.dispatch(setBreadcrumb(counter));
                    break;
            }}
            
        }

    function handleChange(){
            let previousValue = currentValue;
            currentValue = store.getState();
            if (previousValue !== currentValue) {
                homeUpdater(previousValue, currentValue);
              }
              console.log(counter)
        }

    page.setEvents(pageEvents);

    store.subscribe(handleChange);
}