import { AppElement } from "@customerjourney/cj-core";

export class CountdownTimer extends AppElement {

    #default = {
        count:{
            days:0,
            hours:0,
            minutes:0,
            seconds:0
        },
        days:{
            text:{
                es:"días",
                en:"days",
                fr:"jours"
            } 
        },
        hours:{
            text:{
                es:"horas",
                en:"hours",
                fr:"heures"
            } 
        },
        minutes:{
            text:{
                es:"minutos",
                en:"minutes",
                fr:"minutes"
            } 
        },
        seconds:{
            text:{
                es:"segundos",
                en:"seconds",
                fr:"secondes"
            } 
        },
        message:{
            text:{
                en:"We are very sorry. The promotion has expired"
            }
        },
        context:{
            lang:"en"
        }};

    constructor(props={}){
        super();
        this.eventName = "timer:time-out";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        const presentDate = new Date();
        const presentTime = presentDate.getTime();
        const dueDate = this.#getStart(this.getAttribute("start"));
        this.timeRemaining = dueDate - presentTime;
        this.start()
    }

    #getStart(){
        try {
            let dueDate = new Date(this.getAttribute("start"));
            return dueDate;
        }catch (error) {
            console.error(error)
            return new dateString("2024-07-12T10:00:00");
        }
    }


    getTime() {
        return {
            days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
            hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
            minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
            seconds: Math.floor(this.timeRemaining / 1000) % 60
        };
    }

    update(){
        this.state.count = this.getTime();
        this.render();
    }

    start(){
        if (this.timeRemaining > 0){        
        this.setAttribute("value","running");
        let intervalId = setInterval(() => {
            let eventName;
            this.timeRemaining-=1000;
            if (0>this.timeRemaining){
                this.setAttribute("value",'timed-out');
                if(this.state.eventName!=undefined){
                    eventName = this.state.eventName
                  }
                  const timeOut = new CustomEvent(eventName,{
                    detail:{timeOut:this.id},
                    bubbles: true,
                    composed: true
                });
                clearInterval(intervalId);
                this.dispatchEvent(timeOut);
                this.querySelector(".notification").classList.remove("is-hidden");
            }else{
                this.update()
            }
        }, 1000)
        }else {
            this.state.count = {
                days:0,
                hours:0,
                minutes:0,
                seconds:0
            }
            this.setAttribute("value","stopped");  
            this.render();
        }
    }

    render(){
        this.innerHTML =  /* html */`
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="container">
                ${this.getTitles()}
                <div class="columns is-centered">
                    <div class="column is-4">
                        <div class="level is-mobile" ${this.setAnimation(this.state.animation)}>
                            <div class="level-item has-text-centered">
                                <div>
                                <p class="title">${this.state.count?.days===undefined?0:this.state.count.days}</p>
                                <p class="heading">${this.state.days?.text[this.state.context.lang]!=undefined?this.state.days.text[this.state.context.lang]:`days`}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                <p class="title">${this.state.count?.hours===undefined?0:this.state.count.hours}</p>
                                <p class="heading">${this.state.hours?.text[this.state.context.lang]!=undefined?this.state.hours.text[this.state.context.lang]:`hours`}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                <p class="title">${this.state.count?.minutes===undefined?0:this.state.count.minutes}</p>
                                <p class="heading">${this.state.minutes?.text[this.state.context.lang]!=undefined?this.state.minutes.text[this.state.context.lang]:`minutes`}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                <p class="title" >${this.state.count?.seconds===undefined?0:this.state.count.seconds}</p>
                                <p class="heading">${this.state.seconds?.text[this.state.context.lang]!=undefined?this.state.seconds.text[this.state.context.lang]:`seconds`}</p>
                                </div>
                            </div>
                        </div>
                        <div  ${this.getClasses(["notification", "has-text-centered", "is-hidden"], this.state.message?.classList)} ${this.setAnimation(this.state.message.animation)}>
                            ${this.state.message.text[this.state.context.lang]}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `
        if(this.getAttribute('value')==='stopped'){
            this.querySelector(".notification").classList.remove("is-hidden");
        }
    }
        
}

customElements.define("countdown-timer", CountdownTimer)