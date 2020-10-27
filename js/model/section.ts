type Data = {[key: string]: string}

export class Section{
    private title: string
    private data: Data

    /**
     * @constructor
     * @param {string} title 
     * @param {Array.<{k: string, v: string}>} data 
     */
    constructor(title: string, data: Data){
        this.title = title
        this.data = data
    }

    /**
     * @returns {string} title
     */
    public getTitle(): string{
        return this.title
    }

    /**
     * @returns {Data} data
     */
    public getData(): Data{
        return this.data
    }
}