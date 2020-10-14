class ModelRepository{
    #groups

    constructor(groups){
        this.#groups = groups
    }

    getGroups(){
        return this.#groups
    }
}