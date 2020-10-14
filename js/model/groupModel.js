class GroupModel extends Model{
    #itemsModels

    constructor(id, title, type, sections, itemsModels){
        super(id, title, type, sections)
        this.#itemsModels = itemsModels
    }

    getItemsModels(){
        return this.#itemsModels
    }
}