import { AppElement } from "@customerjourney/cj-core";
import SimpleParallax from "simple-parallax-js";
import { Remarkable } from "remarkable";

export class ImageBanner extends AppElement {
    #default = {
        context:{
          lang:"en"
      }
        
    };

    constructor(props={}){
        super();
        this.eventName = "user:click-image-banner";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }




    render(){
        this.innerHTML =  /* html */`
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
           <div class="container py-4">
                ${this.getTitles()}
                <div class="columns is-centered">
                    <div class="column ${this.state.image?.size!=undefined?this.state.image.size:'is-6'}">
                    <figure ${this.getClasses(["image"], this.state.image?.classList)} ${this.setAnimation(this.state.image?.animation)}>
                        <img src="${this.state.image?.src}">
                    </figure>
                    ${this.state.description?.text[this.state.context.lang]!=undefined?`
                        <div ${this.getClasses(["content"], this.state.description?.classList)} ${this.setAnimation(this.state.description?.animation)}>
                            ${this.md.render(this.state.description?.text[this.state.context.lang])}
                        </div>`:''}  
                    ${this.state.buttons!=undefined?this.buttonsRender(this.state.buttons):''}
                    </div>
                </div>
            </div>
        </section>
        `
        this.addEvents();
        if(this.state.image?.paralax!=undefined){
            var image = this.querySelector('img')   
            new SimpleParallax(image,this.state.image.paralax) 
        }
    }


}

customElements.define("image-banner", ImageBanner)