import {GroupModel} from "./groupModel"

export class ModelRepository{
    private readonly groupModels: GroupModel[]

    /**
     * @constructor
     * 
     * @param {GroupModel[]} groupModels 
     */
    constructor(groupModels: GroupModel[]){
        this.groupModels = groupModels
    }

    /**
     * @returns {groupModels[]} groupModels
     */
    public getGroupModels(): GroupModel[]{
        return this.groupModels
    }

    // getGroupTypes() -> string[]

    // getGroupModelsByType(type: string) -> groupModel[]
    public getGroupModelById(id: any): (GroupModel | null){
        const groupModel = this.getGroupModels().find(groupModel => 
            groupModel.getId() === id)

        if (groupModel) {
            return groupModel
        }   
        // throw 'no data found'
        return null
    }
}