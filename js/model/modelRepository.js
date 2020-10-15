class ModelRepository{
    #groupModels

    constructor(groupModels){
        this.#groupModels = groupModels
    }

    getGroupModels(){
        return this.#groupModels
    }

    // getGroupTypes() -> string[]

    // getGroupModelsByType(type: string) -> groupModel[]
}