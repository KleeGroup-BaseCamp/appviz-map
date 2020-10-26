import Section from "./section"
import {ItemTypeName} from "../types/types"

export default class ItemModel{
    #id: any
    #title: string
    #type: ItemTypeName
    #subType: string
    #sections: Section[]

    /**
     * @constructor
     * 
     * @param {*} id 
     * @param {string} title 
     * @param {ItemTypeName} type 
     * @param {string} subType 
     * @param {Section[]} sections 
     */

    constructor(id: any, title: string, type: ItemTypeName, subType: string, sections: Section[]){
        this.#id = id
        this.#title = title
        this.#type = type
        this.#subType = subType
        this.#sections = sections
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
     * @returns {string} subType
     */
    getSubType(){
        return this.#subType
    }

    /**
     * @returns {Section[]} sections
     */
    getSections(){
        return this.#sections
    }

}