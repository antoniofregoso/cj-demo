import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner, LevelCentered, MediaList, CardsList, ModalBox } from "@customerjourney/cj-components";
import { contextActions } from "../store/actions";
import { initHomeUpdater } from "./updaters";


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
    initHomeUpdater();
    let track = page.scrollStopping;
    console.log('*********************')
    console.log(track);

    const pageEvents = {
        handleEvent: (e) => {

            switch (e.type) {
                /* User change language or theme */
                case 'user:select-lang': contextActions.setLang(e.detail); break;
                case 'user:select-theme': contextActions.setTheme(e.detail); break;
                case 'app-click':
                    switch (e.detail.source) {
                        case "attention-button":
                            document.getElementById("action").scrollIntoView({ behavior: "smooth" });
                            break;
                    }
                    break;
                case 'cta-click':
                    router.goTo("bye");
                    break;
                /* User interaction with the page: User view a section */
                case 'viewedelement':
                    contextActions.setStage(e.detail); break;
                /* User is leaving the app */
                case 'leavingapp':
                    contextActions.setStage(e.detail); break;
                /* User has left the app */
                case 'leavedapp':
                    contextActions.setStage(e.detail); break;
            }
        }
    }

    page.setEvents(pageEvents);

}