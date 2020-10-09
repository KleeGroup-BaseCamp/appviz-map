class Detail{

    constructor(){
    }

    update(title){
        document.querySelector("#detail-title").textContent = title
        document.querySelector("#detail-content").innerHTML = this.#getContent(title)
    }

    #getContent(title){
        const content = (view == "zones")
            ? `<div class='has-text-centered'><button class='button is-light' onClick="switchViews('${title}')">Switch view</button><p>Group detail goes here</p></div>`
            : `<div class='has-text-centered'><button class='button is-light' onClick="switchViews('zones')">Switch view</button><p>Item detail goes here</p></div>`
        return content
    }
}