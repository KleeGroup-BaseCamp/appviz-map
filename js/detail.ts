export class Detail{

    constructor(){
    }

    public update(type: string, title: string): void{
        const detailTitle = document.querySelector("#detail-title")
        const detailContent = document.querySelector("#detail-content")
        if (detailTitle){
            detailTitle.textContent = title
        }
        if (detailContent){
            detailContent.innerHTML = this.getContent(type, title)
        }
    }

    private getContent(type: string, title: string){ // TO DO: title > id
        if (type === 'group') {
            return `<div class='has-text-centered'><button class='button is-light' id='detail-button' onclick="switchView('techGroup', {'groupId': '${title}'})">Go to detail</button><p>Group detail goes here</p></div>`
        } else {
            return '';
        }
    }
}