import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";

export class CardsList extends AppElement {
    #default = {
        cardsWidth:"is-4",
        context:{
            lang:"en"
        }
    };

    constructor(props={}){
        super();
        this.eventName = "user:click-cards-list";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

   

    #card(props){
        let card = /* html */ `
        <div class="column ${this.state.cardsWidth}">
            <div ${this.getClasses(["card"], props.classList)}  ${this.setAnimation(props.animation)}>                
                ${props.header?.text!=undefined?
                    `<header ${this.getClasses(["card-header"], props.header?.classList)} ${this.setAnimation(props.header?.animation)}>
                    <p class="card-header-title" >
                    ${props.header.text[this.state.context.lang]}
                    </p>
                </header>`:''}
                ${props.image?.src!=undefined?
                    `<div ${this.getClasses(["card-image"], props.image.classList)} ${this.setAnimation(props.image?.animation)}>
                        <figure class="image is-4by3">
                            <img src="${props.image.src}" ${props.image.alt!=undefined?`alt="${props.image.alt[this.state.context.lang]}"`:''} >
                        </figure>
                    </div>`
                    :''
                }
                ${props.content!=undefined?`
                    <div ${this.getClasses(["card-content"], props.content.classList)} ${this.setAnimation(props.content.animation)}>
                        ${props.content.title?.text[this.state.context.lang]!=undefined?`
                        <p ${this.getClasses(["title"], props.content.title.classList)}  ${this.setAnimation(props.content.title.animation)}>
                        ${props.content.title.text[this.state.context.lang]}
                        </p>`:''}
                        ${props.content.subtitle?.text[this.state.context.lang]!=undefined?`
                        <p ${this.getClasses(["subtitle"], props.content.subtitle.classList)} ${props.content?.subtitle?.classList!= undefined?props.content.subtitle.classList:''}" ${this.setAnimation(props.content.subtitle.animation)}>
                        ${props.content.subtitle.text[this.state.context.lang]}
                        </p>`:''}
                        ${props.content.description?.text[this.state.context.lang]!=undefined?`
                        <div ${this.getClasses(["content"], props.content.description?.classList)}  ${props.content.description?.classList!= undefined?props.content.description?.classList:''}" ${this.setAnimation(props.content.description?.animation)}>
                        ${this.md.render(props.content.description.text[this.state.context.lang])}
                        </div>`:''}
                    `:''}
                ${props.content!=undefined?
                    `</div>`:''}
                ${props.footer?.buttons!=undefined?`<footer ${this.getClasses(["card-footer"], props.footer.classList)} ${this.setAnimation(props.footer.animation)}>
                    ${this.#getFooter(props.footer.buttons)}
                </footer>`:''}
            </div>
        </div>
        `;
        return card;
    }

    #getFooter(props){
        if(props!=undefined){
            let render = '';
            Object.entries(props).forEach(([key, value])=>{                
                render += `<button class="card-footer-item"  id="${props[key]['id']}" ${this.setAnimation(props[key]['animation'])}>
                    ${props[key]['text'][this.state.context.lang]}
                </button>`;
            });
            return render;
        }else return '';
    }

    #getCards(){        
        let cardsHtml = ``;
        if (this.state.cards!=undefined){
            this.state.cards.forEach(card => {
                cardsHtml+= this.#card(card);
            });
        }
        return cardsHtml;
    }

   

    render(){
        this.innerHTML =  /* html */`
       <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="container py-4">
                ${this.getTitles(this.state)}
                <div class="columns is-multiline mx-4">
                    ${this.#getCards()}
                </div>
            </div>
        </div>`
        this.addEvents();
    }


}

customElements.define("cards-list", CardsList)
