import { AppElement } from "@customerjourney/cj-core";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

export class LevelCentered extends AppElement {

    #default = {
      context:{
        lang:"en"
    }
        };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        library.add(far, fas);
    }

    /**
     * 
     * @param {*} prefix 
     * @param {*} iconName 
     * @returns 
     */
    #getIcon(prefix, iconName) {
        try {
            return icon({ prefix: prefix, iconName: iconName }).html[0];
        } catch(error) {
            console.error(`There is no icon ${prefix} ${iconName} on the far and fas kits`)
            return(icon({ prefix: 'fas', iconName: 'circle-exclamation' }).html[0])
        }
      }

    #getItems(){
        let itemsHtml = ``;
        if (this.state.items?.length>0){
            this.state.items.forEach(item=>{
            itemsHtml+= /* html */`         
                <div class="level-item has-text-centered">
                    <div>
                        ${item.icon?.name!=undefined?`
                            <div ${this.getClasses(["icon", "title"], item.icon?.classList)} 
                                ${this.setAnimation(item.icon?.animation)}>
                                ${this.#getIcon(item.icon.prefix,item.icon.name)}
                            </div>                    
                            `:''}                    
                        <p ${this.getClasses(["heading"], item.heading?.classList)}
                            ${this.setAnimation(item.heading?.animation)}>
                            ${item.heading?.text[this.state.context.lang]!=undefined?item.heading.text[this.state.context.lang]:''}
                        </p>
                        <p ${this.getClasses(["title"], item.title?.classList)}
                            ${this.setAnimation(item.title?.animation)}>
                            ${item.title?.text[this.state.context.lang]!=undefined?item.title.text[this.state.context.lang]:''}
                        </p>
                    </div>
                </div>`;
        });
        }
        
        return itemsHtml;
    }


   
    handleEvent(event) {
        if (event.type === "click") {
            let eventName;
            if(this.state.eventName===undefined){
              eventName = "user:click-card"
            }else {
              eventName = this.state.eventName
            }
            const clickFunnel = new CustomEvent(eventName,{
            detail:{click:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        }
    }

    addEvents(){
        let buttons = this.querySelectorAll("button");
        if (buttons.length>0){
          buttons.forEach((item)=>{
            item.addEventListener("click",this)
          });    
        }  
      }

    render(){
        this.innerHTML =  /* html */`
        <nav ${this.getClasses(["level"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            ${this.#getItems()}
        </nav>
        `
       
    }

}

customElements.define("level-centered", LevelCentered)