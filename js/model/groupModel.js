class GroupModel extends Model{
    #itemsModels

    constructor(id, title, type, sections, itemModels){
        super(id, title, type, sections)
        this.#itemModels = itemModels
    }

    getItemModels(){
        return this.#itemModels
    }
}