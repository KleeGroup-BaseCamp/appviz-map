class GroupModel extends Model{
    #items

    constructor(id, title, type, sections, items){
        super(id, title, type, sections)
        this.#items = items
    }

    getItems(){
        return this.#items
    }
}