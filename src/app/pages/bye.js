import { AppPage, PageHeader, PageFooter } from "@customerjourney/cj-core";
import { HeroBanner } from "@customerjourney/cj-components";
import data from "../data/bye.json";
/**
 * Declare callback funtion for home page
 * @param {object} req 
 * @param {object} router 
 */
export function bye(req, router) {

    let template = `
    <page-header id="header"></page-header>
    <hero-banner id="hero"></hero-banner>
    <page-footer id="footer"></page-footer>
    `;


    /**
     * Page object created with the data and the template
     */
    page = new AppPage(data, template);
    /**
     * Initialize scrollStopping tracking object
     */
    let track = page.scrollStopping;
    track.page.req = req;
    track.name = data.props.title.en;


    page.setEvents(pageEvents);

}