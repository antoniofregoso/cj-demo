import { AppElement } from "@customerjourney/cj-core";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faClock, faCreditCard, faCalendarCheck, faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import { Remarkable } from "remarkable";

export class WebinarInvitation extends AppElement {

    #default = {
        startsOn:{
            title:{
                text:{
                    en:"STARTS ON",
                    es:"COMIENZA EL",
                    fr:"COMMENCE LE"
                }
            }
        },
        duration:{
            title:{
                text:{
                    en:"DURATION",
                    es:"DURACIÓN",
                    fr:"DURÉE"
                }
            }
        },
        programFee:{
            title:{
                text:{
                    en:"PROGRAM FEE",
                    es:"TARIFA DEL PROGRAMA",
                    fr:"TARIFA DEL PROGRAMA"
                }
            }
        },
        iCal:{
            text:{
                en:"Add to Calendar",
                es:"Añadir al Calendario",
                fr:"Ajouter au Calendrier"
            }
        },
        context:{
            lang:"en"
        }
    }

    constructor(props={}){
        super();
        this.eventName = "user:click-webinar-invitation"
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    handleEvent(event) {
        if (event.type === "click") {
            if (this.state.eventName!=undefined){
                this.eventName = this.state.eventName
            }
            if (event.target.id==="download-ical"){
                console.log('iCal Downloaded')
            } else {
                const clickFunnel = new CustomEvent(this.eventName,{
                    detail:{iCal:'Requested'},
                    bubbles: true,
                    composed: true
                    });
                this.dispatchEvent(clickFunnel);
                this.generateICal();
            }
        }}
 


    getDate(){
        if (this.state.startsOn?.date!=undefined){
            let optionsDate = '';
            if (this.state.startsOn?.format === "L"){
                optionsDate = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                };
            }else {
                optionsDate = { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                };
            }
            if (this.state.startsOn.whithTime===true){
                optionsDate.hour = '2-digit';
                optionsDate.minute = '2-digit';
                optionsDate.hour12 = true;
            }
            let date = new Date(this.state.startsOn.date);
            let webinarDate = date.toLocaleString(this.state.context.lang, optionsDate);
            return webinarDate
        }
    }



    generateICal() {
        let eventName = this.state.name[this.state.context.lang]!=undefined?this.state.name[this.state.context.lang]:'';
        let eventDescription = this.state.description[this.state.context.lang]!=undefined?this.state.description[this.state.context.lang]:'';
        let startDate =  new Date(this.state.startsOn.date);
        let endDate =    new Date(this.state.endOn.date);
       
        let iCalContent = 
        "BEGIN:VCALENDAR\n" +
        "VERSION:2.0\n" +
        "PRODID:-//My Company//EN\n" +
        "BEGIN:VEVENT\n" +
        "UID:" + 'rdxFunnels-' + Math.floor(Math.random() * 10000) + "\n" +
        "DTSTAMP:" + this.#formatDateForICal(new Date()) + "\n" +
        "DTSTART:" + this.#formatDateForICal(new Date(startDate)) + "\n" +
        "DTEND:" + this.#formatDateForICal(new Date(endDate)) + "\n" +
        "SUMMARY:" + eventName + "\n" +
        "DESCRIPTION:" + eventDescription + "\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR";
        this.#downloadICal(iCalContent);
    }

    #formatDateForICal(date){
        const pad = (num) => (num < 10 ? '0' : '') + num;
        var year = date.getUTCFullYear();
        var month = pad(date.getUTCMonth() + 1);
        var day = pad(date.getUTCDate());
        var hours = pad(date.getUTCHours());
        var minutes = pad(date.getUTCMinutes());
        var seconds = pad(date.getUTCSeconds());
      
        return year + month + day + "T" + hours + minutes + seconds + "Z";
    }



    #downloadICal(content){
        var filename = "evento.ics";      
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/calendar;charset=utf-8," + encodeURIComponent(content));
        element.setAttribute("download", filename);
        element.setAttribute("id", "download-ical");
        element.style.display = "none";
        document.body.appendChild(element);
        element.addEventListener("click",this);
        element.click();
        document.body.removeChild(element);

    }

    render(){
    this.innerHTML =  /* html */`
    <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
        <div class="section py-2">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <div class="media" ${this.setAnimation(this.state.startsOn.animation)}>
                            <div class="media-left">
                            <span class="icon is-size-2 ">
                                    ${icon(faCalendarCheck ).html[0]}
                                </span>
                            </div>
                            <div class="media-content">
                            <h2 class="is-size-4">${this.state.startsOn.title?.text[this.state.context.lang]}</h2>
                                <div class="content">
                                    <h3>${this.getDate()}</h3>
                                    <button  ${this.getClasses(["button"], this.state.iCal?.classList)} id="ical-request">
                                        <span class="icon is-small">${icon(faCalendarPlus).html[0]}</span>
                                        <span>${this.state.iCal?.text[this.state.context.lang]}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="media" ${this.setAnimation(this.state.duration.animation)}>
                            <div class="media-left">
                                <span class="icon is-size-2 ">
                                    ${icon(faClock ).html[0]}
                                </span>
                            </div>
                            <div class="media-content ">
                            <h1 class="is-size-4">${this.state.duration.title?.text[this.state.context.lang]}</h1>
                                <div class="content">
                                    ${this.state.duration?.text?.[this.state.context.lang]!=undefined?this.md.render(this.state.duration.text[this.state.context.lang]):''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="media" ${this.setAnimation(this.state.programFee.animation)}>
                            <div class="media-left">
                            <span class="icon is-size-2 ">
                                    ${icon(faCreditCard ).html[0]}
                                </span>
                            </div>
                            <div class="media-content">
                            <h1 class="is-size-4">${this.state.programFee.title?.text[this.state.context.lang]}</h1>
                                <div class="content">
                                    ${this.state.programFee?.price!=undefined?`<h3>${this.state.programFee.price}</h3>`:''}
                                    ${this.state.programFee?.text?.[this.state.context.lang]!=undefined?this.md.render(this.state.programFee?.text[this.state.context.lang]):''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        `        
        this.addEvents();
    }
}

customElements.define("webinar-invitation", WebinarInvitation)