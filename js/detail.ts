export class Detail{

    constructor(){
    }

    public update(type: string, id: string): void{
        const detailTitle = document.querySelector("#detail-title")
        const detailContent = document.querySelector("#detail-content")
        if (detailTitle){
            detailTitle.textContent = id
        }
        if (detailContent){
            detailContent.innerHTML = this.getContent(type, id)
        }
    }

    private getContent(type: string, id: any){ 
        if (type === 'group') {
            return `<div class='has-text-centered'><button class='button is-light' id='detail-button' onclick="switchView('techGroup', {'groupId': '${id}'})">Go to detail</button><p>Group detail goes here</p></div>`
        } else {
            return '';
        }
    }
}