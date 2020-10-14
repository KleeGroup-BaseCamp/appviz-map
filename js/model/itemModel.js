class ItemModel extends Model{
    #type
    #props

    constructor(id, title, type, props){
        super(id, title)
        this.#type = type
        this.#props = props // (k, v) list 
    }
}