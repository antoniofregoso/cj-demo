import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner, LevelCentered, MediaList, CardsList, ModalBox } from "@customerjourney/cj-components";
import { appActions } from "../store/appStore";
import { initHomeUpdater } from "../pages/updaters/homeUpdater";

import data from "../data/home.json";

data.context = {
    lang: 'es',
    theme: 'light'
}
/**
 * Declare callback funtion for home page
 * @param {object} req 
 * @param {object} router 
 */
export function home(req, router) {
    /**
     * Template for the page
     */
    let template = `
    <page-header id="header"></page-header>
    <hero-banner id="attention"></hero-banner>
    <cards-list id="interest"></cards-list>
    <media-list id="desire"></media-list>
    <cards-list id="action"></cards-list>
    <page-footer id="footer"></page-footer>
    <modal-box id="message"></modal-box>
    `;

    let page = new AppPage(data, template);
    let track = page.scrollStopping;
    initHomeUpdater();
    console.log(track);

    const pageEvents = {
        handleEvent: (e) => {

            switch (e.type) {
                /* User change language or theme */
                case 'user:select-lang':
                    appActions.setLang(e.detail);
                    break;
                case 'user:select-theme':
                    appActions.setTheme(e.detail);
                    break;
                case 'app-click':
                    switch (e.detail.source) {
                        case "attention-button":
                            console.log(e.detail);
                            break;
                    }
                    break;
                case 'cta-click':
                    console.log(e.detail);
                    break;
                /* User interaction with the page: User view a section */
                case 'viewedelement':
                    switch (e.detail.source) {
                        case 'attention':
                            console.log(e.detail);
                            break;
                        case 'interest':
                            console.log(e.detail);
                            break;
                        case 'desire':
                            console.log(e.detail);
                            break;
                        case 'action':
                            console.log(e.detail);
                            break;
                        case 'conversion':
                            console.log(e.detail);
                            break;
                    }
                    break;
                /* User interaction with the page: User leave a section */
                case 'unviewedelement':
                    switch (e.detail.source) {
                        case 'attention':
                            console.log(e.detail);
                            break;
                        case 'interest':
                            console.log(e.detail);
                            break;
                        case 'desire':
                            console.log(e.detail);
                            break;
                        case 'action':
                            console.log(e.detail);
                            break;
                    }
                    break;
                /* User is leaving the app */
                case 'leavingapp':
                    console.log(e.detail);
                    break;
                /* User has left the app */
                case 'leavedapp':
                    console.log(e.detail);
                    break;
            }
        }
    }

    page.setEvents(pageEvents);

}