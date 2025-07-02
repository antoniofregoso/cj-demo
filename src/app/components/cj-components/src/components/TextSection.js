import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class TextSection extends AppElement {

    #default = {context:{
        lang:"en"
        }
    }

    constructor(props={}){
        super();
        this.eventName = "user:click-text-section";
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
      }
    }

    render(){
        this.innerHTML =  /* html */`
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="container py-4">
                ${this.getTitles()}
                <div ${this.getClasses(["content"], this.state.content?.classList)} ${this.setAnimation(this.state.content?.animation)}>
                ${this.state.content?.text[this.state.context.lang]!=undefined?this.md.render(this.state.content.text[this.state.context?.lang]):`There is no copy in _${this.state.context?.lang}_ for this section`}
                </div>
                ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''} 
            </div>
        </section>
        `;
        this.addEvents();
    }

}

customElements.define("text-section", TextSection)