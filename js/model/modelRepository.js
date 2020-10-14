class ModelRepository{
    #groupsModels

    constructor(groupsModels){
        this.#groupsModels = groupsModels
    }

    getGroupsModels(){
        return this.#groupsModels
    }
}