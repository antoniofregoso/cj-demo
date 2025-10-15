import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner} from "@customerjourney/cj-components";
import { setStage } from "../store/slices/byeSlice";
import { setLanguaje, setTheme } from "../store/slices/contextSlice"
import { store } from "../store/store";
import { byeUpdater } from "./updaters/byeUpdater";
import data from "../data/bye.json";

export function bye(req, router){

    let template =`
    <page-header id="header"></page-header>
    <hero-banner id="hero"></hero-banner>
    <page-footer id="footer"></page-footer>
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
                case 'user:select-lang':
                    store.dispatch(setLanguaje(e.detail));
                    break;
                case 'user:select-theme':
                    store.dispatch(setTheme(e.detail));
                    break;
                /* User has left the app */
                case 'leavedapp':
                    store.dispatch(setStage('quit'));
                    break;
                }
            }
        }

    function handleChange(){
            let previousState = currentState;
            currentState = store.getState();
            if (previousState !== currentState) {
                byeUpdater(previousState, currentState);
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