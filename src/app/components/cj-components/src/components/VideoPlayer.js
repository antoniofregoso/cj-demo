import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";

export class VideoPlayer extends AppElement {

    #default = {
        message:{
            es:"Su navegador no soporta la etiqueta de vídeo.",
            en:"Your browser does not support the video tag.",
            fr:"Votre navigateur ne prend pas en charge la balise vidéo."
        },
        context:{
            lang:"en"
        }
    }

    constructor(props={}){
        super();
        this.eventName = "user:click-video-player";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
        this.state.videoSource = this.#detectVideoSource(this.state.video?.src);
    }

    static get observedAttributes() {
        return ["src"];
      }
      
    attributeChangedCallback(name, old, now) {
        console.log(name, old, now)
        this.state.value = this.attribute2CamelCase(now);
        this.render()
      }


    #detectVideoSource(url){
        if (typeof url === 'string'){
            if (url.includes('vimeo')){
                return 'vimeo'
            }else if(url.includes('youtube')){
                return 'youtube'
            } else {
                return 'not supported'
            }
        }
    }

    
    #getIframe(src){
        let videoSrc = this.#detectVideoSource(src);
        var iframe = '';
        if ( videoSrc==='vimeo'){
            iframe = `<iframe class="has-ratio" src="${src}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        } else if (videoSrc==='youtube'){
            iframe = `<iframe class="has-ratio"  width="560" height="315" src="${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        } else {
            iframe = "Video source not supported"
        }
        return iframe;
    }

    render(){
        this.innerHTML=/* html */`
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="container p-4 ">
                ${this.getTitles()}
                <div class="columns is-centered">
                    <div class="column ${this.state.image?.size!=undefined?this.state.video.size:'is-10'}">
                    <figure ${this.getClasses(["image"], this.state.video?.classList)} ${this.setAnimation(this.state.video?.animation)}>
                        ${this.#getIframe(this.state.video?.src)}
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

    }

}

customElements.define("video-player", VideoPlayer)
