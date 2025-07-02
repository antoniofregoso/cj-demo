import { AppElement, slugify } from "@customerjourney/cj-core";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faRobot, faCircleXmark, faCommentDots, faFaceSmile} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger, faWhatsapp, faTelegram }  from '@fortawesome/free-brands-svg-icons';

export class OmnichannelChat extends AppElement {
    #default = {
        isExpanded: false,
        color:"rgba(255,255,255,0.5)",
        context:{
          lang:"en"
      }

    }

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("value",this.state.value||'closed');
        this.attachShadow({ mode: "open" }); 
    }

    #styles = /* CSS */ `
    .chat-toggle {
        position: fixed;
        bottom: 20px;
        right: 40px;
        transform: translateX(50%);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }

      .chat-toggle svg {
        pointer-events: none;
      }

      .chat-content {
        position: fixed;
        bottom: 80px;
        right:10px;
        border-radius: 20px;
        background-color:rgba(255,255,255,0.5);
        text-align: center;
        transition: height 0.3s;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        width: 70px;
        overflow: hidden;
        transition: max-height 0.3s;
        } 
        .chat-content ul {
            list-style: none;
            padding: 0;
        }
        .chat-content ul li {
            padding-top: 0.1em;
            padding-left: 0px;
        }
    `

    handleEvent(event) {
        if (event.type === "click") {
            if (event.currentTarget.id==="chatToggle"){
                let chat = this.shadowRoot.querySelector('.chat-content');
                if(this.state.isExpanded===true){
                    this.setAttribute("value",'closed');
                    this.state.isExpanded = false;
                    chat.style.display = "none";
                    event.currentTarget.innerHTML = icon(faCommentDots, { transform: { size: 12 }, styles: { 'color': this.state.color }}).html[0];
                }else{
                    this.setAttribute("value",'open');
                    this.state.isExpanded = true;
                    chat.style.display = "block";
                    event.currentTarget.innerHTML =  icon(faCircleXmark, { transform: { size: 12 }, styles: { 'color': this.state.color }}).html[0];
                }
            }else if (event.currentTarget.id==="chatAI"){
                const clickFunnel = new CustomEvent(this.state.ai.eventName,{
                detail:{click:event.target.id},
                bubbles: true,
                composed: true
                });
                this.dispatchEvent(clickFunnel);
            }
        }else if (event.type === "mouseover"){
            if (event.currentTarget.id==="chatToggle"&&this.state.isExpanded===false){
                event.currentTarget.innerHTML=  icon(faFaceSmile, { transform: { size: 12 }, styles: { 'color': this.state.color }}).html[0];
            }
        }else if (event.type === "mouseleave"){
            if (event.currentTarget.id==="chatToggle"&&this.state.isExpanded===false){
                event.currentTarget.innerHTML= icon(faCommentDots, { transform: { size: 12 }, styles: { 'color': this.state.color }}).html[0];
            }
        }
    }

    attributeChangedCallback(name, old, now) {
        console.log(name)
        if (now==='open'){
            this.state.isExpanded = true;
            console.log('open')
        }else if (now==='closed'){
            this.state.isExpanded = false;
            console.log('closed')
        }
    }

    addEvents(){
        let btnToggle = this.shadowRoot.querySelector('.chat-toggle');
        btnToggle.addEventListener("click", this);
        btnToggle.addEventListener("mouseover", this);
        btnToggle.addEventListener("mouseleave", this);
        if (this.state.ai?.eventName!=undefined){
            let btnAI = this.shadowRoot.querySelector("#chatAI");
            btnAI.addEventListener("click", this);
        }
    }

    
    render(){
        this.shadowRoot.innerHTML =  /* html */`
        <style>
            ${this.#styles}
        </style>
        <div class="chat-content" id="chatContent" style="display: none;">
        <ul>
            ${this.state.whatsapp?.phone===undefined?``:`<li id="chatWhatsapp"><a target="_blank" href="https://wa.me/${this.state.whatsapp.phone}?text=${this.state.whatsapp?.text===undefined?``:slugify(this.state.whatsapp.text[this.state.context.lang])}" >${icon(faWhatsapp, { transform: { size: 10 }, styles: { 'color': '#25D366' }}).html[0]}</a></li>`}
            ${this.state.messenger?.pagename===undefined?``:`<li id="chatMessenger"><a target="_blank" href="https://m.me/${this.state.messenger.pagename}?text=${this.state.messenger?.text===undefined?``:slugify(this.state.messenger.text[this.state.context.lang])}" id="chatMessenger">${ icon(faFacebookMessenger, { transform: { size: 10 }, styles: { 'color': '#3B5998' }}).html[0]}</a></li>`}
            ${this.state.instagram?.username===undefined?``:`<li id="chatInstagram"><a target="_blank" href="https://ig.me/m/${this.state.instagram.username}?text=${this.state.instagram?.text===undefined?``:slugify(this.state.instagram.text[this.state.context.lang])}">${ icon(faFacebookMessenger, { transform: { size: 10 }, styles: { 'color': '#833AB4' }}).html[0]}</a></li>`}
            ${this.state.telegram?.username===undefined?``:`<li id="chatTelegram"><a target="_blank" href="https://t.me/#{website.telegram_channel}?text=${this.state.telegram?.text===undefined?``:slugify(this.state.telegram.text[this.state.context.lang])}">${ icon(faTelegram, { transform: { size: 10 }, styles: { 'color': '#229ED9' }}).html[0]}</a></li>`}
            ${this.state.ai?.eventName===undefined?``:`<li ><a  href="#" id="chatAI">${icon(faRobot, { transform: { size: 10 }, styles: { 'color': '#220055' }}).html[0]}</a></li>`}
        </ul>
        </div>
        <div class="chat-toggle" id="chatToggle" >${icon(faCommentDots, { transform: { size: 12 }, styles: { 'color': this.state.color }}).html[0]}</div>        
        `
        this.addEvents();
    }

}

customElements.define("omnichannel-chat", OmnichannelChat)