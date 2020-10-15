class ModelRepository{
    #groupModels

    /**
     * @constructor
     * 
     * @param {GroupModel[]} groupModels 
     */
    constructor(groupModels){
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
}