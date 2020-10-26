import ModelRepository from "../model/modelRepository";
import {Layout} from "../types/types"

export default class View {

    provideLayers(modelRepository?: ModelRepository, layout?: Layout) {
        throw 'render method MUST be overridden'
    }    

} 