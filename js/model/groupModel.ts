import {ItemModel} from "./itemModel"
import {Section} from "./section"

export class GroupModel{
    private readonly id: any
    private readonly title: string
    private readonly type: string
    private readonly sections: Section[]
    private readonly itemModels: ItemModel[]

    /**
     * @constructor
     * 
     * @param {*} id 
     * @param {string} title 
     * @param {string} type 
     * @param {Section[]} sections 
     * @param {ItemModel[]} itemModels 
     */
    constructor(id: any, title: string, type: string, sections: Section[], itemModels: ItemModel[]){
        this.id = id
        this.title = title
        this.type = type
        this.sections = sections
        this.itemModels = itemModels
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
     * @returns {Section[]} sections
     */
    public getSections(): Section[]{
        return this.sections
    }

    /**
     * @returns {ItemModel[]} itemModels
     */
    public getItemModels(): ItemModel[]{
        return this.itemModels
    }
   
}