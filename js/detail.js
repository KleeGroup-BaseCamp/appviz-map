export default class Detail{

    constructor(){
    }

    update(type, title){
        document.querySelector("#detail-title").textContent = title
        document.querySelector("#detail-content").innerHTML = this.#getContent(type, title)
    }

    #getContent(type, title){ // TO DO: title > id
        if (type === 'group') {
            return `<div class='has-text-centered'><button class='button is-light' id='detail-button' onclick="switchView('techGroup', {'groupId': '${title}'})">Go to detail</button><p>Group detail goes here</p></div>`
        } else {
            return '';
        }
    }
}