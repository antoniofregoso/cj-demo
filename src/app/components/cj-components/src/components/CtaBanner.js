import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class CtaBanner extends AppElement {

    #default = {
      context:{
                lang:"en"
            }
      }

    constructor(props={}){
        super();
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


    render(){
    	this.innerHTML =  /* html */`
      <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="container py-4">
              <div class="columns is-vcentered">
                <div class="column ${this.state.content?.size!=undefined?this.state.content.size:'is-6'}">
                   <div ${this.getClasses(["content"], this.state.content?.classList)} ${this.setAnimation(this.state.content?.animation)}>
                   ${this.state.content?.text[this.state.context.lang]!=undefined?this.md.render(this.state.content.text[this.state.context.lang]):""}
                    </div>
                </div>
                <div class="column">
                    ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''} 
                </div>
              </div>
            </div>
    </section>
      `;
    	this.addEvents();

    }

}

customElements.define("cta-banner", CtaBanner)