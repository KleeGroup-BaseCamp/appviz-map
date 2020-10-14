class GroupModel extends Model{
    #items

    constructor(id, title, items){
        super(id, title)
        this.#items = items
    }
}