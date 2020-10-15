class section{
    #title
    #data

    /**
     * @constructor
     * @param {string} title 
     * @param {Array.<{k: string, v: string}>} data 
     */
    constructor(title, data){
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