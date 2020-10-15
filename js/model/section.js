class section{
    #title
    #data

    /**
     * @constructor
     * @param {string} title 
     * @param {{k: string, v: string}[]} data 
     */
    constructor(title, data){
        this.#title = title
        this.#data = data
    }

    getTitle(){
        return this.#title
    }

    getData(){
        return this.#data
    }
}