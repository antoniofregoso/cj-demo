import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class TextMessage extends AppElement {

    #default = {
        context:{
            lang:"en"        
    }
}

    constructor(props={}){
        super();
        this.eventName = "user:click-text-message";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    static get observedAttributes() {
        return [];
      }
      
    attributeChangedCallback(name, old, now) {
        this.render()
      }

    handleEvent(event){
        if (event.type === "click") {
            if(this.state.buttons?.eventName!=undefined){
                this.eventName = this.state.buttons.eventName
            }
            const clickFunnel = new CustomEvent(this.eventName,{
            detail:{source:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        this.classList.add("is-hidden");
        }
    }

    render(){
    	this.innerHTML =  /* html */`
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="container my-4">
                <div class="columns is-centered">
                    <div class="column ${this.state?.size!=undefined?this.state.size:'is-4'}">
                        <div ${this.getClasses(["message"], this.state.classList)} ${this.setAnimation(this.state?.animation)}>
                            <div class="message-header">
                                <p>${this.md.render(this.state.header?.text[this.state.context.lang])}</p>
                                ${this.state.erasable===true?'<button class="delete" aria-label="delete"></button>':''}
                            </div>
                            <div class="message-body">
                                ${this.md.render(this.state.body?.text[this.state.context.lang])}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
        if (this.state.erasable===true){
            this.addEvents();
        }
    }

}

customElements.define("text-message", TextMessage)