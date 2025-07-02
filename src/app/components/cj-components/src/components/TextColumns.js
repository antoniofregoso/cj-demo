import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class TextColumns extends AppElement {

    #default = {
        context:{
            lang:"en"
        }
    }

    constructor(props={}){
        super();
        this.eventName = "user:click-text-columns";
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
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.getBackground()}>
            <div class="container py-4"  ${this.setAnimation(this.state.animation)}>
                ${this.getTitles()}
                <div ${this.getClasses(["content"], this.state.content?.classList)} ${this.setAnimation(this.state.content?.animation)}>
                ${this.md.render(this.state.content?.text[this.state.context.lang])}
                </div>
                <div class="columns">
                    <div class="column">
                        <div ${this.getClasses(["content"], this.state.leftColumn?.classList)} ${this.setAnimation(this.state.leftColumn?.animation)}>
                            ${this.md.render(this.state.leftColumn?.text[this.state.context.lang])}
                        </div>
                    </div> 
                    <div class="column">
                        <div ${this.getClasses(["content"], this.state.rightColumn?.classList)} ${this.setAnimation(this.state.rightColumn?.animation)}>
                            ${this.md.render(this.state.rightColumn?.text[this.state.context.lang])}
                        </div>
                    </div> 
                </div>
                ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''} 
            </div>
        </section>
        `;
        this.addEvents();
    }

}

customElements.define("text-columns", TextColumns)
