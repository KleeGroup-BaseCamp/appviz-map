class GroupModel{
    #id
    #title
    #type
    #sections
    #itemModels

    /**
     * @constructor
     * 
     * @param {*} id 
     * @param {string} title 
     * @param {string} type 
     * @param {Section[]} sections 
     * @param {ItemModel[]} itemModels 
     */
    constructor(id, title, type, sections, itemModels){
        this.#id = id
        this.#title = title
        this.#type = type
        this.#sections = sections
        this.#itemModels = itemModels
    }

    /**
     * @returns {*} id
     */
    getId(){
        return this.#id
    }
    
    /**
     * @returns {string} title
     */
    getTitle(){
        return this.#title
    }

    /**
     * @returns {string} type
     */
    getType(){
        return this.#type
    }

    /**
     * @returns {Section[]} sections
     */
    getSections(){
        return this.#sections
    }

    /**
     * @returns {ItemModel[]} itemModels
     */
    getItemModels(){
        return this.#itemModels
    }

    
}