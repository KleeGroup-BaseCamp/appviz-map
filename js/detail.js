class Detail{
    #title 


    constructor(title){
        this.#title = title
    }

    render(){
        document.querySelector("#title").textContent = this.#title
        document.querySelector(".content").innerHTML = `<div class='has-text-centered'><button class='button is-light' onClick="switchViews('${this.#title}')">More detail</button></div>`
    }

    update(title){
        this.#title = title
        this.render()
    }
}