class ModelRepositoryBuilder{
    #groups = []

    addGroup(group){
        this.#groups.push(group)
    }

    build(){
        return new ModelRepository(this.#groups)
    }
}