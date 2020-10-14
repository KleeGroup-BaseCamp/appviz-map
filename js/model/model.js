class Model{
    #id
    #title
    #type
    #sections

    constructor(id, title, type, sections){
        this.#id = id
        this.#title = title
        this.#type = type
        this.#sections = sections
    }

    
    getTitle(){
        return this.#title
    }

    getType(){
        return this.#type
    }
}