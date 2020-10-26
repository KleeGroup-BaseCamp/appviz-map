type Data = {[key: string]: string}

export default class Section{
    #title: string
    #data: Data

    /**
     * @constructor
     * @param {string} title 
     * @param {Array.<{k: string, v: string}>} data 
     */
    constructor(title: string, data: Data){
        this.#title = title
        this.#data = data
    }

    /**
     * @returns {string} title
     */
    getTitle(){
        return this.#title
    }

    /**
     * @returns {Array.<{k: string, v: string}>} data
     */
    getData(){
        return this.#data
    }
}