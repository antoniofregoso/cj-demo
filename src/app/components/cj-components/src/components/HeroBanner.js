import { AppElement } from "@customerjourney/cj-core";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { Remarkable } from "remarkable";
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';

export class HeroBanner extends AppElement {
  
    #default = {
      alignment:"has-text-centered",
      context:{
        lang:"en"
    }
    };

constructor(props={}){
    super();
    this.eventName = "user:click-hero-banner";
    this.state =this.initState(this.#default,props);
    this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
    this.md = new Remarkable();
   
}  

static get observedAttributes() {
  return ["value", "alignment"];
}

attributeChangedCallback(name, old, now) {
  this.render()
}

handleEvent(event) {
        if (event.type === "click") {
            if (event.target.tagName==='BUTTON'){
              if(this.state.buttons?.eventName!=undefined){
                this.eventName = this.state.buttons.eventName             
              }
              const clickFunnel = new CustomEvent(this.eventName,{
              detail:{source:event.target.id},
              bubbles: true,
              composed: true
              });
              this.dispatchEvent(clickFunnel);
            } else if (event.target.tagName==='path' || event.target.tagName==='svg'){
                this.scrollDown();
            }
        }
    }

scrollDown(){
  window.scroll({
  top: window.scrollY + window.innerHeight,
  left: 0,
  behavior: "smooth",
});
}



#icon = icon(faCircleArrowDown, {classes: ['fa-3x',  this.state.scrollButton?.color!=undefined?this.state.scrollButton?.color!=undefined:'has-text-white']}).html[0];


render(){
    this.innerHTML =  /* html */`
    <style>
    .icon {
      width: 3em;
      height: 3em;
      vertical-align: -.125em;
      text-shadow: 1px 1px 2px black;
    }
    ${this.state.backgroundImage?.url!=undefined?`
    #${this.state.id}-content {
      background-image: url("${this.state.backgroundImage.url}");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      ${this.state.backgroundImage?.fixed?`background-attachment: fixed;`:''}
      ${this.state.backgroundImage?.filter?`filter: ${this.state.backgroundImage?.filter};`:''}
    }
    `:''}
    ${this.state.backgroundImage?.urlMobile?`@media (max-width: 768px) {
      #${this.state.id}-content {
        background-image: url("${this.state.backgroundImage?.urlMobile}");
      }
    }`:''}
  </style>
  <div ${`id="${this.state.id}-content"`} ${this.getClasses(["hero"], this.state.classList)}  ${this.setAnimation(this.state.animation)}>
    <div class="hero-body ${this.state.alignment}">
      <div ${this.getClasses(["container"], this.state.body?.classList)}>
        ${this.state.caption?.text[this.state.context.lang]!=undefined?`
        <p ${this.getClasses(["subtitle"], this.state.caption?.classList)}  ${this.setAnimation(this.state.caption.animation)}>
        ${this.state.caption.text[this.state.context.lang]}
        </p>`:''}      
        ${this.state.title?.text[this.state.context.lang]!=undefined?`
          <p ${this.getClasses(["title"], this.state.title?.classList)} ${this.setAnimation(this.state.title.animation)}>
            ${this.state.title.text[this.state.context.lang]}
          </p>`:''}
        ${this.state.subtitle?.text[this.state.context.lang]!=undefined?`
          <p ${this.getClasses(["subtitle"], this.state.subtitle?.classList)}  ${this.setAnimation(this.state.subtitle.animation)}>
          ${this.state.subtitle.text[this.state.context.lang]}
          </p>`:''}
        ${this.state.description?.text[this.state.context.lang]!=undefined?`
          <div ${this.getClasses(["content"], this.state.description?.classList)} ${this.setAnimation(this.state.description?.animation)}>
              ${this.md.render(this.state.description?.text[this.state.context.lang])}
          </div>`:''}  
        ${this.state.buttons!=undefined?
          this.buttonsRender(this.state.buttons):''}
      </div>
    </div>
    ${this.state.scrollButton?.color!=undefined?`
    <div class="hero-foot has-text-centered">
      <span class="icon scroll-down">
          ${this.#icon}
      </span>
    </div>`:''}
    </div>
    `;
    this.addEvents();
    if (this.state.scrollButton?.color!=undefined){
      let scroolDown = this.querySelector(".scroll-down");
      scroolDown.addEventListener("click",this);
    }
    }

}

customElements.define("hero-banner", HeroBanner);
