import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class TextNotification extends AppElement {

  #default = {
    context:{
            lang:"en"
    }
  }

    constructor(props={}){
        super();
        this.eventName = "user:click-text-notification";
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
        <div class="container">
            <div ${this.getClasses(["notification"], this.state.classList)} ${this.setAnimation(this.state?.animation)}>
            <button class="delete"></button>
            ${this.md.render(this.state.message?.text[this.state.context.lang])}
            </div>
        </div>
      </section>
      `;
      this.addEvents();
  }

}

customElements.define("text-notification", TextNotification)