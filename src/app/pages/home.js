import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner, LevelCentered, MediaList, CardsList, ModalBox } from "@customerjourney/cj-components";
import { setStage, setBreadcrumb } from "../store/slices/homeSlice";
import { setLanguaje, setTheme } from "../store/slices/contextSlice"
import { store } from "../store/store";
import { homeUpdater } from "./updaters/homeUpdater";
/**
 * home.json data describe the content of the page, design and animations
 * @type {object}
 */
import data from "../data/home.json";
/**
 * Declare callback funtion for home page
 * @param {object} req 
 * @param {object} router 
 */
export function home(req, router){
    /**
     * Set date time when user enter to the page
     */
    let go = Date.now();
    /**
     * Customer behavior within the page. Saved in the state when user leave the page
     */
    let counter = {go:go, time:0, views:0, atention:1, interest:0, desire:0, action:0, conversion:0, leavingapp:0, leavedapp:0 }
    /**
     * Template for the page
     */
    let template =`
    <page-header id="header"></page-header>
    <hero-banner id="atention"></hero-banner>
    <cards-list id="interest"></cards-list>
    <media-list id="desire"></media-list>
    <cards-list id="action"></cards-list>
    <page-footer id="footer"></page-footer>
    <modal-box id="message"></modal-box>
    `;
    /**
     * current state of the app
     * @type {object}
     */
    let currentState = store.getState();
    /**
     * dispath start stage
     */
    store.dispatch(setStage('start'));
    /**
     * Add context to the data
     */
    data.context = currentState.context;
    /**
     * Page instance
     */
    page =  new AppPage(data, template);
    /**
     * event handlers for the page
     */
    const pageEvents = {
        handleEvent: (e) => {
            switch(e.type){
                /* User change language or theme */
                case 'user:select-lang':
                    store.dispatch(setLanguaje(e.detail));
                    break;
                case 'user:select-theme':
                    store.dispatch(setTheme(e.detail));
                    break;
                case 'app-click':
                    switch (e.detail.source){
                        case "atention-button":
                            store.dispatch(setStage('atention/click'));
                            break;
                    }
                    break;
                /* User interaction with the page: User view a section */
                case 'viewedelement':
                    switch (e.detail.source){
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
                /* User interaction with the page: User leave a section */
                case 'unviewedelement':
                    switch (e.detail.source){
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
                /* User is leaving the app */
                case 'leavingapp':
                    if (counter.leavingapp===0)
                        {
                            store.dispatch(setStage('escape'));
                            counter.leavingapp++;
                        };
                    break;
                /* User has left the app */
                case 'leavedapp':
                    counter.leavedapp++;
                    counter.time = Math.round((Date.now() - go) / 1000);
                    store.dispatch(setBreadcrumb(counter));
                    break;
            }
        }
            
        }
     /**
      * Handle state changes in the store
      */   
    function handleChange(){
            let previousState = currentState;
            currentState = store.getState();
            if (previousState !== currentState) {
                homeUpdater(previousState, currentState);
              }
        }
    /**
     * set event handlers for the page
     */ 
    page.setEvents(pageEvents);
    /**
     * Suscribe to the store to listen for state changes
     */
    store.subscribe(handleChange);
    /**
     * Wait for the state to be fully loaded and add one more page view.
     */
    store.subscribe(() => {
        const lastAction = store.getState()._persist?.rehydrated;
        if (lastAction) {
            counter.views = store.getState().home.breadcrumb.views + 1;
        }
    });
}