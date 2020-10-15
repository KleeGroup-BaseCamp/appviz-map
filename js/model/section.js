class section{
    #id
    #title
    #data

    constructor(id, title, data){
        this.#id = id
        this.#title = title
        this.#data = data
    }

    getId(){
        return this.#id
    }

    getTitle(){
        return this.#title
    }

    getData(){
        return this.#data
    }
}