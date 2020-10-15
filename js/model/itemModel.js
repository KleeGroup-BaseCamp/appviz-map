class ItemModel{
    #id
    #title
    #type
    #subType
    #sections

    /**
     * @constructor
     * 
     * @param {*} id 
     * @param {string} title 
     * @param {string} type 
     * @param {string} subType 
     * @param {Section[]} sections 
     */

    constructor(id, title, type, subType, sections){
        this.#id = id
        this.#title = title
        this.#type = type
        this.#subType = subType
        this.#sections = sections
    }

    /**
     * @return {*} id
     */
    getId(){
        return this.#id
    }

    /**
     * @return {string} title
     */
    getTitle(){
        return this.#title
    }

    /**
     * @return {string} type
     */
    getType(){
        return this.#type
    }

    /**
     * @return {string} subType
     */
    getSubType(){
        return this.#subType
    }

    /**
     * @return {Section[]} sections
     */
    getSections(){
        return this.#sections
    }

}