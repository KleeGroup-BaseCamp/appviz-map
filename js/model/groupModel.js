class GroupModel{
    #id
    #title
    #type
    #sections
    #itemModels

    constructor(id, title, type, sections, itemModels){
        this.#id = id
        this.#title = title
        this.#type = type
        this.#sections = sections
        this.#itemModels = itemModels
    }

    getId(){
        return this.#id
    }
    
    getTitle(){
        return this.#title
    }

    getType(){
        return this.#type
    }

    getSections(){
        return this.#sections
    }

    getItemModels(){
        return this.#itemModels
    }

    
}