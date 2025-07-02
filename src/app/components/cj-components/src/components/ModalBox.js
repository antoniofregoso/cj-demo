import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";

export class ModalBox extends AppElement {

    #default = {
        context:{
          lang:"en"
      }
        };

    constructor(props={}){
        super();
        this.eventName = "user:click-modal-box";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    static get observedAttributes() {
        return ["active"];
      }

    attributeChangedCallback(name, old, now) {
        if (name==='active'&&now===''){
            this.querySelector('.modal').classList.add('is-active')
        }
      }

    handleEvent(event) {
        if (event.type === "click") {
            if (event.target.ariaLabel==='close'){
                this.querySelector(".modal").classList.remove("is-active");
                this.removeAttribute('active');
            }
            
        }
    }

    #image(){
        return /*HTML*/ `
        <div class="modal-content">
            <p ${this.getClasses(["image"], this.state.image?.classList)} ${this.setAnimation(this.state.image?.animation)}>
                <img src="${ this.state.image.src!=undefined? this.state.image.src:''}" alt="${ this.state.image.alt!=undefined? this.state.image.alt:''}">
            </p>
        </div>          
        <button class="modal-close is-large" aria-label="close"></button>    
        `
    }

    #card(){
        return /*HTML*/`
        <div  ${this.getClasses(["modal-card"], this.state.card?.classList)} ${this.setAnimation(this.state.card.animation)}>
            <header ${this.getClasses(["modal-card-head"], this.state.card.title?.classList)} ${this.setAnimation(this.state.card.title?.animation)}>          
                ${this.state.card.title?.text[this.state.context.lang]!=undefined?`<p class="modal-card-title">${this.state.card.title.text[this.state.context.lang]}</p>`:``}
                <button class="delete" aria-label="close"></button>
            </header>
            <section ${this.getClasses(["modal-card-body"], this.state.card.content?.classList)} ${this.setAnimation(this.state.card.content?.animation)}>          
                <div class="content">
                   ${this.state.card.content?.text[this.state.context.lang]?this.md.render(this.state.card.content.text[this.state.context.lang]):''}
                </div>
            </section>
        </div>
        `
    }

    #message() {
        return /*HTML*/`
        <div class="modal-content">
           <article  ${this.getClasses(["message"], this.state.message?.classList)} ${this.setAnimation(this.state.message?.animation)}>          
                <div class="message-header">
                    <p>${this.md.render(this.state.message.header?.text[this.state.context.lang])}</p>
                    <button class="delete" aria-label="close"></button>
                </div>
                <div class="message-body">
                    ${this.md.render(this.state.message.body?.text[this.state.context.lang])}
                </div>
            </article>
        </div>
        `
    }

    #getContent(){
        if (this.state.image!=undefined){
            return this.#image();
        }else if (this.state.card!=undefined){
            return this.#card();
        }else if(this.state.message!=undefined){
            return this.#message();
        }else return '<p>There is no content to display</p>'
    }

    render(){
        this.innerHTML =  /* html */`
        <div class="modal">
            <div class="modal-background"></div>
                ${this.#getContent()}
        </div>
        `;
        this.addEvents();
    }

}

customElements.define("modal-box", ModalBox)