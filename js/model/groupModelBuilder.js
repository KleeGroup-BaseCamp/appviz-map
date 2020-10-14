class GroupModelBuilder{
    #items = []

    addItem(item){
        this.#items.push(item)
    }

    build(id, title, type, sections){
        return new GroupModel(id, title, type, sections, this.#items)
    }
}