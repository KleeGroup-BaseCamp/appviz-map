import GroupModel from "./groupModel"

export default class ModelRepository{
    #groupModels: GroupModel[]

    /**
     * @constructor
     * 
     * @param {GroupModel[]} groupModels 
     */
    constructor(groupModels: GroupModel[]){
        this.#groupModels = groupModels
    }

    /**
     * @returns {groupModels[]} groupModels
     */
    getGroupModels(){
        return this.#groupModels
    }

    // getGroupTypes() -> string[]

    // getGroupModelsByType(type: string) -> groupModel[]
    getGroupModelById(id: any){
        const groupModel = this.getGroupModels().find(groupModel => 
            groupModel.getId() === id)

        if (groupModel) {
            return groupModel
        }   
        throw 'no data found'
    }
}