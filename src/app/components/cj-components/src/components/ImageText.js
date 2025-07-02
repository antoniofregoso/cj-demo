import { AppElement } from "@customerjourney/cj-core";
import SimpleParallax from "simple-parallax-js";
import { Remarkable } from "remarkable";

export class ImageText extends AppElement {

    #default = {
        imagePosition:"left",
        textWidth:"is-half",
        imageWidth:"is-half",
        context:{
          lang:"en"
      }
        };

    constructor(props={}){
        super();
        this.eventName = "user:click-image-text";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("img-pos",this.state.imagePosition);
        this.setAttribute("text-width",this.state.textWidth);
        this.setAttribute("img-width",this.state.imageWidth);
        this.classList.add('columns','is-vcentered', 'is-gapless','my-0');
        this.md = new Remarkable();
    }

    static get observedAttributes() {
        return ["text-width", "img-width", "img-pos"];
      }
      
      attributeChangedCallback(name, old, now) {
        this.render()
      }
      
    


    render(){
        let img = /* html */`
            <div  ${this.getClasses(["column"], [this.state.imageWidth])}>
                <figure ${this.getClasses(["image"], this.state.image?.classList)} ${this.setAnimation(this.state.image?.animation)}>
                    <img src="${this.state.image?.src}" ${this.state.image?.filter?`style="filter: ${this.state.image?.filter};"`:''} >
                </figure>
            </div>
            `
        let text = /* html */`  
        <div ${this.getClasses(["column"], this.state.textWidth)}>
            <div  class="p-4 content"> 
                ${this.state.caption?.text[this.state.context.lang]!=undefined?`
                <p ${this.getClasses(["subtitle"], this.state.caption?.classList)}  ${this.setAnimation(this.state.caption.animation)}>
                ${this.state.caption.text[this.state.context.lang]}
                </p>`:''}         
                ${this.state.title?.text[this.state.context.lang]!=undefined?`
                <h1 ${this.getClasses(["title"], this.state.title?.classList)}  ${this.setAnimation(this.state.title?.animation)}>
                    ${this.state.title.text[this.state.context.lang]}
                </h1>`:''}
                ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
                <h2 ${this.getClasses(["subtitle"], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle?.animation)}>
                    ${this.state.subtitle.text[this.state.context.lang]}
                </h2>`:''}
                ${this.state.description?.text[this.state.context.lang]!=undefined?`
                <div ${this.getClasses(["content"], this.state.description?.classList)} ${this.setAnimation(this.state.description?.animation)}>
                    ${this.md.render(this.state.description?.text[this.state.context.lang])}
                </div>`:''}    
                ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}               
            </div>
        </div>
            `
        this.innerHTML =  /* html */`
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="columns is-vcentered is-gapless my-0"> 
                ${this.state.imagePosition==='right'?text:img}
                ${this.state.imagePosition==='right'?img:text}
            </div>
        </section>
        `
        this.addEvents()
        if(this.state.image?.paralax!=undefined){
            var image = this.querySelector('img')   
            new SimpleParallax(image,this.state.image.paralax) 
        }
    }


}

customElements.define("image-text", ImageText)