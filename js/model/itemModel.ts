import {Section} from "./section"
import {ItemTypeName} from "../types/index"

export class ItemModel{
    private readonly id: any
    private readonly title: string
    private readonly type: ItemTypeName
    private readonly subType: string
    private readonly sections: Section[]

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
        this.id = id
        this.title = title
        this.type = type
        this.subType = subType
        this.sections = sections
    }

    /**
     * @returns {*} id
     */
    public getId(): any{
        return this.id
    }

    /**
     * @returns {string} title
     */
    public getTitle(): string{
        return this.title
    }

    /**
     * @returns {string} type
     */
    public getType(): string{
        return this.type
    }

    /**
     * @returns {string} subType
     */
    public getSubType(): string{
        return this.subType
    }

    /**
     * @returns {Section[]} sections
     */
    public getSections(): Section[]{
        return this.sections
    }

}