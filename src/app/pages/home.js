import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner, LevelCentered, MediaList, CardsList, ModalBox } from "@customerjourney/cj-components";
import { setStage, setScrollStopping } from "../store/slices/homeSlice";
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
     * Template for the page
     */
    let template =`
    <page-header id="header"></page-header>
    <hero-banner id="attention"></hero-banner>
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
     * Page object created with the data and the template
     */
    page =  new AppPage(data, template);
    /**
     * Initialize scrollStopping tracking object
     */ 
    let track = page.scrollStopping;
    if (!currentState.home.scrollStopping){
        track.page.views = 0;
    }else{
        track.page.views = currentState.home.scrollStopping.page.views + 1;
    }
    track.page.req=req;
    track.name=data.props.title.en;
    track.session=currentState.context.session;
    store.dispatch(setScrollStopping(track));
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
                        case "attention-button":
                            store.dispatch(setStage('attention/click'));
                            break;
                    }
                    break;
                case 'cta-click':
                    store.dispatch(setStage(`action/click-${e.detail.source}`));
                    break;
                /* User interaction with the page: User view a section */
                case 'viewedelement':
                    switch (e.detail.source){
                        case 'attention':
                            store.dispatch(setStage('attention/viewed'));
                            break;
                        case 'interest':
                            store.dispatch(setStage('interest/viewed'));
                            break;
                        case 'desire':
                            store.dispatch(setStage('desire/viewed'));
                            break;
                        case 'action':
                            store.dispatch(setStage('action/viewed'));
                            break;
                        case 'conversion':
                            store.dispatch(setStage('conversion/viewed'));
                            break;
                        }
                    break;
                /* User interaction with the page: User leave a section */
                case 'unviewedelement':
                    switch (e.detail.source){
                        case 'attention':
                            store.dispatch(setStage('attention/unviewed'));
                            break;
                        case 'interest':
                            store.dispatch(setStage('interest/unviewed'));
                            break;
                        case 'desire':
                            store.dispatch(setStage('desire/unviewed'));
                            break;
                        case 'action':
                            store.dispatch(setStage('action/unviewed'));
                            break;
                        }
                    break;
                /* User is leaving the app */
                case 'leavingapp':
                    store.dispatch(setStage('escape'));
                    break;
                /* User has left the app */
                case 'leavedapp':
                    store.dispatch(setStage('quit'));
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
    
}